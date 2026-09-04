# Context: NextJS Portfolio (saifymatteo)

The portfolio website for Saiful Mashuri ("saifymatteo"), built with Next.js. This glossary is the single source of domain language for the site and its content data.

## Portfolio Content

**Project**:
A portfolio case study entry; drives cards on the home/projects pages and its own detail page.
_Avoid_: Entry, portfolio item, work

**Title**:
The single display name of a Project, used on cards and the case-study hero.
_Avoid_: Name, full title, heading

**Tagline**:
The short subtitle shown under the Title on the case-study hero.
_Avoid_: Slogan, motto

**Case Study**:
The long-form narrative body of a Project, composed of ordered Sections.
_Avoid_: Story, article, write-up

**Description**:
The brief card copy of a Project, shown (truncated) on cards.
_Avoid_: Summary, blurb, tagline, hero description

**Summary**:
The full hero paragraph of a Project, shown on the case-study page.
_Avoid_: Description, intro, excerpt

**Section**:
One titled part of a Case Study (e.g. Problem, Preview, My Contributions); rendered with an auto-generated ordinal — section numbers are derived from position, never written by hand.
_Avoid_: Chapter, block, step

**Preview**:
A special Section type showing screenshot media in a marquee/lightbox gallery; media-less Preview sections are excluded so ordinals stay contiguous.
_Avoid_: Gallery, screenshots, carousel

**Media**:
A labelled screenshot attached to a Preview section; the unit shown as a marquee card and opened in the Lightbox.
_Avoid_: Image, picture, photo

**Lightbox**:
The fullscreen overlay opened from a Preview's Media, showing one Media at a time with its position count; navigates the Preview's Media as a loop.
_Avoid_: Image viewer, modal, fullscreen view

## Site

**Portfolio**:
The set of real-world projects the site presents. Currently three: SANSOLS, iSC Workflow, MyKampus Radio Unofficial App.
_Avoid_: Work, gallery

**Featured Works**:
The curated preview of projects on the home page (one wide card + two narrow cards), distinct from the full **Projects** listing page.
_Avoid_: Highlights, showcase

**Project Card**:
A compact presentation of a Project. Two variants: _wide_ (two-column, logo panel beside content) and _narrow_ (vertical stack).
_Avoid_: Tile, snippet

**Tech Stack Ticker**:
The horizontal scrolling strip listing technologies (Flutter, Dart, React, …).
_Avoid_: Marquee, logo strip

**Pill**:
A fully rounded badge used for platform, status, tech tags and call-to-action buttons.
_Avoid_: Chip, tag, badge

**Hero**:
The full-bleed branded banner at the top of a page.
_Avoid_: Banner, header, masthead

**Theme**:
The site's light or dark appearance; a single system-wide setting.
_Avoid_: Mode, skin

**Theme choice**:
The visitor's selection for the Theme — System, Light or Dark. System follows the visitor's device preference, including changes made while browsing; Light and Dark override it until System is picked again. A visitor who has never chosen starts on System.
_Avoid_: Theme setting, color scheme

**Contact CTA**:
The "Interested?" invitation card linking to the contact page.
_Avoid_: Call to action, invite

## Contact

**Contact Form**:
The form on the contact page collecting Name, Email, Subject and Message from a visitor.
_Avoid_: Feedback form, message box

**Contact Submission**:
A visitor's Name, Email, Subject and Message delivered as one email to Saiful's inbox; the reply address is the visitor's own Email.
_Avoid_: Inquiry, feedback, ticket

**Human Check**:
The proof-of-humanity step a visitor completes in the Contact Form before a Contact Submission is accepted.
_Avoid_: Captcha, bot check, spam filter

## Motion

**Scroll Reveal**:
A subtle entrance animation (fade + slight rise) applied to a section or card the first time it scrolls into view; plays once.
_Avoid_: Fade-in, appear animation

**Entrance Animation**:
The staggered fade-up the home hero plays on page load (portrait, name block, role pill).
_Avoid_: Intro animation, load animation

**Micro-interaction**:
Small hover/active feedback on interactive elements: card lift, nav link underline, "Case Study →" arrow nudge, button press.
_Avoid_: Hover effect, animation

**Page Transition**:
The short fade-in applied when a route mounts; there is deliberately no exit animation (App Router limitation).
_Avoid_: Route animation

**Reduced Motion**:
Honoring `prefers-reduced-motion`: motion-library animations (Scroll Reveal, Entrance Animation, Page Transition, Micro-interactions) are disabled while opacity fades remain; the CSS marquee and Tech Stack Ticker deliberately keep scrolling.
_Avoid_: Accessibility mode
