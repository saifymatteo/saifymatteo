import { getPayload } from 'payload';
import { randomBytes } from 'node:crypto';
process.env.PAYLOAD_SECRET = randomBytes(48).toString('hex');
const { default: config } = await import('../src/payload.config');
const payload = await getPayload({ config });
const users = await payload.find({ collection: 'users', limit: 5, overrideAccess: true, depth: 0 });
console.log('USERS:', JSON.stringify(users.docs.map((u) => ({ id: u.id, email: u.email }))));
