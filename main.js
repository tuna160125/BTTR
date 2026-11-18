const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
function openDialog(dialog) {
  // Native dialogs provide keyboard trapping, Escape dismissal and focus restoration.
  $$('dialog[open]').forEach(item => item.close());
  dialog.showModal();
}
$$('.close-dialog').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
$$('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } }));
$('[data-year]').textContent = new Date().getFullYear();

const information = {
  bag: ['Your bag is taking a little rest.', 'There are no items in your bag. This first preview lets you explore the collection; product selection and shopping bag functionality are coming in the next frontend steps.'],
  sizing: ['Finding your fit.', 'Product-specific size guides will appear here once the final measurements are available. No sample measurements are being presented as real sizing advice.'],
  shipping: ['The journey to your door.', 'Delivery areas, shipping rates, delivery estimates, and exchange and return terms will be added once the brand’s policies are confirmed.'],
  tracking: ['Your order, at a glance.', 'Secure order tracking will be connected when order services are ready. This frontend preview does not accept or look up real orders.'],
  privacy: ['Your space stays yours.', 'This preview has no customer accounts, payment collection, or analytics tracking. It does not request personal details. Collection filters are kept in the page URL. Your sample bag is stored on this device only and contains product references, sizes and quantities, with no personal or payment details.' ]
};
function showInfo(key) { const value = information[key]; if (!value) return; $('[data-info-title]').textContent = value[0]; $('[data-info-body]').textContent = value[1]; openDialog($('#info-dialog')); }

$$('[data-info]').forEach(button => button.addEventListener('click', () => button.dataset.info === 'sizing' ? openDialog($('#size-dialog')) : showInfo(button.dataset.info)));
const toggle = $('.menu-toggle');
toggle.addEventListener('click', () => { const expanded = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(expanded)); toggle.setAttribute('aria-label', expanded ? 'Close menu' : 'Open menu'); $('#navigation').classList.toggle('open', expanded); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { toggle.click(); toggle.focus(); } });
function card(piece) {
  const article = document.createElement('article'); article.className = 'product-card reveal';
  // All text is assigned with textContent; URL search input is never inserted as HTML.
  const button = document.createElement('a'); button.className = 'product-open'; const returnTo = location.pathname.split('/').pop() || 'index.html'; button.href = `product.html?id=${encodeURIComponent(piece.id)}&return=${encodeURIComponent(returnTo + location.search + location.hash)}`; button.setAttribute('aria-label', `View ${piece.name}`);
  const wrap = document.createElement('div'); wrap.className = 'image-wrap';
  const image = document.createElement('img'); image.src = `assets/images/${piece.image}`; image.alt = `${piece.color} ${piece.category.toLowerCase()} reference styling`; image.loading = 'lazy'; image.width = 663; image.height = 994; wrap.append(image);
  const label = document.createElement('div'); label.className = 'product-label'; const title = document.createElement('h3'); title.textContent = piece.name; const arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true'); label.append(title, arrow); button.append(wrap, label);
  const meta = document.createElement('p'); meta.className = 'product-meta'; const swatch = document.createElement('span'); swatch.className = 'swatch'; swatch.style.setProperty('--swatch', piece.swatch); meta.append(swatch, document.createTextNode(`${piece.color} · ${piece.category}`)); article.append(button, meta);
  return article;
}
const motion = !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window;
let observer;
if (motion) { document.documentElement.classList.add('js-motion'); observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 }); }
function observe() { if (observer) $$('.reveal:not(.visible)').forEach(el => observer.observe(el)); }
if ($('[data-featured]')) { pieces.slice(0,3).forEach(piece => $('[data-featured]').append(card(piece))); }
const filterForm = $('#store-filters');
if (filterForm) {
  let state = { q: '', category: '', color: '', size: '', sort: 'featured' };
  function readURL() { const params = new URLSearchParams(location.search); for (const key of Object.keys(state)) state[key] = params.get(key) || (key === 'sort' ? 'featured' : ''); if (!['', 'Sleepwear', 'Robes', 'Bridal'].includes(state.category)) state.category = ''; if (!['', 'Ivory', 'Blue', 'Beige'].includes(state.color)) state.color = ''; if (!['featured','az','za'].includes(state.sort)) state.sort = 'featured'; if (!['','XS','S','M','L','XL'].includes(state.size)) state.size = ''; state.q = state.q.slice(0,100); }
  function render(updateURL = true) {
    for (const key of ['q','color','size','sort']) filterForm.elements[key].value = state[key];
    $('#header-search').value = state.q;
    const filterCount = ['category','color','size'].filter(key => state[key]).length;
    $('[data-filter-count]').textContent = filterCount ? ` (${filterCount})` : '';
    $('[data-filter-summary]').textContent = [state.category,state.color,state.size].filter(Boolean).join(' · ');
    $$('[data-sort]').forEach(button => { button.setAttribute('aria-checked', String(button.dataset.sort === state.sort)); });
    $('[data-sort-label]').textContent = ({featured:'Featured',az:'Name: A–Z',za:'Name: Z–A'})[state.sort];
    $$('[data-category]').forEach(button => { const active = button.dataset.category === state.category; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    let results = pieces.filter(p => (!state.category || p.category === state.category) && (!state.color || p.color === state.color) && (!state.size || p.sizes.includes(state.size)) && `${p.name} ${p.color} ${p.category}`.toLowerCase().includes(state.q.trim().toLowerCase()));
    if (state.sort !== 'featured') results.sort((a,b) => (state.sort === 'za' ? -1 : 1) * a.name.localeCompare(b.name));
    $('[data-products]').replaceChildren(...results.map(card)); $('[data-result-count]').textContent = `${results.length} ${results.length === 1 ? 'piece' : 'pieces'}`; $('[data-empty]').hidden = results.length > 0;
    if (updateURL) { const params = new URLSearchParams(); for (const [key,value] of Object.entries(state)) if (value && !(key === 'sort' && value === 'featured')) params.set(key,value); history.replaceState(null,'', `${location.pathname}${params.size ? '?' + params : ''}${location.hash}`); }
    observe();
  }
  document.addEventListener('bttr-filter', event => {
    for (const key of ['category','color','size']) state[key] = event.detail[key] || '';
    render();
  });
  filterForm.addEventListener('submit', e => e.preventDefault());
  filterForm.addEventListener('input', () => { for (const key of ['q','color','size','sort']) state[key] = filterForm.elements[key].value; render(); });
  function clear() { state = { q:'',category:'',color:'',size:'',sort:'featured' }; render(); }
  filterForm.addEventListener('reset', e => { e.preventDefault(); clear(); }); $('[data-clear]').addEventListener('click',clear);
  $$('[data-category]').forEach(button => button.addEventListener('click', () => { state.category = button.dataset.category; render(); }));
  window.addEventListener('popstate', () => { readURL(); render(false); });
  $('.header-search').addEventListener('submit', event => {
    event.preventDefault(); state.q = $('#header-search').value.slice(0,100); state.category = ''; state.color = ''; render();
    if ($('#store')) { location.hash = 'store'; $('#store').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }
  });
  readURL(); render(false); $('#header-search').value = state.q;
}
observe();

// A single liquid highlight moves between labels; text stays sharp above it.
const nav = $('#navigation');
const navHighlight = document.createElement('span');
navHighlight.className = 'nav-highlight';
navHighlight.style.viewTransitionName = 'nav-selection';
navHighlight.setAttribute('aria-hidden', 'true');
nav.prepend(navHighlight);
const arrivalNavigation = window.BTTR_NAVIGATION || null;
let arrivalPending = Boolean(arrivalNavigation);
let highlightTarget = null;
let highlightAnimation = null;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
function moveHighlight(link, immediate = false) {
  if (!link || !nav.offsetWidth) return;
  const target = { left: link.offsetLeft, top: link.offsetTop, width: link.offsetWidth, height: link.offsetHeight };
  if (!immediate && highlightTarget === link && Math.abs(parseFloat(navHighlight.style.left) - target.left) < 1 && Math.abs(parseFloat(navHighlight.style.width) - target.width) < 1) return;
  const current = navHighlight.getBoundingClientRect();
  const parent = nav.getBoundingClientRect();
  const hadPosition = highlightTarget !== null;
  const fromLeft = current.left - parent.left - nav.clientLeft;
  const fromWidth = current.width;
  if (highlightAnimation) highlightAnimation.cancel();
  Object.assign(navHighlight.style, { left: target.left + 'px', top: target.top + 'px', width: target.width + 'px', height: target.height + 'px', opacity: '1' });
  highlightTarget = link;
  if (immediate || reduceMotion.matches || !hadPosition || !navHighlight.animate) return;
  const right = Math.max(fromLeft + fromWidth, target.left + target.width);
  const left = Math.min(fromLeft, target.left);
  // A soft bridge forms between old and new positions, then gathers into the new pill.
  highlightAnimation = navHighlight.animate([
    { left: fromLeft + 'px', width: fromWidth + 'px', opacity: 1, filter: 'blur(0px)', transform: 'scaleY(1)', offset: 0 },
    { left: left + 'px', width: (right-left) + 'px', opacity: .7, filter: 'blur(2px)', transform: 'scaleY(.84)', offset: .4 },
    { left: target.left + 'px', width: target.width + 'px', opacity: .95, filter: 'blur(.5px)', transform: 'scaleY(1.035)', offset: .82 },
    { left: target.left + 'px', width: target.width + 'px', opacity: 1, filter: 'blur(0px)', transform: 'scaleY(1)', offset: 1 }
  ], { duration: 620, easing: 'cubic-bezier(.22,.61,.36,1)' });
}
const sectionLinks = $$('[data-section-link]');
const pageSections = $$('[data-section]');
let scrollDestination = null;
let scrollFrame = false;
let scrollEndTimer;
function setActiveSection(id, immediate = false) {
  sectionLinks.forEach(link => {
    if (link.dataset.sectionLink === id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  if (!arrivalPending) moveHighlight(sectionLinks.find(link => link.dataset.sectionLink === id), immediate);
}
function sectionAtReadingPosition() {
  const readingLine = $('.site-header').getBoundingClientRect().bottom + 80;
  let active = 'home';
  pageSections.forEach(section => { if (section.getBoundingClientRect().top <= readingLine) active = section.id; });
  // A short final section may not reach the reading line before the page ends.
  if (scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 2) active = pageSections.at(-1)?.id || active;
  return active;
}
function updateActiveSection() {
  scrollFrame = false;
  if (pageSections.length && !scrollDestination) setActiveSection(sectionAtReadingPosition());
}
function finishNavigation() {
  clearTimeout(scrollEndTimer);
  // Keep the chosen section selected on arrival. A later scroll may select a new one.
  scrollDestination = null;
}
function navigateToSection(id, { record = true, immediate = false } = {}) {
  const target = pageSections.find(section => section.id === id);
  if (!target) return;
  if (toggle.getAttribute('aria-expanded') === 'true') toggle.click();
  scrollDestination = id;
  clearTimeout(scrollEndTimer);
  setActiveSection(id, immediate);
  if (record && location.hash !== '#' + id) history.pushState(null, '', '#' + id);
  // Match the approved screenshot framing, rather than centering a tall section.
  const phone = matchMedia('(max-width: 700px)').matches;
  const anchors = {
    home: phone ? target.querySelector('.hero-copy') : target.querySelector('.hero-image'),
    about: target.querySelector('.about-layout'),
    store: target.querySelector('.section-heading h2')
  };
  const anchor = anchors[id] || target;
  const gap = phone ? 24 : ({ home: 0, about: 35, store: 16 }[id] || 0);
  const top = anchor.getBoundingClientRect().top + scrollY - $('.site-header').offsetHeight - gap;
  window.scrollTo({ top: Math.max(0, top), behavior: immediate || reduceMotion.matches ? 'instant' : 'smooth' });
  // Also settles same-position clicks where the browser produces no scroll event.
  scrollEndTimer = setTimeout(finishNavigation, 180);
}
window.addEventListener('scroll', () => {
  if (scrollDestination) {
    clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(finishNavigation, 180);
    return;
  }
  if (!scrollFrame) { scrollFrame = true; requestAnimationFrame(updateActiveSection); }
}, { passive: true });
// When supported this replaces the fallback's wait with the actual end of scrolling.
window.addEventListener('scrollend', finishNavigation);
function interruptNavigation() {
  if (!scrollDestination) return;
  finishNavigation();
  window.scrollTo({ top: scrollY, behavior: 'instant' });
  updateActiveSection();
}
window.addEventListener('wheel', interruptNavigation, { passive: true });
window.addEventListener('touchmove', interruptNavigation, { passive: true });
window.addEventListener('keydown', event => {
  if (['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key) && !event.target.closest('input,textarea,select,button')) interruptNavigation();
});
// All main-page anchor links share one scrolling controller; native hash scrolling
// cannot race with a second scroll operation or a timer changing the active item.
$$('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const id = link.getAttribute('href').slice(1);
  if (!pageSections.some(section => section.id === id) || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  navigateToSection(id);
}));
function resetNavPosition() { if (!arrivalPending) moveHighlight($('#navigation a[aria-current]'), true); }
window.addEventListener('resize', resetNavPosition);
// Re-measure the pill when phone orientation, zoom, or label sizing changes.
if ('ResizeObserver' in window) {
  const navSizeObserver = new ResizeObserver(resetNavPosition);
  navSizeObserver.observe(nav);
}
reduceMotion.addEventListener('change', () => { if (highlightAnimation) highlightAnimation.cancel(); resetNavPosition(); });
function restoreSectionFromURL() {
  const id = location.hash.slice(1);
  if (pageSections.some(section => section.id === id)) navigateToSection(id, { record: false, immediate: true });
  else if (pageSections.length) { finishNavigation(); window.scrollTo({ top: 0, behavior: 'instant' }); setActiveSection('home', true); }
}
window.addEventListener('popstate', restoreSectionFromURL);
window.addEventListener('hashchange', restoreSectionFromURL);
resetNavPosition();
if (pageSections.length) {
  // Wait for native history restoration and initial anchor placement before syncing.
  if (document.readyState === 'complete') restoreSectionFromURL();
  else window.addEventListener('load', restoreSectionFromURL, { once: true });
}

// Preserve the visual selection across document navigation, including browser Back.
function navLinkFor(id) {
  return $$('#navigation a').find(link => link.dataset.sectionLink === id || new URL(link.href).hash === '#' + id);
}
function selectedNavId() {
  const link = $('#navigation a[aria-current]');
  return link?.dataset.sectionLink || (link ? new URL(link.href).hash.slice(1) : '') || 'store';
}
function rememberNavigation(url, to) {
  const path = url.pathname.endsWith('/') ? url.pathname + 'index.html' : url.pathname;
  try { sessionStorage.setItem('bttr-navigation', JSON.stringify({ from: selectedNavId(), to, path, time: Date.now() })); } catch { /* optional visual state */ }
  document.documentElement.dataset.navigation = path.endsWith('store.html') ? 'into-store' : 'from-store';
}
$$('a[href]').forEach(link => link.addEventListener('click', event => {
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank' || link.hasAttribute('download')) return;
  const url = new URL(link.href);
  if (url.origin !== location.origin || url.pathname === location.pathname || (url.pathname.endsWith('index.html') && !location.pathname.endsWith('store.html'))) return;
  if (url.pathname.endsWith('store.html')) rememberNavigation(url, 'store');
  else if (url.pathname.endsWith('index.html') || url.pathname.endsWith('/')) rememberNavigation(url, ['home','about','store'].includes(url.hash.slice(1)) ? url.hash.slice(1) : 'home');
}));
$('.header-search')?.addEventListener('submit', () => {
  if (!filterForm) rememberNavigation(new URL('store.html', location.href), 'store');
});
function animateArrival() {
  if (!arrivalPending) return;
  // Position at the source label first, then let the existing liquid effect finish
  // at the selected destination while the content wipe reveals the page below.
  if ('onpageswap' in window && 'onpagereveal' in window) {
    arrivalPending = false;
    moveHighlight(navLinkFor(arrivalNavigation.to), true);
    return; // Native shared-element animation carries the pill between documents.
  }
  moveHighlight(navLinkFor(arrivalNavigation.from), true);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    arrivalPending = false;
    moveHighlight(navLinkFor(arrivalNavigation.to), reduceMotion.matches);
  }));
}
if (document.readyState === 'complete') animateArrival();
else window.addEventListener('load', animateArrival, { once: true });
window.addEventListener('pageshow', event => {
  if (!event.persisted) return;
  // Back/Forward cache restores the document without rerunning its scripts.
  try {
    let state = JSON.parse(sessionStorage.getItem('bttr-navigation') || 'null');
    const previous = JSON.parse(sessionStorage.getItem('bttr-last-document') || 'null');
    if (!state && previous && Date.now()-previous.time < 15000) state = { from: previous.from, to: ['home','about','store'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home', time: previous.time };
    sessionStorage.removeItem('bttr-navigation');
    if (state && Date.now()-state.time < 15000) {
      arrivalPending = true;
      restoreSectionFromURL();
      arrivalPending = false;
      if ('onpageswap' in window && 'onpagereveal' in window) moveHighlight(navLinkFor(state.to), true);
      else {
        moveHighlight(navLinkFor(state.from), true);
        requestAnimationFrame(() => moveHighlight(navLinkFor(state.to), reduceMotion.matches));
      }
    }
  } catch { resetNavPosition(); }
});

window.addEventListener('pagehide', () => {
  const path = location.pathname.endsWith('/') ? location.pathname + 'index.html' : location.pathname;
  try { sessionStorage.setItem('bttr-last-document', JSON.stringify({ path, from: selectedNavId(), time: Date.now() })); } catch { /* visual enhancement only */ }
});
