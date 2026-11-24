import type { Access, CollectionConfig, Field, Validate } from 'payload';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { livePreview } from './preview';

export const adminOnly: Access = ({ req }) => Boolean(req.user);

export function safeLink(value: unknown): true | string {
  if (typeof value !== 'string' || !value.trim() || value !== value.trim())
    return 'Enter a link without surrounding whitespace.';
  if (/[\u0000-\u0020\u007f\\]/.test(value))
    return 'Links cannot contain whitespace, control characters or backslashes.';
  if (
    value.startsWith('#') ||
    (value.startsWith('/') && !value.startsWith('//'))
  )
    return true;
  try {
    const url = new URL(value);
    if (
      ['http:', 'https:'].includes(url.protocol) &&
      url.hostname &&
      !url.username &&
      !url.password
    )
      return true;
    if (url.protocol === 'mailto:' && url.pathname.includes('@')) return true;
  } catch {
    /* Report a validation error below. */
  }
  return 'Use HTTP(S), mailto, a root-relative path or a fragment.';
}

export function meaningfulText(value: unknown): true | string {
  if (typeof value !== 'string' || !value.trim())
    return 'Text must not be blank.';
  // Paragraphs support the same inline link syntax as the portfolio renderer.
  for (const match of value.matchAll(/\[[^\]]*\]\(([^)]*)\)/g)) {
    if (safeLink(match[1]) !== true)
      return 'Inline links must use a safe URL scheme.';
  }
  return true;
}

const text = (name: string, required = true): Field => ({
  name,
  type: 'text',
  required,
  maxLength: 2000,
  validate: ((value: unknown) =>
    !required && (value == null || value === '')
      ? true
      : meaningfulText(value)) as Validate,
});
const links = (): Field => ({
  name: 'links',
  type: 'array',
  fields: [
    text('label'),
    {
      name: 'href',
      type: 'text',
      required: true,
      maxLength: 4000,
      validate: safeLink,
    },
  ],
});
const visualFields = (): Field[] => [
  text('label'),
  { name: 'image', type: 'upload', relationTo: 'media', required: true },
  // Optional authored dimensions preserve the original content; otherwise use Sharp metadata.
  { name: 'width', type: 'number', min: 1 },
  { name: 'height', type: 'number', min: 1 },
];

export const Users: CollectionConfig = {
  slug: 'users',
  // Secure cookies whenever the canonical origin is HTTPS (production).
  auth: {
    cookies: {
      secure: process.env.PAYLOAD_PUBLIC_SERVER_URL?.startsWith('https:'),
    },
  },
  admin: { useAsTitle: 'email' },
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: adminOnly,
    read: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [],
};

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  upload: {
    staticDir:
      process.env.PAYLOAD_UPLOAD_DIR ??
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../uploads'),
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/gif',
      'image/svg+xml',
    ],
    // SVGs are accepted only from trusted authenticated admins (including the local seed).
    // Never render arbitrary uploads as HTML or embed them using object/iframe.
    // Uploaded filenames are unique, so files are immutable: let browsers and
    // the Cloudflare edge keep them for a year (VPS outages stay invisible).
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      return headers;
    },
  },
  fields: [
    text('alt'),
    {
      name: 'sourcePath',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        description:
          'Seed deduplication key. Leave empty for authored uploads.',
      },
    },
  ],
};

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order', '_status'],
    // Live Preview tab: the real portfolio page rendering this draft.
    livePreview,
  },
  // Ordering is the visible numeric `order` field: the admin list sorts by
  // it, the site endpoint sorts by it, ties break by id. Deliberately NOT
  // Payload's experimental `orderable` drag-and-drop (tried 2026-11-22 —
  // its hidden field made stale list preferences/URLs blank the admin list
  // and drag refused outside its own sort). Editors reorder by editing the
  // number.
  defaultSort: 'order',
  // Autosave keeps the draft (and so Live Preview) current while typing;
  // nothing reaches the site until Publish.
  versions: { drafts: { autosave: { interval: 1500 } }, maxPerDoc: 50 },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      maxLength: 120,
      validate: (value: unknown) =>
        (typeof value === 'string' &&
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) ||
        'Use lowercase words separated by single hyphens.',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      index: true,
      // Position in the site: lowest first. The seed fills it from import
      // order; editors change it here to reorder (0,1,2…; ties break by id).
    },
    { name: 'category', type: 'select', options: ['professional', 'personal'] },
    text('title'),
    text('tagline'),
    text('description'),
    text('summary'),
    text('platform'),
    text('role'),
    text('date', false),
    {
      name: 'status',
      type: 'select',
      options: ['COMPLETED', 'ONGOING', 'ARCHIVED'],
    },
    {
      name: 'techStack',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [text('name')],
    },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'logoDark', type: 'upload', relationTo: 'media' },
    { name: 'cover', type: 'array', maxRows: 1, fields: visualFields() },
    links(),
    {
      name: 'contents',
      type: 'array',
      label: 'Contents',
      admin: {
        description:
          'Sections of the project page, top to bottom. Add images under each section\'s Media.',
      },
      required: true,
      minRows: 1,
      fields: [
        text('title'),
        { name: 'kind', type: 'select', options: ['preview', 'text'] },
        {
          name: 'body',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'textarea',
              required: true,
              maxLength: 20000,
              validate: meaningfulText,
            },
          ],
        },
        {
          name: 'code',
          type: 'array',
          fields: [
            text('label'),
            {
              name: 'source',
              type: 'textarea',
              required: true,
              maxLength: 100000,
              validate: (value: unknown) =>
                (typeof value === 'string' && Boolean(value.trim())) ||
                'Code must not be blank.',
            },
          ],
        },
        links(),
        { name: 'media', type: 'array', fields: visualFields() },
      ],
    },
  ],
};
