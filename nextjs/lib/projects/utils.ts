/**
 * Placeholder copy helpers for case studies still marked wip: true.
 *
 * Kept in their own module on purpose: isc_workflow.ts / mykampus_radio.ts
 * call these at module top level, and importing them from projects.ts would
 * create a circular import — projects.ts imports the project modules first,
 * so its `const CASE_STUDY_TITLES` would still be in its temporal dead zone
 * when the helper runs (ReferenceError: Cannot access ... before
 * initialization).
 */

import type { CaseStudySection } from './projects';

const CASE_STUDY_TITLES = [
  'Problem',
  'Preview',
  'My Contributions',
  'Key Decisions',
  'Trade-offs',
  'Result',
  'What Can Be Improve',
];

export function placeholderCaseStudy(name: string): CaseStudySection[] {
  return CASE_STUDY_TITLES.map((title, i) => ({
    number: String(i + 1).padStart(2, '0'),
    title,
    ...(title === 'Preview'
      ? { media: [] }
      : { body: ['Lorem ipsum — pending case-study copy for ' + name] }),
  }));
}

export function descriptionPlaceholder(name: string): string {
  return 'Lorem ipsum — pending case-study description for ' + name;
}
