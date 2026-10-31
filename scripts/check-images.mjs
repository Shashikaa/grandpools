import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const map=JSON.parse(await fs.readFile('src/lib/mobile-images.json','utf8'));
async function walk(dir){const out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(f));else if(/\.(webp|png|jpe?g|avif)$/i.test(e.name))out.push(f);}return out;}
const files=await walk('public');let max=0;
for(const f of files){const m=await sharp(f,{limitInputPixels:150000000}).metadata();max=Math.max(max,m.width,m.height);if(m.width>1920||m.height>1920)throw Error('Oversized image: '+f);}
for(const [desktop,mobile] of Object.entries(map)){await fs.access(path.join('public',desktop));await fs.access(path.join('public',mobile));}
console.log(JSON.stringify({checked:files.length,maximumDimension:max,mobileSources:Object.keys(map).length}));
