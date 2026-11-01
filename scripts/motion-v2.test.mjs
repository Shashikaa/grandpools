import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const exports = {};
const source = fs.readFileSync(new URL('../src/components/motion/settings.ts', import.meta.url), 'utf8');
vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, { exports });
const { collectionIndex, storyDistance, pinsStory, scrollSettings, entryTextAt, maskRevealEnd, sceneLayout, processTiming, qualityEntryOffset } = exports;

test('forward, reverse and rapid scroll jumps select the correct collection item', () => {
  assert.deepEqual([0,0.34,0.7,1,0.4,0].map(p => collectionIndex(p,3)), [0,1,2,2,1,0]);
  assert.equal(collectionIndex(10,3),2); assert.equal(collectionIndex(-10,3),0);
  assert.equal(collectionIndex(0.5,0),0);
});
test('ordinary sections have no extra inner story, while mobile contact remains readable', () => {
  assert.equal(pinsStory('standard',false),false);
  assert.equal(pinsStory('standard',true),false);
  assert.equal(pinsStory('contact-story',true),false);
  assert.equal(pinsStory('process',false),true);
});
test('longer project stories receive enough scroll distance without a page-wide track', () => {
  assert.ok(storyDistance('sequence',false,6)>storyDistance('sequence',false,2));
  assert.ok(storyDistance('process',true,2)>=2.5);
  assert.ok(storyDistance('process',false,2)>=3);
  assert.ok(storyDistance('quality',false,2)>=2);
  assert.ok(storyDistance('quality',true,2)>=1.5);
  assert.ok(storyDistance('service-story',false,2)>=3.6);
  assert.ok(storyDistance('invitation',false,2)>=1.2);
});
test('wheel easing converges smoothly and touch retains native momentum', () => {
  let previous=0;
  for(let i=0;i<=100;i++){const p=scrollSettings.easing(i/100);assert.ok(p>=previous&&p<=1);previous=p;}
  assert.equal(previous,1); assert.equal(scrollSettings.syncTouch,false);
});
test('all route controllers are free of the retired virtual-scroll engine', () => {
  const files=['HomeDesktop.tsx','HomeMobile.tsx','about/AboutDesktop.tsx','about/AboutMobile.tsx','contact/ContactDesktop.tsx','contact/ContactMobile.tsx','services/ServiceDesktop.tsx','services/ServiceMobile.tsx','services/[slug]/SubServicesDesktop.tsx','services/[slug]/SubServicesMobile.tsx','projects/ProjectsDesktop.tsx','projects/ProjectsMobile.tsx','projects/[slug]/SingleProjectPageDesktop.tsx','projects/[slug]/SingleProjectPageMobile.tsx'];
  for(const file of files){const text=fs.readFileSync(new URL('../src/app/'+file,import.meta.url),'utf8');assert.doesNotMatch(text,/targetProgress|fixedFrameRef|requestAnimationFrame|requestSceneFrame|gp-pin-track|stepProgress/,file);}
});
test('hero typography has no inherited zero-opacity intro gate', () => {
  const css = fs.readFileSync(new URL('../src/app/globals.css', import.meta.url),'utf8');
  const baseline = css.match(/\.hero-text-target\s*\{([^}]*)\}/)?.[1] ?? '';
  assert.doesNotMatch(baseline, /opacity:\s*0\s*;/);
  assert.doesNotMatch(baseline, /translate3d\(0,\s*40px/);
});

test('entry cues expose lower copy before top copy and stay within the entry budget', () => {
  for (const height of [568,844,936,1080]) {
    const lower = entryTextAt(height * 0.8,height);
    const upper = entryTextAt(height * 0.15,height);
    assert.ok(lower < upper);
    for (const y of [-100,0,height*0.2,height*0.8,height*2]) {
      const start = entryTextAt(y,height,10);
      assert.ok(start >= 0.1);
      assert.ok(start + 0.14 + 0.055 <= 1);
    }
    assert.equal(maskRevealEnd,1);
  }
});

