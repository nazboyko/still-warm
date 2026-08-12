# Still Warm

**A museum where comfort food is the art.**

An exhibition of dishes that taste like home. Walk four rooms, read the labels, and leave a memory that becomes the last exhibit.

**[Visit the museum](https://still-warm.boyko-nazar.workers.dev/)**

![The museum's hero: a dark gallery, a lit case with its cloche raised over a plate of golden varenyky](.github/media/cover.png)

Built for the DEV Frontend Challenge: Comfort Food Edition (Perfect Landing). Every visitor who donates a memory gets an exhibit generated from their own words, and a postcard to take home.

## Floor plan

The source is laid out the way the museum is:

```
src/
  App.tsx          the one page, assembled in room order
  main.tsx         the door: fonts, tokens, the booklet, the console note
  content/         the exhibition's writing - stories, curator notes, the Ramp,
                   the donation desk, the room guide, Plan Your Visit and the
                   staff entrance. Typed data, never inline.
  components/
    layout/        header, footer, container, section headings
    hero/          the display case and "How does tonight feel?"
    entrance/      the caretaker switching the lights on
    exhibition/    the four rooms, the placards, the Spotlight Unfold, the walk
      art/         each dish, drawn in SVG in the calibrated food language
    art/           the shared varenyk and the spot beam, reused by the hero,
                   the rooms and the donated exhibit
    donate/        the donation desk, the reserved frame, the generated exhibit,
                   the gift shop postcard
      food/        the six shapes a visitor's exhibit is plated from
    visit/         Plan Your Visit
    ui/            the one button
  hooks/           entrance state, in-view, scroll position, print expansion
  styles/          tokens, type, fonts, global, steam, print
  utils/           contrast maths, the staff entrance
  test/            the Vitest setup
  dev/             a reference page of tokens and ratios, dev builds only
```

Two rules hold the place together: content lives in `src/content/` as typed data, and the palette, type scale, spacing and timings are defined in `src/styles/tokens.css`; the hand-drawn SVG dishes carry their own literal values inline.

## Conservation notes

Accessibility is the first judging criterion, so it is built in rather than audited on. Everything below was measured against the deployed build.

- **Contrast is read from painted pixels, not from tokens.** Render a frame, render a second with every glyph transparent, compare: the background behind a text run is then provably the pixels behind it. 586 text runs across two viewports, with the labels open and closed, from 4.74:1 to 14.91:1. Zero AA failures. This is measured rather than declared because declared is not enough: a decorative shadow on a card's foot once took its label to 3.9:1 while axe and Lighthouse both passed it, since neither reads the pixel a shadow leaves behind. That case is now a test.
- **The keyboard routes through every room in 27 stops**, tab order matching reading order at 1280 and at 390, with a visible focus ring at each one. Every label is exposed to a screen reader, including the generated exhibit, whose art is decorative and whose placard carries the description.
- **Reduced motion ships with the motion**, in the same commit, for all 14 animations: the 13 keyframed ones and the Spotlight Unfold. Body text is byte-identical between modes.
- **axe runs in CI on every state** - and the incompletes have to be empty too, not just the violations.
- **Five browser projects** on every pull request: Chromium, WebKit, Firefox, and mobile Chrome and Safari. 449 end-to-end tests across 19 files, of which 29 are capability-gated skips, plus 127 unit tests.
- **Measured on the deployed build:** CLS 0.00 on desktop, on mobile and on Fast 3G; under 4x CPU throttling on a Pixel 7 no main-thread block runs past 76ms, and the 95th percentile frame gap is 9ms; Lighthouse accessibility 100, best practices 100 and SEO 100 on both desktop and mobile.

```bash
npm run verify   # format, lint, types, unit tests, build
```

```bash
npx playwright install   # once, to fetch the browsers
```

```bash
npx playwright test   # the five-project end-to-end matrix
```

Playwright builds and serves the site itself, so no dev server needs to be running first.

## Visiting

```bash
npm install
```

```bash
npm run dev      # the museum on localhost:5173
```

Print the page and you get the catalogue rather than a screenshot of a website: a title page, Exhibit 000, the four rooms with their labels opened for you, and the practical page. Seven sheets at Letter. The header, the donation desk and the footer stay off the paper, and so does every button, because none of them can do anything there.

Open the console for the staff entrance. It is the only thing the page ever logs.

## Credits

Type: [Young Serif](https://github.com/noirblancrouge/YoungSerif), [Familjen Grotesk](https://github.com/Familjen-Sthlm/Familjen-Grotesk), [IBM Plex Mono](https://github.com/IBM/plex) - all self-hosted under the SIL Open Font License 1.1. The licence text for each ships beside the fonts in [`public/fonts/`](public/fonts/).

Built by [Nazar Boyko](https://github.com/nazboyko). MIT licensed.
