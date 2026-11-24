import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Media, Projects, Users } from './collections';
import { migrations } from './migrations';
import { loopbackTwin, portfolioEndpoint, serverURL } from './portfolio';
import { previewEndpoint } from './preview';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const secret = process.env.PAYLOAD_SECRET;
if (!secret || secret.length < 32)
  throw new Error(
    'PAYLOAD_SECRET (at least 32 characters) is required. Run npm run setup.'
  );

export default buildConfig({
  secret,
  serverURL: serverURL(),
  // Loopback twin: editors may reach the local admin via either localhost or
  // 127.0.0.1; cookie-authenticated mutations are CSRF-checked against the
  // origin and denied with a bare 403 "You are not allowed to perform this
  // action" when the browsed origin is not allowed. serverURL stays the
  // canonical host (it builds public media URLs); this only widens CSRF.
  csrf: [serverURL(), loopbackTwin(serverURL())],
  admin: { user: 'users', importMap: { baseDir: dirname } },
  collections: [Users, Projects, Media],
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI ?? 'file:./data/payload.db' },
    // Production (NODE_ENV=production) never schema-pushes; it applies these
    // committed migrations on boot. After any collection/field change, run
    // `npx payload migrate:create <name>` and commit the generated files.
    prodMigrations: migrations,
  }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  endpoints: [
    { path: '/portfolio', method: 'get', handler: portfolioEndpoint },
    // Draft content for the portfolio's /preview route (shared secret).
    {
      path: '/portfolio-preview',
      method: 'get',
      handler: previewEndpoint,
    },
  ],
});
