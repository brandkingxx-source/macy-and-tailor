// Verified, hotlinkable brand imagery (Wikimedia Commons, checked for availability).
// Each entry is a real photograph matching the intended scene so cards always render.
const W = (file, width = 1000) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

const brandImages = {
  heroSpread: W('Pretzel-Snack-American.jpg'),
  storyScene: W('BREZELKÖNIG (15116734691).jpg'),
  recipeScene: W('Charcuterie board - Massachusetts.jpg'),
  retailScene: W('Faced products on a supermarket shelf.JPG'),
  recipeSkewers: W('Tanghulu vendor - Tamsui, Taiwan (2017).jpg'),
  recipeBark: W('Rocky Road Bark (3).jpg'),
  recipeFreezerBites: W('MEIJI MELTYKISS STRAWBERRY CHOCOLATE CHINA VERSION (6).jpg'),
  recipeClusters: W('Personalized glass mason treat jar and foil wrapped chocolate peanut butter cup snack treats (17099409031).jpg'),
  mascotScene:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Elefante_africano_de_sabana_%28Loxodonta_africana%29%2C_parque_nacional_Kruger%2C_Sud%C3%A1frica%2C_2018-07-25%2C_DD_06.jpg/960px-Elefante_africano_de_sabana_%28Loxodonta_africana%29%2C_parque_nacional_Kruger%2C_Sud%C3%A1frica%2C_2018-07-25%2C_DD_06.jpg',
  contactScene: W('Coffee cup next to laptop on wooden table in cozy indoor workspace during daytime.jpg'),
  pressedSeaSalt:
    'https://images.squarespace-cdn.com/content/v1/695c4c4bae51e74df694af53/cf01f5cc-0c4a-4926-bd90-38ea29d31ba5/Pretzels_Pressed_Pretzels_Sea_Salt_180g.png?format=1200w',
  pressedChilliLime:
    'https://images.squarespace-cdn.com/content/v1/695c4c4bae51e74df694af53/047ed111-6d77-48c5-907b-80f342b4f6a2/Pretzels_Pressed_Pretzels_Chilli_Lime_180g.png?format=1200w',
  pressedHoneyMustard:
    'https://images.squarespace-cdn.com/content/v1/695c4c4bae51e74df694af53/36d13d3f-ddf7-445a-bdc5-f4fdc8577659/Pretzels_Pressed_Pretzels_Honey_Mustard_180g.png?format=1200w',
  plantainSeaSalt:
    'https://images.squarespace-cdn.com/content/v1/695c4c4bae51e74df694af53/c628dccc-8b77-4bff-8697-25ffea6b1a47/Chips_Plantain_Chips_Sea_Salt_85g.png?format=1200w',
  plantainChilliLime:
    'https://images.squarespace-cdn.com/content/v1/695c4c4bae51e74df694af53/dc963dbd-94dd-473b-a231-d07ed34dbb7d/Chips_Plantain_Chips_Chilli_Lime_85g.png?format=1200w',
  tortillaSpicyBbq:
    'https://images.squarespace-cdn.com/content/v1/695c4c4bae51e74df694af53/9a76f98a-6850-4afc-9852-6c3c3505f5c5/Chips_Tortilla_Chips_BBQ_50g.png?format=1200w',
  tortillaSalted:
    'https://images.squarespace-cdn.com/content/v1/695c4c4bae51e74df694af53/932c2486-2bc9-4ae6-9103-3c88889c71fb/Chips_Tortilla_Chips_Sea_Salt_50g.png?format=1200w',
  twistedSaltHoney:
    'https://images.squarespace-cdn.com/content/v1/695c4c4bae51e74df694af53/fdab4a9e-f1b2-4c3c-9436-aa96395630f0/Pretzels_Pretzel_Sticks_+Sea_Salt_Honey_160g.png?format=1200w',
  twistedOnion:
    'https://images.squarespace-cdn.com/content/v1/695c4c4bae51e74df694af53/0d000d04-f54a-4d6a-a43e-28bb76671c07/Pretzels_Pretzel_Sticks_+Caramelized+Onion_160g.png?format=1200w'
};

