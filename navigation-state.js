// Capture only short-lived visual navigation state; no customer data is stored.
try {
  let state = JSON.parse(sessionStorage.getItem('bttr-navigation') || 'null');
  const previous = JSON.parse(sessionStorage.getItem('bttr-last-document') || 'null');
  const currentPath = location.pathname.endsWith('/') ? location.pathname + 'index.html' : location.pathname;
  if (!state && previous && previous.path !== currentPath && Date.now()-previous.time < 15000) state = { from: previous.from, to: currentPath.endsWith('store.html') ? 'store' : (['home','about','store'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home'), path: currentPath, time: previous.time };
  sessionStorage.removeItem('bttr-navigation');
  const path = location.pathname.endsWith('/') ? location.pathname + 'index.html' : location.pathname;
  if (state && state.path === path && Date.now() - state.time < 15000 && ['home','about','store'].includes(state.from) && ['home','about','store'].includes(state.to)) {
    window.BTTR_NAVIGATION = state;
    document.documentElement.dataset.navigation = state.to === 'store' && path.endsWith('store.html') ? 'into-store' : 'from-store';
  }
} catch { /* Storage restrictions must not prevent navigation. */ }
