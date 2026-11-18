/* Frontend-only collection references. These are not published products or stock records. */
const pieces = [
  { id: 'everyday-pajama', name: 'The everyday pajama', category: 'Sleepwear', color: 'Ivory', swatch: '#e6decf', image: 'ref-14-1.jpg', description: 'A relaxed silhouette, delicate contrast piping, and an easy approach to the everyday.' },
  { id: 'morning-layer', name: 'The morning layer', category: 'Robes', color: 'Ivory', swatch: '#e6decf', image: 'ref-14-2.jpg', description: 'An effortless layer for slow starts and quiet evenings. A study in relaxed, feminine dressing.' },
  { id: 'slow-morning', name: 'The slow morning set', category: 'Sleepwear', color: 'Blue', swatch: '#bccbd6', image: 'ref-16-0.jpg', description: 'Soft blue tones and lace-inspired details. Reference styling for a lighter kind of morning.' },
  { id: 'bridal-moments', name: 'The bridal moment', category: 'Bridal', color: 'Blue', swatch: '#bccbd6', image: 'ref-28-0.jpg', description: 'Coordinated tones and considered details for the moments you share.' },
  { id: 'stripe-edit', name: 'The stripe edit', category: 'Sleepwear', color: 'Beige', swatch: '#bda98d', image: 'stripe-0.jpg', description: 'An understated stripe and an easy silhouette. A little rhythm for your downtime.' },
  { id: 'window-light', name: 'The window-light set', category: 'Sleepwear', color: 'Blue', swatch: '#bccbd6', image: 'ref-17-1.jpg', description: 'A relaxed button-front set in a gentle blue palette. For unhurried moments.' }
];

// Sample size options for interface review, not confirmed stock or measurements.
pieces.forEach(piece => { piece.sizes = piece.id === 'morning-layer' ? ['S','M','L'] : ['XS','S','M','L','XL']; });
