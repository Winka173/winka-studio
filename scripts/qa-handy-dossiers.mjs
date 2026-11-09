import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(process.argv[2] || 'artifacts/handy-project-dossiers');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'MANIFEST.json'), 'utf8'));
assert.equal(manifest.reports.length, 14);
assert.deepEqual(manifest.reports.filter(r => r.completion === 'complete').map(r => r.app), ['handy_boards', 'handy_bookmark']);
const report = { files: [], errors: [], externalRequests: [] };
const browser = await chromium.launch({
  executablePath: process.env.BROWSER_EXECUTABLE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: true,
});
try {
  for (const entry of manifest.reports) {
    const context = await browser.newContext({ acceptDownloads: true });
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push({ app: entry.app, message: error.message }));
    page.on('request', request => { if (/^https?:/.test(request.url())) report.externalRequests.push(request.url()); });
    await page.goto(pathToFileURL(path.join(root, entry.file)).href, { waitUntil: 'load', timeout: 60000 });
    assert.equal(await page.locator('header > h1').innerText(), entry.name);
    assert.equal(await page.locator('header > .badge').innerText(), entry.completion === 'complete' ? 'ĐÃ HOÀN THIỆN' : 'ĐANG PHÁT TRIỂN');
    const counts = await page.locator('#dossier-data').evaluate(el => JSON.parse(el.textContent).counts);
    assert.equal(counts.uniqueImages, entry.uniqueImages);
    assert.equal(await page.locator('figure').count(), entry.uniqueImages);
    assert.equal(await page.locator('#documents > details').count(), entry.documents);
    assert.equal(await page.locator('video').count(), entry.videos);
    assert((await page.locator('#features').innerText()).length > 800, 'Substantial source-backed feature descriptions must be present');
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${entry.app}: horizontal overflow at ${width}`);
    }
    const images = page.locator('figure img');
    for (const index of [...new Set([0, Math.floor(entry.uniqueImages / 2), entry.uniqueImages - 1])]) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(el => { el.src = el.dataset.src; });
      await image.evaluate(el => el.decode());
      assert(await image.evaluate(el => el.naturalWidth > 0));
    }
    await images.first().click();
    assert(await page.locator('dialog').evaluate(el => el.open));
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog').evaluate(el => el.open), false);
    await page.locator('#search').fill('FUNCTIONS');
    assert((await page.locator('#search-status').innerText()).includes('mục khớp'));
    await page.locator('#search').fill('khong-co-tu-khoa-nay-zz923');
    assert.equal(await page.locator('#documents > details:visible').count(), 0);
    await page.locator('#search').fill('');
    await page.locator('#open-docs').click();
    assert.equal(await page.locator('#documents > details[open]').count(), entry.documents);
    await page.locator('#close-docs').click();
    assert.equal(await page.locator('#documents > details[open]').count(), 0);
    const downloading = page.waitForEvent('download');
    await page.locator('#download-data').click();
    const download = await downloading;
    assert.equal(download.suggestedFilename(), `${entry.app}-audit.json`);
    const downloaded = JSON.parse(fs.readFileSync(await download.path(), 'utf8'));
    assert.equal(downloaded.app, entry.app);
    assert.equal(downloaded.counts.uniqueImages, entry.uniqueImages);
    if (entry.videos) {
      const video = page.locator('video').first();
      await video.locator('..').locator('summary').click();
      await video.evaluate(async el => { el.muted = true; await el.play(); });
      await page.waitForTimeout(250);
      assert(await video.evaluate(el => el.currentTime > 0 && el.videoWidth > 0));
      await video.evaluate(el => el.pause());
    }
    if (['handy_boards', 'handy_tools', 'handy_widget'].includes(entry.app)) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(root, `${entry.app}-qa.png`) });
    }
    report.files.push({ app: entry.app, images: entry.uniqueImages, documents: entry.documents, videos: entry.videos, responsiveWidths: [390, 1440], passed: true });
    console.log(`PASS ${entry.app}: content, embedded media, responsive layout, search, disclosures, gallery and JSON download`);
    await context.close();
  }
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.externalRequests, []);
} finally {
  fs.writeFileSync(path.join(root, 'QA.json'), JSON.stringify(report, null, 2) + '\n');
  await browser.close();
}
