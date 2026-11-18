const section = location.pathname.endsWith('about.html') ? 'about' : 'store';
location.replace('index.html' + location.search + '#' + section);
