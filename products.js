// Nail Products Catalog Dataset - LUXECLAWS Bespoke Nail Atelier
const NAIL_PRODUCTS = [
  {
    id: 'prod-01',
    name: 'Glazed Opal Aura',
    subtitle: 'High-Gloss Pearlescent Glaze with Micro-Pearl Accents',
    price: 48.00,
    originalPrice: 58.00,
    rating: 4.95,
    reviewsCount: 142,
    badge: 'BESTSELLER',
    category: 'glazed',
    shapes: ['Almond', 'Coffin', 'Oval', 'Square', 'Stiletto'],
    defaultShape: 'Almond',
    lengths: ['Short', 'Medium', 'Long', 'Extra Long'],
    defaultLength: 'Medium',
    finish: 'Glazed Chrome & Pearl',
    image: 'assets/glazed_pearl.jpg',
    secondaryImages: [
      'assets/glazed_pearl.jpg',
      'assets/customer_inspo.jpg',
      'assets/hero.jpg'
    ],
    description: 'Inspired by radiant oyster pearls and the viral glazed donut aesthetic. Sculpted with 5 layers of salon-grade Japanese gel and infused with ultrafine rainbow chrome shimmer. Accented with handcrafted faux-pearl bead clusters on accent nails.',
    included: [
      '10 Custom-sized Luxury Acrylic Press-On Nails',
      'Full Application Prep Kit (2g Ultra-Bond Glue, 24 Gel Adhesive Tabs, Mini Crystal Buffer, Cuticle Stick, Alcohol Wipes)',
      'Luxury Velvet Presentation Storage Case',
      'Detailed Step-by-Step Wear & Removal Guide'
    ],
    wearTime: 'Up to 3+ weeks with Glue | 3-7 days with Adhesive Tabs (Reusable 5+ times)',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-02',
    name: 'Cyber Y2K Chrome Melt',
    subtitle: '3D Liquid Chrome Drip & Pastel Baby Pink Aura',
    price: 54.00,
    originalPrice: 65.00,
    rating: 4.98,
    reviewsCount: 98,
    badge: 'TRENDING',
    category: 'y2k',
    shapes: ['Coffin', 'Almond', 'Stiletto', 'Square'],
    defaultShape: 'Coffin',
    lengths: ['Medium', 'Long', 'Extra Long', 'XXL'],
    defaultLength: 'Long',
    finish: '3D Chrome & Airbrush Aura',
    image: 'assets/y2k_cyber.jpg',
    secondaryImages: [
      'assets/y2k_cyber.jpg',
      'assets/hero.jpg'
    ],
    description: 'Futuristic Y2K cyber fantasy brought to life. Airbrushed pastel baby pink aura base crowned with raised 3D liquid molten silver chrome drips, celestial cyber stars, and micro-glitter textures.',
    included: [
      '10 Custom-sized Luxury Acrylic Press-On Nails',
      'Full Application Prep Kit (Glue, Tabs, Buffer, Stick, Alcohol Pad)',
      'UV-Cured Extra-Durable Topcoat'
    ],
    wearTime: '3+ weeks wear, salon strength acrylic reinforcement',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-03',
    name: 'Baroque Emerald Velvet',
    subtitle: 'Magnetic Deep Green Cat-Eye with 24k Gold Filigree & Gems',
    price: 62.00,
    originalPrice: 75.00,
    rating: 5.0,
    reviewsCount: 76,
    badge: 'LUXURY DROP',
    category: 'gothic',
    shapes: ['Coffin', 'Almond', 'Stiletto'],
    defaultShape: 'Coffin',
    lengths: ['Medium', 'Long', 'Extra Long'],
    defaultLength: 'Long',
    finish: 'Magnetic Velvet Cat-Eye & Baroque Gold',
    image: 'assets/emerald_velvet.jpg',
    secondaryImages: [
      'assets/emerald_velvet.jpg',
      'assets/hero.jpg'
    ],
    description: 'An opulent masterpiece crafted with rich emerald magnetic cat-eye gel that shifts under light like pure silk velvet. Adorned with delicate vintage gold baroque relief scrollwork and crowned with a cluster of multifaceted teardrop crystals.',
    included: [
      '10 Hand-Sculpted Acrylic Press-On Nails',
      'Precision Sized Application Kit with Extra-Strength Glue & Tabs',
      'Collector Edition Black Velvet Box'
    ],
    wearTime: 'Reusable up to 10+ times with proper gentle removal',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-04',
    name: 'Sweet Cherry 3D Jelly',
    subtitle: 'Translucent Crimson Syrup with 3D Gummy Bear Charms',
    price: 52.00,
    originalPrice: 60.00,
    rating: 4.91,
    reviewsCount: 114,
    badge: 'POPULAR',
    category: '3d-charms',
    shapes: ['Square', 'Coffin', 'Almond', 'Oval'],
    defaultShape: 'Square',
    lengths: ['Short', 'Medium', 'Long'],
    defaultLength: 'Medium',
    finish: '3D Jelly & Gold Flakes',
    image: 'assets/cherry_3d.jpg',
    secondaryImages: [
      'assets/cherry_3d.jpg',
      'assets/customer_inspo.jpg'
    ],
    description: 'Juicy, glass-like cherry red syrup glaze layered over delicate gold dust foil. Features handcrafted 3D crystal-clear gummy bears and glassy heart droplets securely bonded with industrial salon-grade builder gel.',
    included: [
      '10 Luxury 3D Acrylic Press-On Nails',
      'Pro Prep Kit with Cuticle Oil Sampler',
      'Storage Case'
    ],
    wearTime: '3+ weeks of non-budging charm hold',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-05',
    name: 'Haute Nude French Ombré',
    subtitle: 'Rose Gold Metallic Micro-Tips & Swarovski Cluster',
    price: 49.00,
    originalPrice: 59.00,
    rating: 4.97,
    reviewsCount: 230,
    badge: 'BRIDAL & CLASSIC',
    category: 'bridal',
    shapes: ['Almond', 'Oval', 'Coffin', 'Square'],
    defaultShape: 'Almond',
    lengths: ['Short', 'Medium', 'Long'],
    defaultLength: 'Short',
    finish: 'Milky Ombre with Rose Chrome',
    image: 'assets/blush_french.jpg',
    secondaryImages: [
      'assets/blush_french.jpg',
      'assets/hero.jpg'
    ],
    description: 'The ultimate timeless luxury. Soft blush-to-milky-white gradient ombré finished with ultra-fine rose gold metallic micro-french tips. Statement ring finger features a hand-placed Swarovski crystal tiara cluster.',
    included: [
      '10 Custom Sized Press-On Nails',
      'Full Bridal Prep Kit with Dual-ended Glue Pen',
      'Keepsake Velvet Box'
    ],
    wearTime: 'Ideal for weddings, galas, or everyday quiet luxury elegance',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-06',
    name: 'Celestial Midnight Starlight',
    subtitle: 'Deep Galaxy Blue Cat-Eye with 3D Gold Moons & Constellations',
    price: 58.00,
    originalPrice: 68.00,
    rating: 4.94,
    reviewsCount: 88,
    badge: 'LIMITED EDITION',
    category: 'gothic',
    shapes: ['Stiletto', 'Almond', 'Coffin'],
    defaultShape: 'Stiletto',
    lengths: ['Long', 'Extra Long', 'XXL'],
    defaultLength: 'Long',
    finish: 'Galaxy Magnetic Cat-Eye & 3D Gold Stars',
    image: 'assets/celestial_midnight.jpg',
    secondaryImages: [
      'assets/celestial_midnight.jpg',
      'assets/hero.jpg'
    ],
    description: 'Wander among the stars. Deep cosmic indigo and twilight navy magnetic cat-eye infused with stardust particles. Finished with hand-applied 3D gold celestial crescent moons, north stars, and constellation lines.',
    included: [
      '10 Sculpted Extra-Strong Acrylic Stiletto Nails',
      'Full Professional Prep Kit + Precision Nail File',
      'Protective Case'
    ],
    wearTime: 'Extreme durability with reinforced apex architecture',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-07',
    name: 'Deluxe Salon Prep & Care Kit',
    subtitle: 'Everything You Need for 3+ Week Wear & Seamless Removal',
    price: 16.00,
    originalPrice: 22.00,
    rating: 4.99,
    reviewsCount: 310,
    badge: 'ESSENTIAL ADD-ON',
    category: 'accessories',
    shapes: ['Standard'],
    defaultShape: 'Standard',
    lengths: ['Universal'],
    defaultLength: 'Universal',
    finish: 'Pro Salon Tool Kit',
    image: 'assets/prep_kit.jpg',
    secondaryImages: [
      'assets/prep_kit.jpg'
    ],
    description: 'The secret to press-on nails that look and last like a $180 salon acrylic set. Includes maximum-bond non-damaging nail glue, 48 medical-grade adhesive tabs, dual-sided crystal nail file & buffer, sanitizing prep pads, and rosehip cuticle nourishment stick.',
    included: [
      '1x 7g Brush-On Ultra Strong Nail Glue',
      '48x Waterproof Ultra-Hold Adhesive Jelly Tabs',
      '1x Fine/Medium Dual-Sided Glass Nail Buffer',
      '2x Rosewood Cuticle Pushers & 6x Isopropyl Prep Wipes'
    ],
    wearTime: 'Supports 10+ full set applications',
    featured: false,
    inStock: true
  }
];

