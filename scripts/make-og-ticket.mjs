/* Builds the OG admission ticket once, in the museum's own tokens. Run with:
   node scripts/make-og-ticket.mjs   (writes public/og-ticket.png) */
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";

const tokens = readFileSync("src/styles/tokens.css", "utf8");
const token = (name) =>
  tokens.match(new RegExp(`--${name}: (#[0-9a-f]{6})`))[1];

const ink = token("ink");
const plaster = token("plaster");
const brass = token("brass");
const tungsten = token("tungsten");

const html = `<!doctype html><meta charset="utf-8" />
<style>
  @font-face { font-family: "Young Serif"; src: url("http://localhost:4173/fonts/young-serif-400-latin.woff2") format("woff2"); }
  @font-face { font-family: "Plex"; src: url("http://localhost:4173/fonts/ibm-plex-mono-400-latin.woff2") format("woff2"); }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: ${ink}; display: grid; place-items: center;
         font-family: "Plex", monospace; color: ${plaster}; }
  .ticket { width: 1080px; height: 510px; border: 2px solid ${brass}; position: relative;
            display: grid; grid-template-columns: 1fr 300px; }
  .ticket::before { content: ""; position: absolute; inset: 14px; border: 1px solid ${brass}55; }
  .body { padding: 62px 64px; display: flex; flex-direction: column; justify-content: space-between; }
  .admit { font-size: 22px; letter-spacing: 0.34em; color: ${tungsten}; }
  .name { font-family: "Young Serif", serif; font-size: 104px; line-height: 1; letter-spacing: 0.02em; }
  .sub { margin-top: 18px; font-size: 24px; letter-spacing: 0.22em; color: ${brass}; }
  .thesis { font-size: 27px; line-height: 1.45; max-width: 30ch; }
  .stub { border-left: 2px dashed ${brass}88; padding: 62px 40px; display: flex; flex-direction: column;
          justify-content: space-between; align-items: flex-start; }
  .stub div { font-size: 19px; letter-spacing: 0.16em; color: ${brass}; }
  .stub strong { display: block; margin-top: 8px; font-size: 22px; letter-spacing: 0.1em; color: ${plaster}; font-weight: 400; }
  .glow { position: absolute; left: 46%; top: 52%; width: 760px; height: 420px; transform: translate(-50%, -50%);
          background: radial-gradient(ellipse at center, ${tungsten}26, transparent 68%); }
</style>
<div class="ticket">
  <div class="glow"></div>
  <div class="body">
    <div>
      <p class="admit">ADMIT ONE</p>
      <h1 class="name">STILL WARM</h1>
      <p class="sub">THE MUSEUM OF COMFORT</p>
    </div>
    <p class="thesis">An exhibition of dishes that taste like home.</p>
  </div>
  <div class="stub">
    <div>ADMISSION<strong>FREE</strong></div>
    <div>HOURS<strong>WHENEVER YOU<br />MISS HOME</strong></div>
    <div>CAT.<strong>001 - 007</strong></div>
  </div>
</div>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const shot = await page.screenshot({ type: "png" });
writeFileSync("public/og-ticket.png", shot);
await browser.close();
console.log(`og-ticket.png written, ${Math.round(shot.length / 1024)}KB`);