test('sticky hold and next entry meet continuously for short and tall scenes', () => {
  for (const viewport of [568,844,936,1080]) {
    for (const content of [viewport,viewport*1.6,viewport*3]) {
      for (const story of [0,0.45,1.1,3.6]) {
        const layout = sceneLayout(viewport,content,story,1);
        assert.equal(layout.top,viewport-content);
        const storyStart = content-viewport;
        const handoffStart = storyStart+story*viewport;
        const nextEntryStart = layout.height-viewport-viewport;
        assert.ok(Math.abs(handoffStart-nextEntryStart)<0.0001);
        assert.ok(Math.abs((storyStart+layout.hold)-(layout.height-viewport))<0.0001);
      }
    }
  }
});
test('scene holding never swaps the viewport into a fixed ScrollTrigger pin', () => {
  const stage = fs.readFileSync(new URL('../src/components/motion/LuxuryStage.tsx',import.meta.url),'utf8');
  assert.doesNotMatch(stage,/pin:\s*view|anticipatePin/);
  const smooth = fs.readFileSync(new URL('../src/components/SmoothScroll.tsx',import.meta.url),'utf8');
  assert.doesNotMatch(smooth,/observer\.observe\(document.body\)/);
});

test('Process photo settles before the text journey and split-image transition', () => {
  const settled = processTiming.settleStart + processTiming.settleDuration;
  assert.ok(processTiming.innerStart > settled);
  assert.ok(processTiming.swapStart > settled);
  assert.ok(processTiming.fadeStart + processTiming.fadeDuration < settled);
  const end = Math.max(processTiming.innerStart + processTiming.textDuration, processTiming.swapStart + processTiming.swapDuration) + 0.5;
  // Enough document travel for the full-width photo crop without rushing.
  assert.ok(processTiming.settleDuration / end * storyDistance('process',false,2) >= 0.7);
});

test('authored text visibility does not override scroll-linked fades', () => {
  const css = fs.readFileSync(new URL('../src/app/globals.css',import.meta.url),'utf8');
  const textRule = css.match(/\.reveal-text\s*\{([^}]*)\}/)?.[1] ?? '';
  assert.doesNotMatch(textRule,/(?:opacity|visibility):[^;]*!important/);
});

test('static mobile scenes reserve no invisible inner-story distance', () => {
  for (const kind of ['invitation','harmony']) {
    assert.equal(pinsStory(kind,true),false);
    assert.equal(storyDistance(kind,true,2),0);
  }
  assert.ok(processTiming.secondSwapStart >= processTiming.swapStart + processTiming.swapDuration);
});
test('normal app continuation follows the story with no extra sticky handoff', () => {
  for(const viewport of [667,844,936]) {
    for(const story of [0,1.2,3.4,4.6]) {
      const previous = sceneLayout(viewport,viewport,story,0);
      const storyEnd = viewport*story;
      assert.ok(Math.abs(previous.height-storyEnd-viewport)<0.0001);
      // The next normal-flow section starts at the viewport bottom at story end.
      const appTop = previous.height;
      assert.ok(Math.abs(appTop-storyEnd-viewport)<0.0001);
    }
  }
});

test('Home hero follows the same scroll budget as the Projects editorial hero', () => {
  for (const mobile of [false,true]) {
    assert.equal(pinsStory('home-hero',mobile),true);
    assert.equal(storyDistance('home-hero',mobile,2),storyDistance('editorial-hero',mobile,2));
  }
});

 test('Quality incoming copy starts just beyond the viewport without an extra-screen gap', () => {
  for (const viewport of [568,852,936,1080]) for(const top of [0,viewport*.3,viewport*.7]) {
    assert.equal(top+qualityEntryOffset(viewport,top),viewport+16);
  }
  assert.equal(qualityEntryOffset(852,1000),0);
});
test('Harmony zoom uses entry distance without a second story hold', () => {
  for (const mobile of [false,true]) {
    assert.equal(storyDistance('harmony',mobile,2),0);
    assert.equal(pinsStory('harmony',mobile),false);
  }
});

test('mobile scene measurement stays unchanged when browser toolbar height changes', () => {
 const code=fs.readFileSync(new URL('../src/components/motion/viewport.ts',import.meta.url),'utf8');
 const api={};
 const window={innerHeight:680};
 const probe={style:{},getBoundingClientRect:()=>({height:780}),remove(){}};
 const document={createElement:()=>probe,documentElement:{appendChild(){}}};
 vm.runInNewContext(ts.transpileModule(code,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:api,window,document});
 assert.equal(api.stableSceneHeight(),780);
 window.innerHeight=780;
 assert.equal(api.stableSceneHeight(),780);
 window.innerHeight=450;
 assert.equal(api.stableSceneHeight(),780);
});
