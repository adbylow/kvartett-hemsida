// Website texts that are not in the content files (menus, buttons, labels).
// Routes: Swedish pages live at the root (/om), English pages under /en (/en/about).

export const languages = ['sv', 'en'] as const;
export type Lang = (typeof languages)[number];

export type RouteKey = 'home' | 'about' | 'tour' | 'media' | 'contact';

export const routes: Record<Lang, Record<RouteKey, string>> = {
  sv: { home: '/', about: '/om/', tour: '/turne/', media: '/media/', contact: '/kontakt/' },
  en: { home: '/en/', about: '/en/about/', tour: '/en/tour/', media: '/en/media/', contact: '/en/contact/' },
};

export const navOrder: RouteKey[] = ['home', 'about', 'tour', 'media', 'contact'];

export const t = {
  sv: {
    locale: 'sv-SE',
    nav: { home: 'Hem', about: 'Om oss', tour: 'Spelningar', media: 'Media', contact: 'Kontakt' },
    menu: 'Meny',
    close: 'Stäng',
    otherLang: 'English',
    otherLangShort: 'EN',
    skip: 'Hoppa till innehållet',
    listen: 'Lyssna',
    readMore: 'Läs mer om bandet',
    nextGigs: 'Kommande spelningar',
    allGigs: 'Alla spelningar',
    upcoming: 'Kommande spelningar',
    past: 'Tidigare spelningar',
    noGigs: 'Inga inbokade spelningar just nu – håll utkik!',
    gigsError: 'Spelningarna kunde inte hämtas just nu.',
    tickets: 'Biljetter',
    soldOut: 'Slutsålt',
    moreInfo: 'Mer info',
    followBandsintown: 'Följ oss på Bandsintown',
    members: 'Bandet',
    photos: 'Bilder',
    videos: 'Filmer',
    photoBy: 'Foto',
    morePhotos: 'Fler bilder',
    emailUs: 'Mejla oss',
    showEmail: 'Visa e-postadress',
    copy: 'Kopiera',
    copied: 'Kopierat!',
    followUs: 'Följ oss',
    embed: {
      spotify: 'Spotify-spelaren laddas först när du klickar, eftersom Spotify använder cookies.',
      youtube: 'Videon laddas först när du klickar, eftersom YouTube använder cookies.',
      load: 'Visa spelaren',
      loadVideo: 'Spela video',
      openIn: 'Öppna i',
    },
    consent: {
      text: 'Spotify- och YouTube-spelarna på sidan använder cookies. De laddas bara om du tillåter det.',
      allow: 'Tillåt',
      deny: 'Inte nu',
      settings: 'Cookie-inställningar',
    },
    gallery: { prev: 'Föregående bild', next: 'Nästa bild', close: 'Stäng' },
    notFound: { title: 'Sidan finns inte', text: 'Sidan du letar efter finns inte. Den kan ha flyttats.', back: 'Till startsidan' },
  },
  en: {
    locale: 'en-GB',
    nav: { home: 'Home', about: 'About', tour: 'Tour', media: 'Media', contact: 'Contact' },
    menu: 'Menu',
    close: 'Close',
    otherLang: 'Svenska',
    otherLangShort: 'SV',
    skip: 'Skip to content',
    listen: 'Listen',
    readMore: 'Read more about the band',
    nextGigs: 'Upcoming shows',
    allGigs: 'All shows',
    upcoming: 'Upcoming shows',
    past: 'Past shows',
    noGigs: 'No shows booked right now – stay tuned!',
    gigsError: 'Tour dates could not be loaded right now.',
    tickets: 'Tickets',
    soldOut: 'Sold out',
    moreInfo: 'More info',
    followBandsintown: 'Follow us on Bandsintown',
    members: 'The band',
    photos: 'Photos',
    videos: 'Videos',
    photoBy: 'Photo',
    morePhotos: 'More photos',
    emailUs: 'Email us',
    showEmail: 'Show email address',
    copy: 'Copy',
    copied: 'Copied!',
    followUs: 'Follow us',
    embed: {
      spotify: 'The Spotify player only loads when you click, because Spotify uses cookies.',
      youtube: 'The video only loads when you click, because YouTube uses cookies.',
      load: 'Show player',
      loadVideo: 'Play video',
      openIn: 'Open in',
    },
    consent: {
      text: 'The Spotify and YouTube players on this site use cookies. They only load if you allow it.',
      allow: 'Allow',
      deny: 'Not now',
      settings: 'Cookie settings',
    },
    gallery: { prev: 'Previous photo', next: 'Next photo', close: 'Close' },
    notFound: { title: 'Page not found', text: 'The page you are looking for does not exist. It may have moved.', back: 'Go to the start page' },
  },
} as const;

export const otherLang = (lang: Lang): Lang => (lang === 'sv' ? 'en' : 'sv');
