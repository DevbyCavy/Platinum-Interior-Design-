// Generate responsive WebP + AVIF variants from /raw-images into /public/images/work,
// and write src/content/image-manifest.json (dimensions + available widths) for <ResponsiveImage>.
//
// Usage: npm run images
import { readdir, readFile, mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const SRC = path.join(ROOT, 'raw-images');
const OUT = path.join(ROOT, 'public', 'images', 'work');
const MANIFEST = path.join(ROOT, 'src', 'content', 'image-manifest.json');
const TARGET_WIDTHS = [480, 960, 1600, 2400];

await mkdir(OUT, { recursive: true });
// Files starting with "_" are skipped (duplicates / originals kept for reference).
const files = (await readdir(SRC)).filter((f) => !f.startsWith('_') && /\.(png|jpe?g|webp|tiff?)$/i.test(f));
// Merge with the existing manifest so images whose originals are no longer in /raw-images
// (already generated) keep working.
let manifest = {};
try {
  manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));
} catch {}

for (const file of files) {
  const name = path.parse(file).name;
  const input = sharp(path.join(SRC, file)).rotate();
  const { width, height } = await input.metadata();

  // Remove stale variants from a previous version of this image.
  for (const old of (await readdir(OUT)).filter((f) => f.startsWith(`${name}-`) && /-\d+\.(webp|avif)$/.test(f))) {
    if (/^\d+$/.test(old.slice(name.length + 1).split('.')[0])) await rm(path.join(OUT, old));
  }

  // Never upscale: keep target widths below the original, plus the original width itself.
  const widths = [...new Set([...TARGET_WIDTHS.filter((w) => w < width), width])].sort((a, b) => a - b);

  for (const w of widths) {
    const resized = input.clone().resize({ width: w });
    await resized.clone().webp({ quality: 80 }).toFile(path.join(OUT, `${name}-${w}.webp`));
    await resized.clone().avif({ quality: 55 }).toFile(path.join(OUT, `${name}-${w}.avif`));
  }

  manifest[name] = { width, height, widths };
  console.log(`✓ ${name}  ${width}×${height}  → ${widths.join(', ')}`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\nWrote ${Object.keys(manifest).length} images to public/images/work and the manifest.`);
