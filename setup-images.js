const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BRAIN = '/Users/vinith/.gemini/antigravity-ide/brain/71692f4f-7768-41a2-9d3d-1cfc0645c64a';
const PUBLIC = path.join(__dirname, 'public');

if (!fs.existsSync(PUBLIC)) fs.mkdirSync(PUBLIC, { recursive: true });

const MAP = [
  ['hero_jaffna_coast_1784715963055.png',       'hero.png'],
  ['dest_casuarina_beach_1784715973046.png',    'dest-casuarina.png'],
  ['dest_nainativu_temple_1784715983371.png',   'dest-nainativu.png'],
  ['dest_jaffna_fort_1784716004996.png',        'dest-fort.png'],
  ['dest_delft_island_1784716015904.png',       'dest-delft.png'],
  ['experience_sunset_cruise_1784716026020.png','exp-sunset.png'],
  ['experience_food_trail_1784716051392.png',   'exp-food.png'],
  ['experience_watersports_1784716062465.png',  'exp-watersports.png'],
  ['package_premium_1784716073136.png',         'pkg-premium.png'],
  ['gallery_fishing_boats_1784716095494.png',   'gal-boats.png'],
  ['gallery_cultural_dance_1784716106116.png',  'gal-dance.png'],
  ['gallery_lagoon_mangrove_1784716114798.png', 'gal-lagoon.png'],
  ['gallery_palmyra_tree_1784716148446.png',    'gal-palmyra.png'],
];

let ok = 0;
for (const [src, dst] of MAP) {
  const srcPath = path.join(BRAIN, src);
  const dstPath = path.join(PUBLIC, dst);
  try {
    fs.copyFileSync(srcPath, dstPath);
    console.log('✅', dst);
    ok++;
  } catch (e) {
    try {
      execSync(`cp "${srcPath}" "${dstPath}"`);
      console.log('✅', dst);
      ok++;
    } catch {
      console.log('⚠️  Please copy manually:', src, '->', dstPath);
    }
  }
}

console.log(`\nCopied ${ok}/${MAP.length} images!`);
