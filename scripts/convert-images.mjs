/**
 * ═══════════════════════════════════════════════
 *  Image Conversion: JPG/PNG → WebP + Cover Gen
 * ═══════════════════════════════════════════════
 * 
 * First run: npm install sharp --save-dev
 * Then run:   npm run convert-images
 * 
 * - Converts ALL .jpg/.jpeg/.png in public/uploads to .webp (quality 90)
 * - Creates cover.webp (1200×675, top-cropped) from each Desktop image
 * - Original files are NOT deleted
 */

import { readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const UPLOADS = join(__dirname, '..', 'public', 'uploads');
const CW = 1200, CH = 675; // cover dimensions

let sharp;
try { sharp = (await import('sharp')).default; }
catch { console.error('❌ Run: npm install sharp --save-dev'); process.exit(1); }

async function walk(dir) {
  const r = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) r.push(...await walk(p));
    else if (['.jpg','.jpeg','.png'].includes(extname(e.name).toLowerCase())) r.push(p);
  }
  return r;
}

console.log('🔍 Scanning uploads...');
const imgs = await walk(UPLOADS);
console.log(`   Found ${imgs.length} images\n`);

console.log('🔄 Converting to WebP (q=90)...');
let ok = 0;
for (const img of imgs) {
  const out = img.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  try {
    await sharp(img).webp({ quality: 90, effort: 6 }).toFile(out);
    const si = (await stat(img)).size, so = (await stat(out)).size;
    console.log(`  ✓ ${basename(img)} → ${basename(out)}  (${Math.round((1-so/si)*100)}% smaller)`);
    ok++;
  } catch (e) { console.error(`  ✗ ${basename(img)}: ${e.message}`); }
}
console.log(`\n   Converted: ${ok}/${imgs.length}\n`);

console.log('🖼️  Creating covers from Desktop images (1200×675, top crop)...');
const desktops = imgs.filter(p => /Desktop/i.test(basename(p)));
let covers = 0;
for (const d of desktops) {
  const cover = join(dirname(d), 'cover.webp');
  try { await stat(cover); console.log(`  ⊘ ${basename(dirname(d))}/cover.webp (exists)`); continue; } catch {}
  try {
    await sharp(d).resize(CW, CH, { fit: 'cover', position: 'top' }).webp({ quality: 88 }).toFile(cover);
    console.log(`  ★ ${basename(dirname(d))}/cover.webp`);
    covers++;
  } catch (e) { console.error(`  ✗ ${basename(dirname(d))}: ${e.message}`); }
}

console.log(`\n✅ Done! ${ok} images converted, ${covers} covers created.`);
console.log('   Original files preserved. WebP files alongside them.');