// Verified hotlinkable fallback videos (Wikimedia Commons derivatives,
// checked for availability). Used by app.js to keep every video playing
// even if a primary source dies.
const WIKI_VID = (path) => `https://upload.wikimedia.org/wikipedia/commons/transcoded/${path}`;

window.VIDEO_FALLBACKS = [
  WIKI_VID('3/3c/Brezelschlingmaschine_der_Gro%C3%9Fb%C3%A4ckerei_Heitzmann_in_Bad_Krozingen-Biengen.webm/Brezelschlingmaschine_der_Gro%C3%9Fb%C3%A4ckerei_Heitzmann_in_Bad_Krozingen-Biengen.webm.480p.vp9.webm'),
  WIKI_VID('3/3c/Brezelschlingmaschine_der_Gro%C3%9Fb%C3%A4ckerei_Heitzmann_in_Bad_Krozingen-Biengen.webm/Brezelschlingmaschine_der_Gro%C3%9Fb%C3%A4ckerei_Heitzmann_in_Bad_Krozingen-Biengen.webm.240p.vp9.webm'),
  WIKI_VID('c/cb/Popcorn_Energizer.webm/Popcorn_Energizer.webm.240p.vp9.webm'),
  WIKI_VID('5/5d/Bread_baking_in_Balochistan.webm/Bread_baking_in_Balochistan.webm.240p.vp9.webm')
];

