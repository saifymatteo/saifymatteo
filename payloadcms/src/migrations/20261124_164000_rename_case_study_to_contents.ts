import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite';

// Hand-written: `migrate:create` sees a rename as drop + create (data loss).
// SQLite's ALTER TABLE RENAME also rewrites foreign keys that reference the
// renamed table, so child rows stay attached. Indexes keep their old names
// unless renamed, so they are recreated under the names Payload expects.
const prefixes = ['projects', '_projects_v_version'];
const tables = ['', '_body', '_code', '_links', '_media'];
const indexes: Record<string, string[]> = {
  '': ['order', 'parent_id'],
  _body: ['order', 'parent_id'],
  _code: ['order', 'parent_id'],
  _links: ['order', 'parent_id'],
  _media: ['order', 'parent_id', 'image'],
};
const column: Record<string, string> = {
  order: '_order',
  parent_id: '_parent_id',
  image: 'image_id',
};

async function rename(db: MigrateUpArgs['db'], from: string, to: string) {
  for (const prefix of prefixes) {
    for (const suffix of tables) {
      const oldTable = `${prefix}_${from}${suffix}`;
      const newTable = `${prefix}_${to}${suffix}`;
      await db.run(
        sql.raw(`ALTER TABLE \`${oldTable}\` RENAME TO \`${newTable}\`;`)
      );
      for (const idx of indexes[suffix]) {
        await db.run(sql.raw(`DROP INDEX IF EXISTS \`${oldTable}_${idx}_idx\`;`));
        await db.run(
          sql.raw(
            `CREATE INDEX \`${newTable}_${idx}_idx\` ON \`${newTable}\` (\`${column[idx]}\`);`
          )
        );
      }
    }
  }
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await rename(db, 'case_study', 'contents');
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await rename(db, 'contents', 'case_study');
}
