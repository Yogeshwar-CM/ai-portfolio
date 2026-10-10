import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html = fs.readFileSync('index.html', 'utf8');
const scripts = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)];
const schema = JSON.parse(scripts.find(match => match[1].includes('application/ld+json'))[2]);
assert.equal(schema.mainEntity.name, 'Yogeshwar CM');
assert.equal(schema.mainEntity.sameAs[0], 'https://www.linkedin.com/in/yogeshwar-cm/');
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert.ok(html.includes('For individuals, founders, and teams.'));
assert.ok(!html.includes('data-mode="4"'));
assert.ok(html.includes('<summary>Also for seller training</summary>'));
const panelsInHtml = [...html.matchAll(/<article class="detail"[\s\S]*?<\/article>/g)];
assert.equal(panelsInHtml.length, 4);
assert.ok(panelsInHtml.every(match => match[0].includes('detail-description') && match[0].includes('mailto:') && !match[0].includes(' hidden')));
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(ids.length, new Set(ids).size);
for (const match of html.matchAll(/(?:href|aria-controls|aria-labelledby)="([^"]+)"/g)) {
  if (match[0].startsWith('href="#') || match[0].startsWith('aria-controls=') || match[0].startsWith('aria-labelledby=')) {
    assert.ok(ids.includes(match[1].replace(/^#/, '')), 'Broken reference ' + match[1]);
  }
}
function element(dataset = {}) {
  const active = new Set();
  return {
    dataset, attrs: {}, hidden: false, textContent: '',
    classList: { toggle(key, value) { if (value) active.add(key); else active.delete(key); }, add(key) { active.add(key); }, contains(key) { return active.has(key); } },
    setAttribute(key, value) { this.attrs[key] = value; },
    getAttribute(key) { return this.attrs[key]; },
    addEventListener(key, value) { this[key] = value; },
    querySelector() { return this.child ||= element(); },
    click() { this.eventsPrevented = false; this.onClick({ preventDefault: () => { this.eventsPrevented = true; } }); }
  };
}
const controls = Array.from({ length: 4 }, (_, i) => element({ mode: String(i) }));
controls.forEach(control => { control.addEventListener = function(key, value) { if (key === 'click') this.onClick = value; else this[key] = value; }; });
const branches = [...html.matchAll(/data-branch="(\d)"/g)].map(match => element({ branch: match[1] }));
const sources = ['tools', 'leads', 'calls', 'documents'].map(source => element({ source }));
const panels = Array.from({ length: 4 }, (_, i) => element({ panel: String(i) }));
const lists = { '[data-mode]': controls, '[data-branch]': branches, '[data-source]': sources, '[data-panel]': panels };
const selectors = new Map();
const document = { documentElement: element(), querySelectorAll(selector) { return lists[selector]; }, querySelector(selector) { if (!selectors.has(selector)) selectors.set(selector, element()); return selectors.get(selector); } };
const preference = { matches: false, addEventListener(key, value) { this[key] = value; } };
vm.runInNewContext(scripts.find(match => !match[1])[2], { document, matchMedia: () => preference, console });
assert.equal(controls[0].attrs['aria-pressed'], 'true');
for (let i = 0; i < 4; i++) {
  controls[i].click();
  assert.ok(controls[i].eventsPrevented, 'Selection must stay in the same view');
  assert.equal(controls.filter(control => control.attrs['aria-pressed'] === 'true').length, 1);
  assert.equal(controls[i].attrs.role, 'button');
  assert.deepEqual(panels.filter(panel => !panel.hidden).map(panel => panel.dataset.panel), [String(i)]);
  assert.deepEqual(sources.filter(source => source.classList.contains('is-active')).map(source => source.dataset.source), [['tools', 'leads', 'calls', 'documents'][i]]);
  assert.ok(branches.every(branch => branch.classList.contains('is-active') === (Number(branch.dataset.branch) === i)));
}
controls[2].keydown({ key: ' ', preventDefault() {} });
assert.equal(panels[2].hidden, false, 'Space must activate a keyboard selection');
const motion = selectors.get('#motion');
motion.click({ preventDefault() {} });
assert.equal(motion.attrs['aria-pressed'], 'true');
motion.click({ preventDefault() {} });
assert.equal(motion.attrs['aria-pressed'], 'false');
preference.change({ matches: true });
assert.ok(selectors.get('.map-section').classList.contains('is-paused'));
assert.ok(document.documentElement.classList.contains('enhanced'));
assert.ok(html.includes('@media(max-width:1100px)') && html.includes('grid-template-columns:repeat(2,minmax(0,1fr))'));
assert.ok(html.includes('min-height:44px') && html.includes('prefers-reduced-motion:reduce'));
assert.ok(html.includes('grid-template-columns:minmax(0,1fr) minmax(285px,.43fr)'), 'Desktop explanations must share the map row');
function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}
const palette = Object.fromEntries([...html.matchAll(/--([a-z]+):#([a-f\d]{6})/g)].map(match => [match[1], match[2]]));
const backgrounds = [palette.bg, ...[...html.matchAll(/background:linear-gradient\([^;]+\)/g)].flatMap(match => [...match[0].matchAll(/#([a-f\d]{6})/g)].map(color => color[1]))];
for (const text of [palette.ink, palette.secondary, palette.muted, palette.signal]) {
  for (const background of backgrounds) {
    const ratio = (luminance(text) + .05) / (luminance(background) + .05);
    assert.ok(ratio >= 4.5, 'Low text contrast: ' + text + ' on ' + background);
  }
}
assert.equal((html.match(/class="route-output"/g) || []).length, 4);
assert.ok(html.includes('.route-output{opacity:0}.route.is-active .route-output{opacity:1}'), 'Only the selected system should connect to the explanation');
const preview = fs.readFileSync('public/social-preview.png');
assert.equal(preview.subarray(1, 4).toString(), 'PNG');
assert.equal(preview.readUInt32BE(16), 1200);
assert.equal(preview.readUInt32BE(20), 630);
assert.ok(fs.existsSync('public/favicon.svg'), 'Favicon must be publicly served');
console.log('PASS: four workflows, inline panel selection, keyboard and motion controls, static SEO content, references, responsive rules, contrast, and public social assets.');
