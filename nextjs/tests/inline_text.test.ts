import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import InlineText from '../components/inline_text.ts';

const render = (text: string) =>
  renderToStaticMarkup(
    createElement('p', null, createElement(InlineText, { text }))
  );

describe('project paragraph inline formatting', () => {
  it('preserves plain text, punctuation and spacing', () => {
    assert.equal(
      render('Hello, builder.  Keep going!'),
      '<p>Hello, builder.  Keep going!</p>'
    );
    assert.equal(render(''), '<p></p>');
  });

  it('renders multiple code spans without interpreting their contents', () => {
    const html = render(
      'Use `just_audio` and `[literal](https://example.com)` here.'
    );
    assert.equal((html.match(/<code /g) ?? []).length, 2);
    assert.ok(html.includes('>just_audio</code> and '));
    assert.ok(html.includes('>[literal](https://example.com)</code> here.'));
    assert.ok(!html.includes('<a '));
  });

  it('renders external links and inline code together', () => {
    const html = render(
      'Use `audio_service`. [View source](https://example.com/repo?q=1&tab=code).'
    );
    assert.ok(html.includes('>audio_service</code>. '));
    assert.ok(
      html.includes('href="https://example.com/repo?q=1&amp;tab=code"')
    );
    assert.ok(html.includes('target="_blank" rel="noopener noreferrer"'));
    assert.ok(html.includes('underline-squiggle'));
    assert.ok(!html.includes('underline-slide'));
    assert.ok(html.includes('focus-visible:outline-2'));
    assert.ok(html.endsWith('>View source</a>.</p>'));
  });

  it('supports code in link labels without creating nested links', () => {
    const html = render('[`gql()` usage](https://example.com/usage)');
    assert.equal((html.match(/<a /g) ?? []).length, 1);
    assert.match(html, /<code [^>]+>gql\(\)<\/code> usage<\/a>/);
  });

  it('keeps internal, fragment and email links in the current browsing context', () => {
    for (const href of [
      '/projects/sansols',
      '#details',
      'mailto:hello@example.com',
    ]) {
      const html = render(`[Details](${href})`);
      assert.ok(html.includes(`href="${href}"`));
      assert.ok(!html.includes('target='));
    }
  });

  it('leaves unsafe or malformed destinations as literal text', () => {
    for (const href of [
      'javascript:alert',
      'JaVaScRiPt:alert',
      'data:text/html,test',
      'vbscript:alert',
      'file:///etc/passwd',
      '//example.com',
      '/\\example.com',
      'https://',
      'not-a-url',
    ]) {
      const html = render(`[Unsafe](${href})`);
      assert.ok(!html.includes('<a '), href);
      assert.ok(html.includes('[Unsafe]('), href);
    }
  });

  it('never interprets raw HTML in prose, code or link labels', () => {
    const html = render(
      '<script>alert(1)</script> `<img src=x>` [<img src=x>](https://example.com)'
    );
    assert.ok(!html.includes('<script'));
    assert.ok(!html.includes('<img'));
    assert.ok(html.includes('&lt;script&gt;'));
    assert.ok(html.includes('&lt;img src=x&gt;'));
  });

  it('preserves incomplete markup and does not create empty links', () => {
    for (const text of [
      'An unmatched `code',
      '[Missing](url',
      '[Empty]()',
      '[ ](https://example.com)',
      '``',
    ]) {
      assert.equal(render(text), `<p>${text}</p>`);
    }
  });
});
