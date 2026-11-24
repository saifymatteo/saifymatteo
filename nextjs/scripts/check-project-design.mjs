// Browser regression check. With `npm run dev` running, from nextjs/:
// agent-browser open http://localhost:5173/projects/sansols
// agent-browser eval --stdin < scripts/check-project-design.mjs
// Repeat for isc-workflow, my-kampus-radio, a personal project, /projects and /.
(async () => {
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  for (const font of [
    '300 16px "Fira Sans"',
    '400 16px "Fira Sans"',
    '600 16px "Fira Sans"',
    '700 16px "Fira Sans"',
    '400 16px "Fira Code"',
    '400 16px "Cookie"',
  ]) {
    const faces = await document.fonts.load(font).catch(() => []);
    assert(
      faces.length > 0 && faces.every((face) => face.status === 'loaded'),
      `Font failed to load: ${font}. Check generated font URLs/cache.`
    );
  }
  assert(
    getComputedStyle(document.body).fontFamily.includes('Fira Sans'),
    'Body font no longer uses Fira Sans'
  );
  const professional = ['sansols', 'isc-workflow', 'my-kampus-radio'];
  const slug = location.pathname.split('/')[2];
  const h1 = document.querySelector('h1');
  assert(h1, 'Missing page heading');
  assert(
    document.documentElement.scrollWidth <= innerWidth,
    'Horizontal page overflow'
  );

  if (slug) {
    const hero = h1.closest('section');
    const personal = !professional.includes(slug);
    assert(
      hero.querySelector(
        'a[href="/projects#' + (personal ? 'personal' : 'professional') + '"]'
      ),
      'Wrong back link'
    );
    assert(h1.classList.contains('text-heading'), 'Hero type roles diverged');
    assert(hero.querySelector('.lg\\:grid-cols-2'), 'Missing split hero');
    assert(hero.querySelector('dl'), 'Missing project metadata');
    for (const heading of document.querySelectorAll('main h2')) {
      assert(
        heading.classList.contains('text-heading'),
        'Section type roles diverged'
      );
    }
    for (const link of document.querySelectorAll('main p a')) {
      assert(
        link.classList.contains('underline-squiggle'),
        'Paragraph link animation lost'
      );
      const style = getComputedStyle(link);
      assert(
        style.textDecorationLine.includes('underline'),
        'Resting underline lost'
      );
      assert(
        style.textDecorationStyle ===
          (link.matches(':hover, :focus-visible') ? 'wavy' : 'solid'),
        'Paragraph link has the wrong underline style'
      );
    }
    for (const button of document.querySelectorAll(
      'main button[aria-label^="Open "]'
    )) {
      assert(
        button.querySelector('.underline-slide'),
        'Image caption slide animation lost'
      );
    }
    if (!personal) {
      assert(hero.querySelector('img[alt$=" logo"]'), 'Project logo lost');
      assert(hero.textContent.includes('Year'), 'Project year lost');
      assert(hero.textContent.includes('Status'), 'Project status lost');
      const track = document.querySelector('.animate-marquee');
      assert(track, 'Infinite preview carousel lost');
      const expected = { sansols: 11, 'isc-workflow': 7, 'my-kampus-radio': 4 }[
        slug
      ];
      const previews = track.querySelectorAll('button[aria-label^="Open "]');
      assert(
        previews.length === expected * 2,
        'Carousel loop/media count changed'
      );
      assert(
        [...previews].every((button) => button.querySelector('.aspect-video')),
        'Responsive carousel tile style lost'
      );
      assert(
        ![...document.querySelectorAll('main p')].some(
          (p) => p.textContent.trim() === '•'
        ),
        'Legacy artificial bullets returned'
      );
    }
  } else {
    const cards = [...document.querySelectorAll('article')].filter((article) =>
      article.querySelector('a[href^="/projects/"]')
    );
    assert(cards.length >= 3, 'Project cards missing');
    for (const card of cards) {
      const logo = card.querySelector('img[alt$=" logo"]');
      if (logo) {
        assert(
          getComputedStyle(logo.parentElement).backgroundColor ===
            'rgba(0, 0, 0, 0)',
          'Project-card logo panel is not transparent'
        );
      }
      assert(
        card.classList.contains('motion-reduce:transform-none'),
        'Card motion fallback lost'
      );
      assert(
        card.querySelector('h3.text-title'),
        'Card title type role diverged'
      );
      assert(
        card.querySelector('ul[aria-label$=" technologies"]'),
        'Semantic tech list lost'
      );
      const links = card.querySelectorAll('a[href^="/projects/"]');
      assert(links.length === 1, 'Card must have one navigation link');
      const link = links[0];
      assert(
        !link.querySelector('a, button, [tabindex]'),
        'Nested interactive content'
      );
      assert(
        link.classList.contains('focus-visible:after:outline-accent'),
        'Whole-card focus style lost'
      );
      const overlay = getComputedStyle(link, '::after');
      assert(
        getComputedStyle(card).position === 'relative' &&
          overlay.content !== 'none' &&
          Math.abs(parseFloat(overlay.width) - card.clientWidth) <= 1 &&
          Math.abs(parseFloat(overlay.height) - card.clientHeight) <= 1 &&
          overlay.position === 'absolute' &&
          ['top', 'right', 'bottom', 'left'].every(
            (edge) => overlay[edge] === '0px'
          ),
        'Navigation link does not cover the whole card'
      );
    }
  }
  return JSON.stringify({
    route: location.pathname,
    width: innerWidth,
    passed: true,
  });
})();