// Nail Sizing Standards Data (in Millimeters: Thumb, Index, Middle, Ring, Pinky)
const NAIL_SIZES = {
  'XS': { thumb: 14, index: 11, middle: 12, ring: 10, pinky: 8, label: 'Extra Small (3, 6, 5, 7, 9)' },
  'S':  { thumb: 15, index: 12, middle: 13, ring: 11, pinky: 9, label: 'Small (2, 5, 4, 6, 8)' },
  'M':  { thumb: 16, index: 13, middle: 14, ring: 12, pinky: 10, label: 'Medium (1, 5, 4, 6, 7)' },
  'L':  { thumb: 18, index: 14, middle: 15, ring: 13, pinky: 11, label: 'Large (0, 4, 3, 5, 6)' }
};

// Customer Reviews Data
const CUSTOMER_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Seraphina V.',
    verified: true,
    rating: 5,
    title: 'Literally better than my $200 salon appointments!',
    comment: 'I wore the Glazed Opal Aura set for my birthday trip to Miami. It lasted 3 and a half weeks with the ultra glue, got compliments everywhere from flight attendants to bartenders. Absolutely obsession-worthy quality.',
    productName: 'Glazed Opal Aura (Medium Almond)',
    date: '2 days ago',
    avatar: 'assets/customer_inspo.jpg'
  },
  {
    id: 'rev-2',
    author: 'Chloe M.',
    verified: true,
    rating: 5,
    title: 'The 3D charms are indestructible!',
    comment: 'I was worried the 3D gummy bears on the Cherry Jelly set would snag on my hair or pop off, but the builder gel adhesion is rock solid. Plus the custom sizing made them fit flush without any gaps at the cuticle.',
    productName: 'Sweet Cherry 3D Jelly (Long Coffin)',
    date: '1 week ago',
    avatar: 'assets/cherry_3d.jpg'
  },
  {
    id: 'rev-3',
    author: 'Elena R.',
    verified: true,
    rating: 5,
    title: 'Wore for my wedding day - looked royal!',
    comment: 'The Haute Nude French Ombré with Swarovski crystals photographed like pure perfection. My photographer even took dedicated macro shots of my hands. Reused them on my honeymoon with adhesive tabs!',
    productName: 'Haute Nude French Ombré (Almond)',
    date: '2 weeks ago',
    avatar: 'assets/blush_french.jpg'
  }
];
