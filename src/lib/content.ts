// Reads the files in /content, checks them, and turns them into data for the pages.
// Mistakes in the content files stop the build with a message that explains what to fix,
// so a broken edit never reaches the live site.

import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";
import { marked } from "marked";
import { z } from "astro/zod";
import type { Lang } from "./i18n";
import { imageExists } from "./images";

const CONTENT_DIR = path.resolve("content");

class ContentError extends Error {
  constructor(file: string, problems: string[]) {
    super(
      `\n\n❌ There is a problem in the file content/${file}\n\n` +
        problems.map((p) => `   • ${p}`).join("\n") +
        `\n\n   Fix the file on GitHub and save again. See README.md → "If something goes wrong".\n`,
    );
    this.name = "ContentError";
  }
}

function readText(file: string): string {
  const full = path.join(CONTENT_DIR, file);
  if (!fs.existsSync(full))
    throw new ContentError(file, [
      "The file is missing. Was it renamed or deleted?",
    ]);
  return fs.readFileSync(full, "utf8");
}

function parseYaml(file: string, text: string): unknown {
  try {
    return yaml.load(text);
  } catch (e) {
    const err = e as yaml.YAMLException;
    const line = err.mark ? ` on line ${err.mark.line + 1}` : "";
    throw new ContentError(file, [
      `The formatting is wrong${line}: ${err.reason ?? err.message}.`,
      'Check the indentation (spaces at the start of lines), colons after names, and that quotes "" come in pairs.',
    ]);
  }
}

function valueAt(data: unknown, keys: PropertyKey[]): unknown {
  return keys.reduce<unknown>(
    (v, k) => (v == null ? v : (v as Record<PropertyKey, unknown>)[k]),
    data,
  );
}

function validate<T extends z.ZodType>(
  file: string,
  schema: T,
  data: unknown,
): z.output<T> {
  const result = schema.safeParse(data);
  if (result.success) return result.data;
  const problems = result.error.issues.map((issue) => {
    const where = issue.path.length
      ? issue.path
          .map((k) => (typeof k === "number" ? `item ${k + 1}` : String(k)))
          .join(" → ")
      : "the file";
    if (issue.code === "unrecognized_keys") {
      return `${where}: unknown field(s) ${issue.keys.map((k) => `"${k}"`).join(", ")}. Check the spelling.`;
    }
    const value = valueAt(data, issue.path);
    const wrote =
      typeof value === "string"
        ? ` (you wrote "${value}")`
        : value === undefined
          ? " (it is missing)"
          : "";
    return `${where}: ${issue.message}${wrote}`;
  });
  throw new ContentError(file, problems);
}

// ── Field types ──────────────────────────────────────────────

const text = z
  .string({ error: "Text is required" })
  .trim()
  .min(1, { error: "Text is required" });
const optionalText = z
  .string()
  .trim()
  .nullish()
  .transform((v) => v || undefined);

const imageName = z
  .string({ error: "An image file name is required" })
  .trim()
  .refine(imageExists, {
    error:
      "This image is not in the content/images folder. Check the spelling and the ending (.jpg / .png). Upper/lower case matters.",
  });

const link = z.url({
  protocol: /^https$/,
  error: "This is not a valid web link. It should start with https://",
});
const optionalLink = z
  .union([z.literal(""), z.null(), link])
  .optional()
  .transform((v) => v || undefined);

const SPOTIFY_RE =
  /^https:\/\/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(album|playlist|track|artist|episode|show)\/([A-Za-z0-9]+)/;
const spotifyLink = z
  .string()
  .trim()
  .regex(SPOTIFY_RE, {
    error: 'This is not a Spotify link. In Spotify, use "Share" → "Copy link".',
  })
  .transform((url) => {
    const [, type, id] = url.match(SPOTIFY_RE)!;
    return {
      url,
      type,
      embedUrl: `https://open.spotify.com/embed/${type}/${id}`,
    };
  });

const YOUTUBE_RE =
  /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
const youtubeLink = z
  .string()
  .trim()
  .regex(YOUTUBE_RE, {
    error:
      'This is not a YouTube video link. On YouTube, use "Share" → "Copy".',
  })
  .transform((url) => {
    const id = url.match(YOUTUBE_RE)![1];
    return {
      url,
      id,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
    };
  });

// ── File schemas ─────────────────────────────────────────────

const socialSchema = z.strictObject({
  instagram: optionalLink,
  facebook: optionalLink,
  youtube: optionalLink,
  spotify: optionalLink,
  tiktok: optionalLink,
  bandcamp: optionalLink,
  bandsintown: optionalLink,
});

const settingsSchema = z.strictObject({
  email: z.email({ error: "This is not a valid email address" }),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?[\d\s()-]{6,})?$/, {
      error:
        'This is not a valid phone number. Use only digits, spaces, "-" and "+"',
    })
    .nullish()
    .transform((v) => v || undefined),
  hero_image: imageName,
  hero_image_mobile: imageName.nullish(),
  about_image: imageName.nullish(),
  spotify: z
    .array(spotifyLink)
    .nullish()
    .transform((v) => v ?? []),
  bandsintown_artist: optionalText,
  social: socialSchema
    .nullish()
    .transform((v): Partial<z.output<typeof socialSchema>> => v ?? {}),
});

const membersSchema = z
  .array(
    z.strictObject({
      name: text,
      instrument_sv: text,
      instrument_en: text,
      photo: imageName.nullish(),
    }),
  )
  .nullish()
  .transform((v) => v ?? []);

const mediaSchema = z.strictObject({
  photos: z
    .array(
      z.strictObject({
        image: imageName,
        description_sv: text,
        description_en: optionalText,
        credit: optionalText,
      }),
    )
    .nullish()
    .transform((v) => v ?? []),
  videos: z
    .array(
      z.strictObject({
        url: youtubeLink,
        title: text,
      }),
    )
    .nullish()
    .transform((v) => v ?? []),
});

const pageSchema = z.strictObject({
  title: optionalText,
  tagline: optionalText,
  description: optionalText,
});

// ── Public API ───────────────────────────────────────────────

function loadYaml<T extends z.ZodType>(file: string, schema: T): z.output<T> {
  return validate(file, schema, parseYaml(file, readText(file)));
}

export type Settings = z.output<typeof settingsSchema>;
export type Member = z.output<typeof membersSchema>[number];
export type Media = z.output<typeof mediaSchema>;

export const getSettings = () => loadYaml("settings.yaml", settingsSchema);
export const getMembers = () => loadYaml("members.yaml", membersSchema);
export const getMedia = () => loadYaml("media.yaml", mediaSchema);

export type PageName = "home" | "about" | "tour" | "media" | "contact";

export function getPage(lang: Lang, name: PageName) {
  const file = `${lang}/${name}.md`;
  const raw = readText(file);
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const front = match ? (parseYaml(file, match[1]) ?? {}) : {};
  const body = match ? match[2] : raw;
  const data = validate(file, pageSchema, front);
  return { ...data, html: marked.parse(body, { async: false }) };
}
