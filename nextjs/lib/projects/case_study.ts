export type SectionKind = 'preview' | 'text';

// A section as authored in a content file. `kind` is omitted for plain text
// sections — content files only mark previews.
export interface CaseStudySection {
  title: string;
  kind?: SectionKind;
  // Paragraphs or bullet points.
  body?: string[];
  // Screenshot captions for the Preview section, with intrinsic dimensions.
  media?: { label: string; src: string; width: number; height: number }[];
}

// A section made render-ready: kind resolved, drop rules applied, ordinal
// assigned. The only shape consumers are allowed to see.
export interface SectionView {
  ordinal: string;
  kind: SectionKind;
  title: string;
  body?: string[];
  media?: { label: string; src: string; width: number; height: number }[];
}

// The Section invariants (CONTEXT.md), enforced here in one tested place:
// - media-less Preview sections are dropped;
// - ordinals are derived from surviving position ("01", "02", …), never authored.
export function toSectionViews(sections: CaseStudySection[]): SectionView[] {
  const visible = sections.filter(
    (s) =>
      (s.kind ?? 'text') === 'text' ||
      (s.media !== undefined && s.media.length > 0)
  );
  return visible.map((s, i) => ({
    ordinal: String(i + 1).padStart(2, '0'),
    kind: s.kind ?? 'text',
    title: s.title,
    body: s.body,
    media: s.media,
  }));
}
