import * as migration_20261123_142432_initial from './20261123_142432_initial';
import * as migration_20261124_164000_rename_case_study_to_contents from './20261124_164000_rename_case_study_to_contents';
import * as migration_20261124_164307_drafts_autosave from './20261124_164307_drafts_autosave';

export const migrations = [
  {
    up: migration_20261123_142432_initial.up,
    down: migration_20261123_142432_initial.down,
    name: '20261123_142432_initial',
  },
  {
    up: migration_20261124_164000_rename_case_study_to_contents.up,
    down: migration_20261124_164000_rename_case_study_to_contents.down,
    name: '20261124_164000_rename_case_study_to_contents',
  },
  {
    up: migration_20261124_164307_drafts_autosave.up,
    down: migration_20261124_164307_drafts_autosave.down,
    name: '20261124_164307_drafts_autosave',
  },
];
