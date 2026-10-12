# Bülows kvartett – website

This is the code and content for the Bülows kvartett website. The site is in **Swedish** (main language) and **English**.

You **don't need to know any programming** to update the site. All text, photos and links live in the **`content`** folder, and you can change them directly on github.com. When you save a change, the website updates itself after 1–2 minutes.

---

## Contents

1. [Quick guide: where do I change…?](#1-quick-guide-where-do-i-change)
2. [How to edit a file on GitHub](#2-how-to-edit-a-file-on-github)
3. [How to upload or replace a photo](#3-how-to-upload-or-replace-a-photo)
4. [Step-by-step guides](#4-step-by-step-guides)
5. [Writing rules (important!)](#5-writing-rules-important)
6. [After you save: when is the site updated?](#6-after-you-save-when-is-the-site-updated)
7. [If something goes wrong](#7-if-something-goes-wrong)
8. [One-time setup (for the technical person)](#8-one-time-setup-for-the-technical-person)
9. [For developers](#9-for-developers)

---

## 1. Quick guide: where do I change…?

| I want to change…                              | Open this file                                   |
| ---------------------------------------------- | ------------------------------------------------ |
| The short band introduction on the start page  | `content/sv/home.md` and `content/en/home.md`    |
| The sentence under the logo on the start page  | `content/sv/home.md` and `content/en/home.md` (the `tagline` line) |
| The longer text on the "About" page            | `content/sv/about.md` and `content/en/about.md`  |
| Band members (names, instruments, photos)      | `content/members.yaml`                           |
| Photos on the "Media" page                     | `content/media.yaml`                             |
| YouTube videos                                 | `content/media.yaml`                             |
| Spotify players on the start page              | `content/settings.yaml`                          |
| Email address and phone number                 | `content/settings.yaml`                          |
| Instagram, Facebook and other social media     | `content/settings.yaml`                          |
| The big photo at the top of the start page     | `content/settings.yaml` (`hero_image`)           |
| The photo on the "About" page                  | `content/settings.yaml` (`about_image`)          |
| The text on the Tour, Media or Contact pages   | `content/sv/…` and `content/en/…` (`tour.md`, `media.md`, `contact.md`) |
| **Tour dates / gigs**                          | **Not on GitHub.** Add them on [Bandsintown](https://artists.bandsintown.com). See [4.8](#48-add-a-gig-tour-dates) |
| Photos                                         | The `content/images` folder                      |

**Swedish and English:** texts are in two folders, `content/sv` (Swedish) and `content/en` (English). When you change a text, remember to change it in **both** folders. Everything else (photos, links, members) is shared by both languages.

**Placeholders:** text that starts with ✏️ is a placeholder that needs to be replaced before the site goes live.

---

## 2. How to edit a file on GitHub

1. Go to the project on **github.com** and log in.
2. Click the **`content`** folder, then click the file you want to change (for example `settings.yaml`).
3. Click the **pencil icon** ✏️ ("Edit this file") at the top right of the file.
4. Make your changes in the text box.
5. Click the green **"Commit changes…"** button at the top right.
6. A small window opens. You can write a short description of what you changed (for example "Updated about text"). Then click **"Commit changes"** again.

Done! The website updates in 1–2 minutes. See [section 6](#6-after-you-save-when-is-the-site-updated).

> 💡 **Tip:** Click **"Preview"** at the top of the text box to see what a text file (`.md`) will look like before you save.

---

## 3. How to upload or replace a photo

All photos are in the **`content/images`** folder.

### Upload a new photo

1. Open the **`content/images`** folder on GitHub.
2. Click **"Add file"** (top right) → **"Upload files"**.
3. Drag the photo into the window (or click "choose your files").
4. Click the green **"Commit changes"** button.
5. Then **use the photo** by writing its file name in the right file, for example in `media.yaml` (see [4.5](#45-add-a-photo-to-the-media-page)).

### Replace a photo (keep the same name)

Upload a new photo with **exactly the same file name** as the old one (for example `band-night-landscape.jpg`). GitHub replaces the old photo automatically, and the new photo shows up everywhere the old one was used.

### Delete a photo

Open the photo in GitHub, click the **"…"** button at the top right → **"Delete file"** → **"Commit changes"**.
⚠️ First remove the file name from every file that uses it (`settings.yaml`, `members.yaml`, `media.yaml`), otherwise the site can't be updated.

### Good to know about photos

- **File names:** use only lowercase letters a–z, numbers and dashes, no spaces or å/ä/ö. Good: `band-summer-2026.jpg`. Bad: `Band på sommaren (1).JPG`.
- **Upper/lower case matters:** `Photo.JPG` and `photo.jpg` are two different names.
- **Formats:** `.jpg`, `.png` or `.webp`.
- **Size:** GitHub doesn't accept files over 25 MB. Use photos **under about 5 MB** and **about 3000 pixels wide**. Full-resolution photos from the photographer are often too large. You can shrink them for free at [squoosh.app](https://squoosh.app). You don't need to make them smaller than that, because the website automatically creates small, fast versions for phones and computers.
- **Logos:** `logo-white.png` (header and start page), `logo-black.png` (not used yet) and `logo-color.png` (footer). To change a logo, replace the file with one that has the same name.

---

## 4. Step-by-step guides

### 4.1 Change the introduction on the start page

Open `content/sv/home.md` (Swedish) and `content/en/home.md` (English). It looks like this:

```markdown
---
tagline: Folkmusik med jazzens frihet
description: Bülows kvartett spelar folkmusik och jazz. …
---

Here is the introduction text. It can be several sentences long.
```

- **`tagline`** – the short sentence under the logo at the top.
- **`description`** – the text that Google and Facebook show when someone finds or shares the site. 1–2 sentences.
- **Below the second `---`** – the introduction text on the start page.

⚠️ Don't remove the `---` lines.

### 4.2 Change the text on the "About" page

Open `content/sv/about.md` and `content/en/about.md`. Write your text below the second `---`. See [5.2](#52-text-files-md) for how to make headings, **bold text** and links.

### 4.3 Change email, phone, Spotify or social media links

Open `content/settings.yaml`.

**Email:**
```yaml
email: bulowskvartett@gmail.com
```
The address is shown on the site in a way that spam robots can't read.

**Phone:** shown under the email on the contact page and in the footer, hidden from spam robots the same way as the email. Leave the quotes empty to hide it.
```yaml
phone: "070-123 45 67"
```

**Social media:** paste the full link (starting with `https://`) between the quotes. Leave the quotes empty to hide an icon.
```yaml
social:
  instagram: "https://www.instagram.com/bulowskvartett"
  facebook: ""
```

**Spotify players on the start page:** in Spotify, click **"…" → "Share" → "Copy link"** on an album, playlist, song or the artist page. Paste it on a new line starting with `- ` (dash and space):
```yaml
spotify:
  - https://open.spotify.com/album/1DJW0GQ2YncNpLlxnkXXiv
  - https://open.spotify.com/playlist/37i9dQZF1DX…
```

### 4.4 Change band members

Open `content/members.yaml`. Each member looks like this:

```yaml
- name: "Anna Andersson"
  instrument_sv: Saxofon
  instrument_en: Saxophone
  photo: member-saxophone.jpg
```

- To **add** a member: copy a whole block (all four lines) and paste it below, with an empty line in between. Then change the text.
- To **remove** a member: delete their whole block.
- To **change the order**: move the blocks.
- `photo` is the file name of a photo in `content/images` (see [section 3](#3-how-to-upload-or-replace-a-photo)).

### 4.5 Add a photo to the Media page

1. Upload the photo to `content/images` ([section 3](#3-how-to-upload-or-replace-a-photo)).
2. Open `content/media.yaml` and add a block under `photos:`:

```yaml
photos:
  - image: band-summer-2026.jpg
    description_sv: Bandet spelar på en sommarfestival.
    description_en: The band playing at a summer festival.
    credit: Anna Fotograf
```

- `description_sv` / `description_en` – a short description of the photo. It is read aloud to blind visitors and shown in the large view. `description_en` can be left empty, and then the Swedish text is used.
- `credit` – the photographer's name (optional, leave `""` empty if not needed).
- The photos are shown in the order they are listed. The start page shows the first three (skipping the big top photo).

### 4.6 Add a YouTube video

1. On YouTube, click **"Share" → "Copy"** under the video.
2. Open `content/media.yaml` and add the link under `videos:`:

```yaml
videos:
  - url: https://youtu.be/dQw4w9WgXcQ
    title: Storpolskan – live at Folkets Hus
```

`title` is optional. Without it, the title from YouTube is used.

If there's a `#` at the start of a line, that line is ignored ("commented out"). Remove the `#` and the space after it to use the line.

### 4.7 Change the big photo on the start page or the About page

Upload the photo to `content/images`. Then open `content/settings.yaml` and change the file name:

```yaml
hero_image: band-forest-landscape.jpg
hero_image_mobile: band-forest-portrait.jpg
about_image: band-night-landscape.jpg
```

Use a **landscape** photo (wider than it is tall) for `hero_image`. The top part of the photo is shown behind the logo. The hero photo is also the image shown when the site is shared on social media.

`hero_image_mobile` is optional. On phones the whole start-page photo is shown above the logo, so a **portrait** photo (taller than it is wide) looks best there. If you leave the line out, phones show `hero_image` instead.

### 4.8 Add a gig (tour dates)

Tour dates are **fetched automatically from Bandsintown**. You don't edit them on GitHub.

1. Log in to [Bandsintown for Artists](https://artists.bandsintown.com) (app or website).
2. Add, change or remove the gig there.
3. The website fetches the new dates **automatically once a day** (early morning).

**Want it to show up right away?** Log in to [Netlify](https://app.netlify.com), open the site, go to **Deploys** and click **"Trigger deploy" → "Deploy site"**. After 1–2 minutes the gig is on the site.

Gigs that have already happened are moved to the "Past shows" list on the Tour page automatically.

---

## 5. Writing rules (important!)

There are two kinds of files. Follow the rules and the site will always work.

### 5.1 Settings files (`.yaml`)

`settings.yaml`, `members.yaml` and `media.yaml` are lists of settings. The format is strict:

| Rule | ✅ Right | ❌ Wrong |
| --- | --- | --- |
| A **colon and a space** after the name | `email: hej@exempel.se` | `email:hej@exempel.se` |
| **Indentation** with spaces (2 per level), never tabs | `  instagram: "…"` | `instagram: "…"` (missing spaces) |
| List items start with **dash and space** | `- https://…` | `-https://…` |
| **Quotes** come in pairs | `name: "Anna"` | `name: "Anna` |
| Text containing a **colon** must be in quotes | `title: "Live: Stockholm"` | `title: Live: Stockholm` |
| Don't change the **names** to the left of the colon | `hero_image:` | `heroimage:` / `Hero_image:` |

Lines starting with `#` are comments, notes to you that are not shown on the site.

**The easiest way to get it right:** copy an existing block and change only the text after the colons.

### 5.2 Text files (`.md`)

`home.md`, `about.md` etc. are normal text with a few simple formatting codes:

| You write | You get |
| --- | --- |
| An empty line between two texts | A new paragraph |
| `**bold text**` | **bold text** |
| `*italic text*` | *italic text* |
| `## Heading` (at the start of a line) | A heading |
| `[Spotify](https://open.spotify.com/…)` | A link with the text "Spotify" |
| `- item` (at the start of a line) | A bullet list |

The section at the top between the two `---` lines follows the settings-file rules above.

---

## 6. After you save: when is the site updated?

1. When you click "Commit changes", **Netlify** (the service that hosts the site) starts building the website.
2. After **1–2 minutes** the new version is live. Reload the page in your browser. If you don't see the change, try a "hard reload": **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac).
3. You can follow the progress in [Netlify](https://app.netlify.com) → the site → **Deploys**. "Published" means it's done.

You can also see the result on GitHub: next to your change there's a small **✓ (green, OK)**, a **● (yellow, building)** or an **✗ (red, failed)**.

---

## 7. If something goes wrong

**Nothing breaks on the live site.** If a file has a mistake, the update stops and the old version of the site stays online until the mistake is fixed.

### The update failed (red ✗ or "Failed" in Netlify)

1. Open [Netlify](https://app.netlify.com) → the site → **Deploys** → click the failed deploy.
2. Scroll down in the log until you find **❌ There is a problem in the file …**. The message tells you **which file** is wrong, **which line or field**, and **what the problem is**. For example:

   ```
   ❌ There is a problem in the file content/settings.yaml

      • hero_image: This image is not in the content/images folder. Check the
        spelling and the ending (.jpg / .png). Upper/lower case matters.
        (you wrote "band-night.JPG")
   ```

3. Fix the file on GitHub and save again ([section 2](#2-how-to-edit-a-file-on-github)).

The most common mistakes:
- A photo name that doesn't exactly match the file in `content/images` (check upper/lower case and `.jpg` vs `.jpeg`).
- Wrong indentation or a missing space after `:` or `-` in a `.yaml` file.
- A link that doesn't start with `https://`.

### Undo a change

Every change is saved in GitHub's history, so nothing is ever lost.

1. Open the file on GitHub and click **"History"** (top right of the file).
2. Find the version that worked and click it to see what it looked like.
3. Copy the old text, open the file for editing again, paste it, and save.

### Still stuck?

Contact the person who set up the site (see section 8) and send a link to the failed deploy in Netlify.

---

## 8. One-time setup (for the technical person)

These steps are done **once** when the site is set up. Editors don't need to read this section.

### 8.1 Put the code on GitHub

1. Create a new repository on GitHub (it can be private).
2. Push this folder to it (`git init`, `git add .`, `git commit`, `git remote add origin …`, `git push`).
   The full-size original photos in `_originals/` are **not** uploaded (they're in `.gitignore`).

### 8.2 Connect Netlify

1. Log in to [Netlify](https://app.netlify.com) → **Add new project → Import an existing project → GitHub** → choose the repository.
2. Netlify reads the settings from `netlify.toml`. Build command `npm run build` and publish directory `dist` are filled in automatically. Click **Deploy**.
3. The site gets an address like `https://bulows-kvartett.netlify.app`. You can rename it under **Site configuration → Change site name**.

### 8.3 Bandsintown (tour dates)

1. Get an API key ("app ID") from Bandsintown: log in to [Bandsintown for Artists](https://artists.bandsintown.com) and look under **Settings** for **API / Get API key**. If you can't find it, ask Bandsintown support for an API key for your own artist page.
2. In Netlify: **Site configuration → Environment variables → Add a variable**:
   - Key: `BANDSINTOWN_APP_ID`
   - Value: the key from Bandsintown
3. Check that `bandsintown_artist` in `content/settings.yaml` is the band's name **exactly as on Bandsintown**.
4. Trigger a new deploy (**Deploys → Trigger deploy**).

The key is only used while the site is built and is never visible to visitors. If the key is missing or Bandsintown is down, the site still builds and shows "No shows booked right now".

### 8.4 Daily update of tour dates

The site is rebuilt every morning (04:00 UTC) so new gigs from Bandsintown appear and past gigs disappear. This uses a scheduled Netlify Function (`netlify/functions/daily-rebuild.mjs`) that calls a **build hook**:

1. In Netlify: **Site configuration → Build & deploy → Continuous deployment → Build hooks → Add build hook**. Name it "Daily rebuild" and choose the `main` branch. Copy the URL.
2. **Environment variables → Add a variable**: Key `BUILD_HOOK_URL`, value = the URL.
3. Trigger a deploy once so the function is installed. You can see it under **Logs → Functions**.

A build takes about a minute, so this uses about 30 of the 300 free build minutes per month.

### 8.5 Domain name

When you have bought a domain (for example `bulowskvartett.se`):
**Domain management → Add a domain** in Netlify and follow the instructions (change the DNS settings at the company where you bought the domain). Netlify sets up HTTPS automatically. Then trigger a new deploy so links and the sitemap use the new address.

### 8.6 Give editors access

On GitHub: **Settings → Collaborators → Add people**. Editors need a (free) GitHub account. Give them the "Write" role.

### 8.7 Later: a form-based editor (optional)

If editing files on GitHub is too fiddly, a CMS (for example [Sveltia CMS](https://github.com/sveltia/sveltia-cms) or [Decap CMS](https://decapcms.org)) can be added later as a form-based admin page at `/admin`. It edits the same files in `content/`, so nothing else needs to change.

---

## 9. For developers

Built with [Astro](https://astro.build) (static output), hosted on Netlify.

```bash
nvm use            # Node 22 (see .nvmrc)
npm install
cp .env.example .env   # optionally add BANDSINTOWN_APP_ID
npm run dev        # http://localhost:4321
npm run build      # build to dist/
npm run check      # type check
```

### Structure

```
content/                 ← everything editors touch
  settings.yaml          shared settings (email, links, Spotify, hero photo)
  members.yaml           band members
  media.yaml             gallery photos and YouTube videos
  sv/*.md, en/*.md       page texts per language
  images/                all photos and logos
src/
  lib/content.ts         reads + validates content/ (zod), friendly build errors
  lib/images.ts          maps file names in content/images to optimised Astro images
  lib/bandsintown.ts     fetches gigs at build time (BANDSINTOWN_APP_ID)
  lib/oembed.ts          Spotify/YouTube titles + cover images at build time
  lib/i18n.ts            routes and UI strings (menus, buttons) for sv/en
  views/                 one component per page, shared by both languages
  pages/                 thin route files: /, /om, /turne, /media, /kontakt and /en/…
  components/            header, footer, embeds, gallery, gig list, email, consent notice
netlify/functions/       daily-rebuild.mjs (scheduled build-hook call)
_originals/              full-size photos (git-ignored, not deployed)
dev/                     private notes and scratch files (git-ignored)
```

### Notes

- **Privacy:** Spotify/YouTube iframes are only inserted after the visitor clicks "Show player" or allows cookies in the corner notice (stored in `localStorage` under `bk-embed-consent`; "Cookie settings" in the footer reopens it). Cover images and titles are fetched at build time and served from this site, so no third-party request is made before consent. YouTube uses `youtube-nocookie.com`.
- **Email and phone** are rendered base64-encoded and reversed and assembled by JavaScript, so they don't appear in the HTML.
- **Validation:** content files are validated with strict zod schemas. Unknown keys, missing images and invalid links fail the build with a message aimed at non-technical editors.
- **UI strings** (menu labels, buttons) live in `src/lib/i18n.ts`, not in `content/`.
