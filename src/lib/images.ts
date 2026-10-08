// All photos in content/images, ready for Astro's image optimisation.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/content/images/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true },
);

const byName = new Map(Object.entries(files).map(([p, mod]) => [p.split('/').pop()!, mod.default]));

export const imageExists = (name: string) => byName.has(name);

export function image(name: string): ImageMetadata {
  const img = byName.get(name);
  if (!img) throw new Error(`Image "${name}" not found in content/images`);
  return img;
}
