import { chromium } from '@playwright/test';
import fs from 'node:fs';
const root='.review/product-captures';
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
for(const [slug,base,paths] of [
 ['asset-forge-studio','http://127.0.0.1:8765',['/']],
 ['autonomous-creative-studio','http://127.0.0.1:3467',['/api/desktop/pair?token=winka-website-local-capture','/studio/create','/studio/models']],
]){
 const folder=`${root}/${slug}`;fs.mkdirSync(folder,{recursive:true});
 const context=await browser.newContext({viewport:{width:1600,height:1000}});const page=await context.newPage();
 const report={product:slug,source:'actual running local app, isolated capture data',captures:[],errors:[]};
 page.on('pageerror',e=>report.errors.push(e.message));
 for(let i=0;i<paths.length;i++){
  try{const response=await page.goto(base+paths[i],{waitUntil:'networkidle',timeout:45000});if(!response?.ok())throw new Error(`Capture route returned ${response?.status()}: ${paths[i]}`);await page.waitForTimeout(1200);await page.screenshot({path:`${folder}/runtime-${i}.png`,fullPage:false});report.captures.push({url:page.url(),file:`runtime-${i}.png`});}
  catch(e){report.errors.push(e.message);}
 }
 fs.writeFileSync(`${folder}/web-capture.json`,JSON.stringify(report,null,2));console.log(slug,JSON.stringify(report));await context.close();
}
await browser.close();
