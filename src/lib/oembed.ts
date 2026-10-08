// Fetches the title and cover image of Spotify/YouTube links when the site is built.
// The cover image is downloaded and served from our own site, so no request reaches
// Spotify or YouTube before the visitor clicks "Show player".

export interface EmbedInfo {
  title?: string;
  thumbnail?: string;
}

const endpoints = {
  spotify: 'https://open.spotify.com/oembed?url=',
  youtube: 'https://www.youtube.com/oembed?format=json&url=',
};

const cache = new Map<string, Promise<EmbedInfo>>();

export function getEmbedInfo(provider: keyof typeof endpoints, url: string): Promise<EmbedInfo> {
  const key = `${provider}|${url}`;
  if (!cache.has(key)) {
    cache.set(
      key,
      fetch(endpoints[provider] + encodeURIComponent(url), { signal: AbortSignal.timeout(8000) })
        .then((res) => (res.ok ? res.json() : {}))
        .then((d: { title?: string; thumbnail_url?: string }) => ({ title: d.title, thumbnail: d.thumbnail_url }))
        .catch(() => ({})),
    );
  }
  return cache.get(key)!;
}
