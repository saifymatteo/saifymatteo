import * as migration_20261123_142432_initial from './20261123_142432_initial';

export const migrations = [
  {
    up: migration_20261123_142432_initial.up,
    down: migration_20261123_142432_initial.down,
    name: '20261123_142432_initial'
  },
];
