// Rebuilds the site once a day so tour dates from Bandsintown stay up to date
// and gigs that have already happened disappear from the "upcoming" list.
// Requires the BUILD_HOOK_URL environment variable (see README).

export default async () => {
  const hook = process.env.BUILD_HOOK_URL;
  if (!hook) {
    console.log('BUILD_HOOK_URL is not set – skipping daily rebuild.');
    return;
  }
  const res = await fetch(hook, { method: 'POST' });
  console.log(`Triggered rebuild: ${res.status}`);
};

export const config = {
  schedule: '0 4 * * *', // every day at 04:00 UTC
};
