import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root=path.resolve('public');
async function walk(dir){let out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory()){if(e.name!=='mobile')out.push(...await walk(f));}else if(/\.(webp|png|jpe?g|avif)$/i.test(e.name))out.push(f);}return out;}
const files=await walk(root);const report=[];
for(const f of files){
 const before=(await fs.stat(f)).size;const m=await sharp(f,{limitInputPixels:150000000}).metadata();
 if(Math.max(m.width,m.height)<=1920 && before<300000)continue;
 let p=sharp(f,{limitInputPixels:150000000}).rotate().resize({width:1920,height:1920,fit:'inside',withoutEnlargement:true});
 const ext=path.extname(f).toLowerCase();
 if(ext==='.webp')p=p.webp({quality:84,effort:4});else if(ext==='.avif')p=p.avif({quality:58,effort:3});else if(ext==='.png')p=p.png({compressionLevel:9});else p=p.jpeg({quality:85,mozjpeg:true});
 const result=await p.toBuffer({resolveWithObject:true});
 if(result.data.length<before || Math.max(m.width,m.height)>1920){await fs.writeFile(f,result.data);report.push({file:path.relative(root,f),before,after:result.data.length,width:result.info.width,height:result.info.height,originalWidth:m.width,originalHeight:m.height});}
 if(report.length%20===0)console.log('Optimized',report.length);
}
const focal={
 'hero-home.webp':[.34,.56], 'hero-about.webp':[.42,.5], 'servicehero.webp':[.58,.58],
 'camberwell1.webp':[.47,.56], 'contacthero.webp':[.44,.57], 'pool-dark-bg.webp':[.47,.5],
 'secninebg.webp':[.61,.55], 'Forest.webp':[.48,.52], 'menu-about.webp':[.55,.57],
 'sectiontwo.webp':[.5,.5], 'service-1-hero.webp':[.5,.5], 'service-2-hero.webp':[.5,.5], 'service-3-hero.webp':[.5,.5],
 'camberwell.webp':[.47,.55], 'about-paralell.webp':[.48,.48], 'faqbg.webp':[.6,.5], 'projectshero.webp':[.45,.55],
 'toorak-top-view.webp':[.48,.55], 'menu.webp':[.48,.55], 'service2.webp':[.48,.55], 'service3.webp':[.48,.55],
 'hero.webp':[.43,.58], 'appbg.png':[.5,.5], 'contact-bg.webp':[.5,.5]
};
const sources={};
for(const [name,[fx,fy]] of Object.entries(focal)){
 const f=path.join(root,name);try{await fs.access(f);}catch{continue;}
 const m=await sharp(f).metadata();const aspect=9/16;
 let w=m.width,h=Math.round(w/aspect);if(h>m.height){h=m.height;w=Math.round(h*aspect);}
 const left=Math.max(0,Math.min(m.width-w,Math.round(m.width*fx-w/2)));
 const top=Math.max(0,Math.min(m.height-h,Math.round(m.height*fy-h/2)));
 const dest='mobile/'+name.replace(/\.[^.]+$/,'.webp');
 await sharp(f).extract({left,top,width:w,height:h}).resize({width:900,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:82,effort:4}).toFile(path.join(root,dest));
 sources['/'+name]='/'+dest;
}
await fs.writeFile('src/lib/mobile-images.json',JSON.stringify(sources,null,2)+'\n');
await fs.writeFile('scripts/image-optimization-report.json',JSON.stringify({optimized:report.length,bytesBefore:report.reduce((s,x)=>s+x.before,0),bytesAfter:report.reduce((s,x)=>s+x.after,0),mobileVariants:Object.keys(sources).length,files:report},null,2)+'\n');
console.log(JSON.stringify({optimized:report.length,before:report.reduce((s,x)=>s+x.before,0),after:report.reduce((s,x)=>s+x.after,0),mobileVariants:Object.keys(sources).length}));
