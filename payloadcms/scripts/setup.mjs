import { randomBytes } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';

await mkdir('data', { recursive: true });
await mkdir('uploads', { recursive: true });
try {
  await writeFile(
    '.env',
    `PAYLOAD_SECRET=${randomBytes(48).toString('hex')}
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3002
DATABASE_URI=file:./data/payload.db
`,
    { flag: 'wx', mode: 0o600 }
  );
  console.log('Created local .env (random secret), data/ and uploads/.');
} catch (error) {
  if (error.code !== 'EEXIST') throw error;
  console.log('Existing .env preserved; data/ and uploads/ ready.');
}
