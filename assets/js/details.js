/* Local frontend interactions only: no payment, account or inventory service. */
const make = (tag, className, text) => { const el = document.createElement(tag); if (className) el.className = className; if (text !== undefined) el.textContent = text; return el; };
let toastTimer;
function notify(message) { const toast = $('.toast'); toast.textContent = message; toast.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { toast.hidden = true; }, 3500); }
function readBag() {
  try { const value = JSON.parse(localStorage.getItem('bttr-preview-bag') || '[]'); if (!Array.isArray(value)) return []; return value.filter(item => item && pieces.some(p => p.id === item.id && p.sizes.includes(item.size)) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99).slice(0,100); } catch { return []; }
}
let bag = readBag();
function saveBag() { try { localStorage.setItem('bttr-preview-bag',JSON.stringify(bag)); } catch { notify('Your preview bag is available for this visit only.'); } renderBag(); }
function renderBag() {
  const count = bag.reduce((n,item) => n+item.quantity,0);
  const bagButton = $('[data-bag]'); bagButton.setAttribute('aria-label',`Open shopping bag (${count} items)`); $('span',bagButton).textContent = `Bag (${count})`;
  $('[data-bag-count]').textContent = `(${count})`; $('[data-bag-empty]').hidden = count > 0; $('[data-bag-bottom]').hidden = count === 0;
  const rows = bag.map(item => {
    const piece = pieces.find(p => p.id === item.id); const row = make('article','bag-item'); const image = make('img'); image.src = 'assets/images/'+piece.image; image.alt = piece.name; image.width=88;image.height=118;
    const content = make('div','bag-item-content'); const link=make('a','bag-product-name',piece.name);link.href='product.html?id='+encodeURIComponent(piece.id); content.append(link,make('p','muted',piece.color+' / Size '+item.size),make('p','muted','Pricing to be confirmed'));
    const controls=make('div','bag-controls');const quantity=make('div','quantity-control');
    for (const delta of [-1,1]) { const button=make('button','',delta<0?'−':'+');button.type='button';button.setAttribute('aria-label',(delta<0?'Decrease':'Increase')+' quantity of '+piece.name);button.disabled=delta<0?item.quantity===1:item.quantity===99;button.addEventListener('click',()=>{item.quantity+=delta;saveBag();$(`[aria-label="${button.getAttribute('aria-label')}"]`,$('[data-bag-items]'))?.focus();}); if(delta===1)quantity.append(make('span','',String(item.quantity)));quantity.append(button); }
    const remove=make('button','text-button','Remove');remove.setAttribute('aria-label','Remove '+piece.name);remove.addEventListener('click',()=>{bag=bag.filter(b=>b!==item);saveBag();$('.close-dialog',$('#bag-dialog')).focus();});controls.append(quantity,remove);content.append(controls);row.append(image,content);return row;
  }); $('[data-bag-items]').replaceChildren(...rows);
}
$('[data-bag]').addEventListener('click',()=>{renderBag();openDialog($('#bag-dialog'));});
window.addEventListener('storage',event=>{if(event.key==='bttr-preview-bag'){bag=readBag();renderBag();}});
renderBag();
$$('[data-unit]').forEach(button=>button.addEventListener('click',()=>{$$('[data-unit]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));$('[data-measure-unit]').textContent='('+button.dataset.unit+')';}));
const filterPanel = $('#filter-panel-form');
if(filterPanel){
 $('[data-open-filters]').addEventListener('click',()=>{const params=new URLSearchParams(location.search);for(const name of ['category','color','size']){const value=params.get(name)||'';const input=$$('input',filterPanel).find(el=>el.name===name&&el.value===value);if(input)input.checked=true;}openDialog($('#filters-dialog'));});
 $('[data-reset-panel]').addEventListener('click',()=>filterPanel.reset());
 filterPanel.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(filterPanel);document.dispatchEvent(new CustomEvent('bttr-filter',{detail:{category:data.get('category'),color:data.get('color'),size:data.get('size')}}));$('#filters-dialog').close();$('[data-open-filters]').focus();});
 $$('[data-sort]').forEach(button=>button.addEventListener('click',()=>{filterForm.elements.sort.value=button.dataset.sort;filterForm.dispatchEvent(new Event('input'));button.closest('details').open=false;$('.sort-menu summary').focus();}));
 document.addEventListener('click',event=>{const menu=$('.sort-menu');if(menu.open&&!menu.contains(event.target))menu.open=false;});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&$('.sort-menu').open){$('.sort-menu').open=false;$('.sort-menu summary').focus();}});
}
const searchInput=$('#header-search');
if(searchInput){
 const list=$('#search-suggestions');let suggestionIndex=-1;let suggestions=[];
 function closeSuggestions(){list.hidden=true;searchInput.setAttribute('aria-expanded','false');searchInput.removeAttribute('aria-activedescendant');suggestionIndex=-1;}
 function highlightSuggestion(){const options=$$('[role=option]',list);options.forEach((el,i)=>el.setAttribute('aria-selected',String(i===suggestionIndex)));if(options[suggestionIndex])searchInput.setAttribute('aria-activedescendant',options[suggestionIndex].id);else searchInput.removeAttribute('aria-activedescendant');}
 function searchSuggestions(){const query=searchInput.value.trim().toLowerCase();if(!query){closeSuggestions();return;}suggestions=pieces.filter(piece=>(piece.name+' '+piece.category+' '+piece.color).toLowerCase().includes(query)).slice(0,4);const options=suggestions.map((piece,index)=>{const option=make('div','suggestion');option.id='suggestion-'+index;option.setAttribute('role','option');option.setAttribute('aria-selected','false');const image=make('img');image.src='assets/images/'+piece.image;image.alt='';const copy=make('span');copy.append(make('strong','',piece.name),make('small','',piece.color+' · '+piece.category));option.append(image,copy);option.addEventListener('pointerdown',e=>e.preventDefault());option.addEventListener('click',()=>location.assign('product.html?id='+encodeURIComponent(piece.id)+'&return='+encodeURIComponent('store.html?q='+encodeURIComponent(searchInput.value))));return option;});list.replaceChildren(...options);if(!options.length)list.append(make('p','no-suggestion','No matching pieces. Press Enter to view search results.'));list.hidden=false;searchInput.setAttribute('aria-expanded','true');suggestionIndex=-1;}
 searchInput.addEventListener('input',searchSuggestions);searchInput.addEventListener('focus',()=>{if(searchInput.value)searchSuggestions();});searchInput.addEventListener('blur',closeSuggestions);
 searchInput.addEventListener('keydown',event=>{if(event.key==='Escape'){closeSuggestions();return;}if(['ArrowDown','ArrowUp'].includes(event.key)&&!list.hidden){event.preventDefault();if(!suggestions.length)return;suggestionIndex=(suggestionIndex+(event.key==='ArrowDown'?1:-1)+suggestions.length)%suggestions.length;highlightSuggestion();}if(event.key==='Enter'&&suggestionIndex>=0&&!list.hidden){event.preventDefault();location.assign('product.html?id='+encodeURIComponent(suggestions[suggestionIndex].id)+'&return=store.html');}});
 searchInput.form.addEventListener('submit',closeSuggestions);
}
if($('.product-main')){
 const params=new URLSearchParams(location.search),piece=pieces.find(p=>p.id===params.get('id'));
 const candidate=params.get('return')||'store.html';const returnTo=/^(?:store|index)\.html(?:[?#].*)?$/.test(candidate)?candidate:'store.html';$('[data-product-back]').href=returnTo;
 if(!piece){$('[data-product-content]').hidden=true;$('[data-product-not-found]').hidden=false;document.title='Product not found — BTTR';}
 else{
  document.title=piece.name+' — BTTR';$('#product-name').textContent=piece.name;$('[data-product-description]').textContent=piece.description;$('[data-product-category]').textContent=piece.category+' · BTTR';$('[data-product-color]').textContent=piece.color;$('[data-product-swatch]').style.background=piece.swatch;
  const images=piece.id==='everyday-pajama'?[piece.image,'hero-0.jpg']:[piece.image];let selectedSize='';
  function selectImage(file){$('[data-product-image]').src='assets/images/'+file;$('[data-product-image]').alt=piece.name+' — example styling';$$('[data-gallery-image]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.galleryImage===file)));}
  images.forEach((file,index)=>{const button=make('button');button.dataset.galleryImage=file;button.setAttribute('aria-label','View reference image '+(index+1));const image=make('img');image.src='assets/images/'+file;image.alt='';button.append(image);button.addEventListener('click',()=>selectImage(file));$('[data-thumbnails]').append(button);});selectImage(images[0]);
  $('.gallery-zoom').addEventListener('click',()=>{$('[data-zoom-image]').src=$('[data-product-image]').src;$('[data-zoom-image]').alt=$('[data-product-image]').alt;openDialog($('#zoom-dialog'));});
  piece.sizes.forEach(size=>{const button=make('button','',size);button.type='button';button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>{selectedSize=size;$$('button',$('[data-product-sizes]')).forEach(b=>b.setAttribute('aria-pressed',String(b===button)));$('[data-add-bag]').disabled=false;$('[data-size-status]').textContent='Size '+size+' selected for the preview.';});$('[data-product-sizes]').append(button);});
  $('[data-add-bag]').addEventListener('click',()=>{if(!piece.sizes.includes(selectedSize))return;const existing=bag.find(item=>item.id===piece.id&&item.size===selectedSize);if(existing&&existing.quantity>=99){notify('The preview quantity limit is 99.');return;}if(existing)existing.quantity++;else bag.push({id:piece.id,size:selectedSize,quantity:1});saveBag();openDialog($('#bag-dialog'));});
  const related=pieces.filter(p=>p.id!==piece.id&&(p.color===piece.color||p.category===piece.category)).slice(0,2);if(!related.length)$('[data-complete-section]').hidden=true;else related.forEach(p=>$('[data-related]').append(card(p)));observe();
 }
}

// Restore the Store browsing position only after an explicit product return.
if ($('[data-products]')) {
  document.addEventListener('click', event => {
    const link = event.target.closest('.product-open');
    if (!link) return;
    try { sessionStorage.setItem('bttr-browse-position', JSON.stringify({ url: 'store.html'+location.search, y: scrollY })); } catch { /* optional */ }
  });
  try {
    const restore = sessionStorage.getItem('bttr-restore-browse');
    sessionStorage.removeItem('bttr-restore-browse');
    const saved = JSON.parse(sessionStorage.getItem('bttr-browse-position') || 'null');
    if (restore === 'store.html'+location.search && saved?.url === restore && Number.isFinite(saved.y)) {
      const restoreScroll = () => window.scrollTo({ top: Math.max(0,saved.y), behavior: 'instant' });
      if (document.readyState === 'complete') restoreScroll(); else window.addEventListener('load', restoreScroll, { once: true });
    }
  } catch { /* Browsing remains usable when storage is disabled. */ }
}
$('[data-product-back]')?.addEventListener('click', event => {
  try { const destination = new URL(event.currentTarget.href); if (destination.pathname.endsWith('store.html')) sessionStorage.setItem('bttr-restore-browse','store.html'+destination.search); } catch { /* optional */ }
});