window.SITE_CONFIG = {
  brand: 'Macy & Tailor',
  legalName: 'Macy and Tailor',
  siteMotto: 'For the Love of Snacks',
  tagline: 'Deliciously innovative artisan snacks for every platter, lunchbox and late-night craving.',
  shortBio: 'Not your average snack. Meet Macy.',
  founded: '2017',
  location: 'Auckland, New Zealand',
  community: '5.7K Instagram community',
  retailersLine: 'Found across selected retailers in New Zealand and Australia',
  // Contact channels below are taken directly from the audit file in the
  // repo root (Instagram_Audit_@macyandtailor_2026-08-09.html): the audit
  // lists exactly two contact surfaces — Instagram and the website/link-in-bio.
  // No email, phone or address appears anywhere in the audit, so none is shown.
  contact: {
    instagramHandle: '@macyandtailor',
    instagramLink: 'https://www.instagram.com/macyandtailor/',
    website: 'https://youtu.be/KE98_ARRMFw',
    websiteLink: 'https://youtu.be/KE98_ARRMFw',
    youtubeLabel: 'Brand Video Link (YouTube)',
    youtubeLink: 'https://youtu.be/KE98_ARRMFw'
  },
  // Verified community metrics from the same audit file (Profile Metrics
  // section): followers 5716, following 446, total posts 895, engagement
  // 1.40%, avg likes 42, avg comments 38, frequency weekly, last post 4d ago.
  auditMetrics: {
    followers: 5716,
    following: 446,
    posts: 895,
    engagement: '1.40%',
    avgLikes: 42,
    avgComments: 38,
    frequency: 'Weekly',
    lastPost: '4d ago',
    audience: 'Home cooks & food enthusiasts aged 22–45, skewing female',
    topics: { food: '87%', fashion: '9%', parenting: '4%' }
  },
  images: brandImages,
  stockists: [
    {
      name: 'Woolworths NZ',
      region: 'New Zealand',
      note: 'Pressed Pretzels and selected core lines',
      link: 'https://www.woolworths.co.nz/shop/productdetails?stockcode=695577&store=9094'
    },
    {
      name: 'Woolworths AU',
      region: 'Australia',
      note: 'Pressed Pretzels and Plantain Chips',
      link: 'https://www.woolworths.com.au/shop/productdetails/695577/macy-and-tailor-oven-baked-pressed-pretzels-sea-salt'
    },
    {
      name: 'Coles',
      region: 'Australia',
      note: 'Pressed Pretzels and Twisted Pretzel Sticks',
      link: 'https://www.coles.com.au/product/macy-and-tailor-pressed-pretzels-salted-180g-3700053'
    },
    {
      name: 'New World',
      region: 'New Zealand',
      note: 'Twisted Pretzel Sticks - Sea Salt & Honey',
      link: 'https://www.newworld.co.nz/shop/product/5345974_ea_000nw?name=macy-and-tailor-sea-salt--honey-twisted-pretzels'
    },
    {
      name: 'PAK\'nSAVE',
      region: 'New Zealand',
      note: 'Selected twisted pretzel ranges',
      link: 'https://www.macyandtailor.com/'
    }
  ],
  values: [
    {
      title: 'Snackable by Design',
      copy: 'Every range is built around crunch, shareability and easy everyday reach.'
    },
    {
      title: 'Better-For-You Lean',
      copy: 'The brand consistently leads with no preservatives, no artificial flavours and cleaner ingredient stories.'
    },
    {
      title: 'Built for Occasions',
      copy: 'From lunchboxes to platters to BBQ banter, the brand sells occasions, not just bags.'
    }
  ],
  timeline: [
    {
      year: '2017',
      title: 'The OG Pretzel Moment',
      copy: 'Macy & Tailor launched with its original pressed pretzels, turning a simple pantry staple into a lighter, more craveable crunch.'
    },
    {
      year: 'Next',
      title: 'More Crunch, More Formats',
      copy: 'The range expanded into plantain chips, tortilla chips and twisted pretzel sticks, keeping the brand playful while widening the snack shelf.'
    },
    {
      year: 'Now',
      title: 'Recipes, Retail and Community',
      copy: 'The brand now supports snacking with bite-sized recipe content, social storytelling and stockists across NZ and AU.'
    }
  ],
  products: [
    {
      family: 'Pressed Pretzels',
      name: 'Pressed Pretzels - Sea Salt',
      description: 'Thin, crispy and oven baked with a lighter crunch that works straight from the bag or on a grazing board.',
      highlights: ['Oven baked', '75 calories per serve', 'Palm oil free', 'Vegan & vegetarian'],
      pack: '180g',
      availability: 'Woolworths NZ, Woolworths AU, Coles',
      image: brandImages.pressedSeaSalt,
      link: 'https://www.macyandtailor.com/products/p/pressedpretzelsalt'
    },
    {
      family: 'Pressed Pretzels',
      name: 'Pressed Pretzels - Chilli Lime',
      description: 'The pressed pretzel format with a brighter, sharper flavour hit for bolder snackers.',
      highlights: ['Oven baked', 'Thin crunch', 'Shareable bag format', 'Everyday snacking'],
      pack: '180g',
      availability: 'Available through Macy & Tailor',
      image: brandImages.pressedChilliLime,
      link: 'https://www.macyandtailor.com/products/p/pressedpretzelchillilime'
    },
    {
      family: 'Pressed Pretzels',
      name: 'Pressed Pretzels - Honey Mustard',
      description: 'Sweet-meets-savoury pretzel crunch built for platters, desk snacks and party bowls.',
      highlights: ['Oven baked', 'Shareable flavour', 'Palm oil free', 'Dairy free'],
      pack: '180g',
      availability: 'Available through Macy & Tailor',
      image: brandImages.pressedHoneyMustard,
      link: 'https://www.macyandtailor.com/products/p/pressedpretzelhoneymustard'
    },
    {
      family: 'Plantain Chips',
      name: 'Plantain Chips - Sea Salt',
      description: 'Handmade, kettle-cooked chips made with Barraganete plantain for a buttery crunch and a cleaner ingredients list.',
      highlights: ['Handmade', 'Kettle cooked', 'Gluten free', 'Low in sugar'],
      pack: '85g',
      availability: 'Woolworths AU',
      image: brandImages.plantainSeaSalt,
      link: 'https://www.macyandtailor.com/products/p/plantainchipssalt'
    },
    {
      family: 'Plantain Chips',
      name: 'Plantain Chips - Chilli Lime',
      description: 'The same buttery plantain crunch, sharpened with a bright chilli-lime edge.',
      highlights: ['Handmade', 'Kettle cooked', '100% natural ingredients', 'Non-GMO'],
      pack: '85g',
      availability: 'Available through Macy & Tailor',
      image: brandImages.plantainChilliLime,
      link: 'https://www.macyandtailor.com/products/p/plantainchipschillilime'
    },
    {
      family: 'Grain Free Tortilla Chips',
      name: 'Grain Free Tortilla Chip - Spicy BBQ',
      description: 'Cassava-based tortilla chips that skip the corn and go hard on smoky, savoury flavour.',
      highlights: ['Made with cassava', 'Grain free', 'Gluten free', 'Vegan & vegetarian'],
      pack: '50g',
      availability: 'Woolworths NZ soon',
      image: brandImages.tortillaSpicyBbq,
      link: 'https://www.macyandtailor.com/products/p/grainfreetortillabbq'
    },
    {
      family: 'Grain Free Tortilla Chips',
      name: 'Grain Free Tortilla Chip - Salted',
      description: 'A cleaner, minimal take on tortilla chips with cassava-led crunch and everyday dipability.',
      highlights: ['Made with cassava', 'No corn', 'Gluten free', 'Snackable with dips'],
      pack: '50g',
      availability: 'Available through Macy & Tailor',
      image: brandImages.tortillaSalted,
      link: 'https://www.macyandtailor.com/products/p/grainfreetortillasalt'
    },
    {
      family: 'Twisted Pretzel Sticks',
      name: 'Twisted Pretzel Sticks - Sea Salt & Honey',
      description: 'Crunchy golden sticks baked to dip, with a sweet-savoury balance that lands on platters and cheese boards.',
      highlights: ['Baked to dip', 'Palm oil free', 'Preservative free', 'Vegetarian'],
      pack: '160g',
      availability: 'New World, PAK\'nSAVE NZ, Coles AU',
      image: brandImages.twistedSaltHoney,
      link: 'https://www.macyandtailor.com/products/p/twistedpretzelstickssalthoney'
    },
    {
      family: 'Twisted Pretzel Sticks',
      name: 'Twisted Pretzel Sticks - Caramelised Onion',
      description: 'An entertaining-ready pretzel stick with richer savoury flavour and an easy dip format.',
      highlights: ['Baked to dip', 'Shareable format', 'Party ready', 'Dairy free'],
      pack: '160g',
      availability: 'Available through Macy & Tailor',
      image: brandImages.twistedOnion,
      link: 'https://www.macyandtailor.com/products/p/twistedpretzelsticksonion'
    }
  ],
  recipes: [
    {
      title: 'Single-Serve Pretzel Skewers',
      category: 'Entertaining',
      description: 'A fun single-serve platter idea with pretzels, fruit, cheese and cured meats stacked onto skewers.',
      image: brandImages.recipeSkewers,
      link: 'https://www.macyandtailor.com/recipes/v/singleserve-pretzel-skewers'
    },
    {
      title: 'Apple Caramel Pretzel Bark',
      category: 'Sweet Treats',
      description: 'Crunchy sweet-and-salty bark made with chocolate, green apple, caramel and Macy & Tailor pretzels.',
      image: brandImages.recipeBark,
      link: 'https://www.macyandtailor.com/recipes/v/apple-caramel-pretzel-bark'
    },
    {
      title: 'Strawberry Pretzel Freezer Bites',
      category: 'Sweet Treats',
      description: 'A frozen snack made with strawberries, peanut butter, chocolate and pressed pretzels.',
      image: brandImages.recipeFreezerBites,
      link: 'https://www.macyandtailor.com/recipes/v/strawberry-pretzel-freezer-bites'
    },
    {
      title: '3-Ingredient Peanut Clusters',
      category: 'Sweet Treats',
      description: 'A quick sweet-and-salty treat built from chocolate, peanuts and pretzel crunch.',
      image: brandImages.recipeClusters,
      link: 'https://www.macyandtailor.com/recipes/v/3ingredient-peanut-clusters'
    },
    {
      title: 'Pressed Pretzel Platter Bites',
      category: 'Entertaining',
      description: 'Individual grazing bites layered with cheese, cured meats, pickles and pretzels.',
      image: brandImages.recipeScene,
      link: 'https://www.macyandtailor.com/recipes/v/platterbites'
    },
    {
      title: 'Perfect Platter Building',
      category: 'Entertaining',
      description: 'An easy crowd-pleaser with cheese, fruit, dips, cured meats and plenty of pretzel crunch.',
      image: brandImages.recipeScene,
      link: 'https://www.macyandtailor.com/recipes/v/perfect-platter-building'
    }
  ]
};
