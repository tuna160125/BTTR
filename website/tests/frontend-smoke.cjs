const { chromium } = require('C:/Users/anasm/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:4174/');
if(await page.locator('#store .product-card').count()!==3)throw Error('Preview must have three products');
if(await page.locator('#store .see-more-card').count()!==1)throw Error('Missing See more card'); await page.locator('#store img').evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode()}))); await page.locator('#store').screenshot({path:'outputs/BTTR-Store-Preview.png'});
if(await page.locator('main > [data-section]').evaluateAll(els=>els.map(el=>el.id).join(','))!=='home,about,store')throw Error('Section order');
await page.locator('.see-more-card').click();await page.waitForURL('**/store.html');
if(await page.locator('[data-products] .product-card').count()!==6)throw Error('Full collection');
await page.getByRole('button',{name:'Robes & layers',exact:true}).click();if(await page.locator('[data-products] .product-card').count()!==1)throw Error('Category');
await page.locator('#header-search').fill('blue');await page.getByRole('button',{name:'Search collection',exact:true}).click();if(await page.locator('[data-products] .product-card').count()!==3)throw Error('Full page search');
await page.getByRole('button',{name:'Robes & layers',exact:true}).click();if(!await page.locator('[data-empty]').isVisible())throw Error('Empty state');await page.getByRole('button',{name:'See all pieces'}).click();if(await page.locator('[data-products] .product-card').count()!==6)throw Error('Reset');
await page.locator('.back-link').click();await page.waitForURL('**/index.html#store');
await page.locator('#header-search').fill('blue');await page.getByRole('button',{name:'Search collection',exact:true}).click();await page.waitForURL('**/store.html?q=blue');if(await page.locator('[data-products] .product-card').count()!==3)throw Error('Home search route');
for(const width of [360,390,768,1024,1440]){await page.setViewportSize({width,height:900});for(const file of ['index.html','store.html']){await page.goto('http://127.0.0.1:4174/'+file);await page.locator('img[src]').evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode()})));if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+width+' '+file);}}
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4174/');await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.getByRole('navigation').getByRole('link',{name:'Store',exact:true}).click();if(await page.getByRole('navigation').isVisible())throw Error('Menu close');await page.locator('.see-more-card').click();await page.waitForURL('**/store.html');
if(errors.length)throw Error(errors.join('\n'));
await page.screenshot({path:'outputs/BTTR-Store-Mobile.png',fullPage:true});
console.log('PASS: exactly 3 preview products + See more; full store navigation; return link; search from both pages; category/reset/empty states; mobile menu; images and no overflow at 5 widths. No JS errors.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

