// Fetches tour dates from Bandsintown when the site is built.
// The API key (BANDSINTOWN_APP_ID) is a secret: it is only used here, during the build,
// and never sent to visitors' browsers. A daily rebuild keeps the dates fresh (see netlify/functions).

export interface Gig {
  id: string;
  /** Local time at the venue, e.g. "2026-11-14T19:30:00" (no time zone). */
  datetime: string;
  title?: string;
  venue: string;
  city: string;
  region?: string;
  country: string;
  url: string;
  ticketUrl?: string;
  soldOut: boolean;
}

export interface Gigs {
  upcoming: Gig[];
  past: Gig[];
  status: 'ok' | 'not-configured' | 'error';
}

interface ApiEvent {
  id: string;
  url: string;
  datetime: string;
  title?: string;
  venue?: { name?: string; city?: string; region?: string; country?: string };
  offers?: { type?: string; url?: string; status?: string }[];
}

const API = 'https://rest.bandsintown.com/artists';
const PAST_LIMIT = 10;

/** Only allow https links, so a strange value from the API can't become a script link. */
function safeUrl(url: string | undefined): string | undefined {
  try {
    return url && new URL(url).protocol === 'https:' ? url : undefined;
  } catch {
    return undefined;
  }
}

function toGig(e: ApiEvent): Gig {
  const tickets = e.offers?.find((o) => o.type?.toLowerCase() === 'tickets');
  return {
    id: String(e.id),
    datetime: e.datetime,
    title: e.title || undefined,
    venue: e.venue?.name ?? '',
    city: e.venue?.city ?? '',
    region: e.venue?.region || undefined,
    country: e.venue?.country ?? '',
    url: safeUrl(e.url) ?? 'https://www.bandsintown.com/',
    ticketUrl: safeUrl(tickets?.url),
    soldOut: tickets?.status?.toLowerCase() === 'sold out',
  };
}

async function fetchEvents(artist: string, appId: string, date: 'upcoming' | 'past'): Promise<Gig[]> {
  // Bandsintown needs some characters in artist names double-encoded.
  const name = encodeURIComponent(artist).replace(/%2F/g, '%252F').replace(/%3F/g, '%253F').replace(/\*/g, '%252A');
  const res = await fetch(`${API}/${name}/events?app_id=${encodeURIComponent(appId)}&date=${date}`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Bandsintown answered ${res.status} for ${date} events`);
  const body: unknown = await res.json();
  // Unknown artists give an object (or an error message) instead of a list.
  if (!Array.isArray(body)) throw new Error(`Bandsintown did not return a list of events: ${JSON.stringify(body).slice(0, 200)}`);
  return (body as ApiEvent[]).map(toGig);
}

let cache: { key: string; at: number; value: Promise<Gigs> } | undefined;

export function getGigs(artist: string | undefined): Promise<Gigs> {
  const appId = import.meta.env.BANDSINTOWN_APP_ID ?? process.env.BANDSINTOWN_APP_ID;
  if (!artist || !appId) {
    if (!cache) console.warn('[bandsintown] BANDSINTOWN_APP_ID or bandsintown_artist is not set – showing no tour dates.');
    cache ??= { key: '', at: Date.now(), value: Promise.resolve({ upcoming: [], past: [], status: 'not-configured' }) };
    return cache.value;
  }

  // Several pages show gigs; fetch once per build (and at most every 5 minutes during local development).
  const key = `${artist}|${appId}`;
  if (cache && cache.key === key && Date.now() - cache.at < 5 * 60_000) return cache.value;

  const value = (async (): Promise<Gigs> => {
    try {
      const [upcoming, past] = await Promise.all([
        fetchEvents(artist, appId, 'upcoming'),
        fetchEvents(artist, appId, 'past'),
      ]);
      upcoming.sort((a, b) => a.datetime.localeCompare(b.datetime));
      past.sort((a, b) => b.datetime.localeCompare(a.datetime));
      return { upcoming, past: past.slice(0, PAST_LIMIT), status: 'ok' };
    } catch (e) {
      // Don't break the whole site if Bandsintown is down; show a friendly message instead.
      console.warn(`[bandsintown] Could not fetch tour dates: ${(e as Error).message}`);
      return { upcoming: [], past: [], status: 'error' };
    }
  })();
  cache = { key, at: Date.now(), value };
  return value;
}

/** The datetime has no time zone, so format it exactly as written (as UTC). */
export function formatGigDate(datetime: string, locale: string) {
  const d = new Date(`${datetime.slice(0, 19)}Z`);
  const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(locale, { timeZone: 'UTC', ...o }).format(d);
  return {
    day: fmt({ day: 'numeric' }),
    month: fmt({ month: 'short' }).replace('.', ''),
    year: fmt({ year: 'numeric' }),
    weekday: fmt({ weekday: 'short' }).replace('.', ''),
    time: datetime.slice(11, 16) !== '00:00' ? datetime.slice(11, 16) : undefined,
    full: fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  };
}
