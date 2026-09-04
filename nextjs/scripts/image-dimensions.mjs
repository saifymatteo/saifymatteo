// Prints the intrinsic pixel dimensions of every .webp under
// public/assets/portfolios, mapped by their public src path.
// Rerun after adding screenshots: `npm run dims`
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'public/assets/portfolios';

// Parses width/height from the first VP8/VP8L/VP8X chunk of a WebP file.
// Format: https://developers.google.com/speed/webp/docs/riff_container
function webpSize(buf) {
  if (
    buf.length < 30 ||
    buf.toString('latin1', 0, 4) !== 'RIFF' ||
    buf.toString('ascii', 8, 12) !== 'WEBP'
  ) {
    return null;
  }
  let off = 12;
  while (off + 8 <= buf.length) {
    const tag = buf.toString('ascii', off, off + 4);
    const size = buf.readUInt32LE(off + 4);
    const data = off + 8;
    if (tag === 'VP8 ') {
      // Lossy: 3-byte frame tag, sync code 0x9d 0x01 0x2a, then 14-bit dims.
      if (buf.readUIntLE(data + 3, 3) !== 0x2a019d) return null;
      return {
        width: buf.readUInt16LE(data + 6) & 0x3fff,
        height: buf.readUInt16LE(data + 8) & 0x3fff,
      };
    }
    if (tag === 'VP8L') {
      // Lossless: signature 0x2f, then packed 14-bit width-1 / height-1.
      if (buf.readUInt8(data) !== 0x2f) return null;
      const bits = buf.readUInt32LE(data + 1);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }
    if (tag === 'VP8X') {
      // Extended: 4 flag/reserved bytes, then 24-bit canvas width-1 / height-1.
      return {
        width: buf.readUIntLE(data + 4, 3) + 1,
        height: buf.readUIntLE(data + 7, 3) + 1,
      };
    }
    off = data + size + (size % 2); // chunks are padded to even sizes
  }
  return null;
}

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (entry.name.endsWith('.webp')) yield path;
  }
}

const dims = {};
for (const path of [...walk(ROOT)].sort()) {
  const size = webpSize(readFileSync(path));
  if (!size) {
    console.error(`Could not parse ${path}`);
    continue;
  }
  dims[`/${path.replaceAll('\\', '/')}`] = size;
}
console.log(JSON.stringify(dims, null, 2));
