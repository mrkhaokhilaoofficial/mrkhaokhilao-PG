import { MenuItem, Review } from '../types';

export const INITIAL_MENU: MenuItem[] = [
  // BBQ Soya Chaap
  {
    id: 'm1',
    category: 'bbq-soya-chaap',
    name: 'Saoji Chaap',
    price: 150,
    description: 'Spicy Maharashtrian blend of spices, perfectly grilled in tandoor.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl1XZnTuLI0CfBM-zVnVG7EcxFmOyzCmO455w90YbNfTbudgzEvbtRdGUbQ5mOBBGUI6uSHLk0UE1U0Ejt4RmvQhv97fU6LzJrZ643Bv--pW3yC16KkOjxzemz_LL31UrSJ0Gz9yqLlnCEXgGKAM60v4No7dOR0WjxAhVyHrgLy3BcV_FWfKbAvBpiODuc-N17yaJBb5v-p2WnmUszagRGlZiN6hGKaH0ZmRZ3KjxqAhAvYUmjQ92tNHSkSX0lC4q3EuJZFGy_QNxb',
    isSpicy: true
  },
  {
    id: 'm2',
    category: 'bbq-soya-chaap',
    name: 'Amritsari Chaap',
    price: 150,
    description: 'Classic rich tandoori style marinade from the heart of Punjab.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkFk6DqjRKBvax_xxUamCEqG51B_GpK_1LDWGj4WPKdVfDiyunGU_ljEan2Jdv3O17CBRGOUYy1oUTl9cMDi-_MHBmzUUggIx9Ysw9Ry3r7XGMxVKTfDZd1NKPwMBLtJeHNU31lEUDY0PMbXR9tPgu0zTM8CXySzB2j9gpdhG6AStLjvBX-YhbFnVHNhi-F1cfJNfmp-u_ZxKMtniMG7sKvXnobbXRhUOqn1JBPb1B2HGjgjC31ASSHdfaFs02lTjdWLopnb62lMqi'
  },
  {
    id: 'm3',
    category: 'bbq-soya-chaap',
    name: 'Hariyali Chaap',
    price: 150,
    description: 'Fresh mint and coriander marinade with standard tandoor smoking.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAn5E_pcLCPgmj5c-7EwyracoIgAs9m96URBXrTJu5zhJ8QtBWOzOxGS-H0vRb22qXirQGxwURK0_6FNlHEdMO4LDM6caft6Jx8o212IsmXXM4asxcolCuRpj3s6hD5poUhn9hLXDgaY8aaYC7JRpP4OFe3rw9zR81XWHqOFmsYEEwMyOJvFEhcruChx5a271HSpdueF9TraSirOmw3aC9RbsMc2qI3HQ6VgKZD2e1tzzqFp_8NOoEtHcLr_lF0-ep74D6CA460SPo'
  },
  {
    id: 'm4',
    category: 'bbq-soya-chaap',
    name: 'Afghani Chaap',
    price: 160,
    description: 'Soya chaap marinated in a creamy yogurt blend, grilled to perfection.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCba0sztaVfDACnhqtXBxOheGj4uZgoWbbmBdQRSqRo5eGxLNn6Wvt76wkHckRtHUjBZgLjv8amVpFLDmDnTewepNeT0Jcy_fWYTh7f43IETPKljvBelGGRagZpGkrFG7hauNItx5LXGD8ul4ovLoXSMQzI8I_XEny_AKrt_rAsRZLRD-dnDdqLrXWXy57vuwKiU6GSrA9JHs-4wcAta9Pf0jdfN_1ICCt1MKbiAG9VSAOP20hORRk7H1VZdG3JK-IJ401cTp-8ELSI',
    isChefSpecial: true
  },

  // BYO Bag
  {
    id: 'b1',
    category: 'byo-bag',
    name: 'Cheese Chilly Bag',
    price: 50,
    description: 'Crispy pastry pouches filled with melted cheese and spicy green chillies.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLt6Tr6O2xLrfpb-gZ7jE5Jrkni6mxCkQjDmck0wVvtsQaEbP6IDeujxJ7MTAPYinH2231bqPNFTQdo5wTQlmUdPjekovsmZE8WrcS892aw8EvQnFzSCYQTGy2H1MZoG_GJ68NB7QydrBLwmx8WKiBp5Ab1UahgsvAxdl9k2_F06QggDmPKl7LYwRR6qjUpzKUS90JoEK_JgyEXLO-qKr0VRyQJcdGQ8qOk8l_W83Awz7Av5RGL4adHeO_Pn'
  },
  {
    id: 'b2',
    category: 'byo-bag',
    name: 'Special Saoji Bag',
    price: 50,
    description: 'Warm potli pouch with spiced Saoji gravy core and cheese blend.',
    image: '/images/veg_saoji_bag_1781813682604.jpg'
  },
  {
    id: 'b3',
    category: 'byo-bag',
    name: 'Masti Achari Bag',
    price: 50,
    description: 'Puffed potlies stuffed with pickled seasonings and soft cheese melt.',
    image: '/images/veg_achari_bag_1781813699434.jpg'
  },

  // BBQ Paneer
  {
    id: 'p1',
    category: 'bbq-paneer',
    name: 'Classic Paneer Tikka',
    price: 170,
    description: 'Fresh paneer cubes in standard rich tandoori spices, smoked.',
    image: '/images/classic_paneer_tikka_1781812841149.jpg'
  },
  {
    id: 'p2',
    category: 'bbq-paneer',
    name: 'Achaari Paneer Tikka',
    price: 170,
    description: 'Perfect blend of pickling spices and soft skewered paneer.',
    image: '/images/achari_paneer_1781813714523.jpg'
  },
  {
    id: 'p3',
    category: 'bbq-paneer',
    name: 'Saoji Paneer Tikka',
    price: 170,
    description: 'Authentic Vidarbha hot pepper marinade on clay-baked cottage cheese.',
    image: '/images/saoji_paneer_1781813729457.jpg',
    isSpicy: true
  },

  // Tandoori Rolls
  {
    id: 'r1',
    category: 'tandoori-rolls',
    name: 'Saoji Chaap Roll',
    price: 120,
    description: 'Fresh roomali flatbread wrap stuffed with spicy Saoji soya chaap chunks.',
    image: '/images/saoji_chaap_roll_1781813747114.jpg',
    isSpicy: true
  },
  {
    id: 'r2',
    category: 'tandoori-rolls',
    name: 'Hariyali Paneer Roll',
    price: 120,
    description: 'Minty-coriander cottage cheese cubes layered with bell peppers in a warm roll.',
    image: '/images/hariyali_paneer_roll_1781812859987.jpg'
  },
  {
    id: 'r3',
    category: 'tandoori-rolls',
    name: 'Malai Chaap Roll',
    price: 130,
    description: 'Delectable mild-creamy cashew yogurt marinade soya wrapped into a roll.',
    image: '/images/malai_chaap_roll_1781813758787.jpg',
    isChefSpecial: true
  },

  // BBQ Momos
  {
    id: 'o1',
    category: 'bbq-momos',
    name: 'Saoji Momos',
    price: 140,
    description: 'Vegetarian dumplings doused in spicy fiery Vidarbha rub, tandoor grilled.',
    image: '/images/saoji_momos_1781813777290.jpg',
    isSpicy: true
  },
  {
    id: 'o2',
    category: 'bbq-momos',
    name: 'Makhani Momos',
    price: 150,
    description: 'Smoked veggie dumplings coated in silk buttery rich tomato cream gravy.',
    image: '/images/makhani_momos_1781813790131.jpg'
  },

  // MKK Special Combos
  {
    id: 'c1',
    category: 'mkk-special-combos',
    name: 'Paneer Saoji Masala',
    price: 140,
    description: 'Classic spicy Nagpur style gravy with succulent paneer cubes. Served with authentic Laccha Paratha.',
    image: '/images/paneer_saoji_combo_1781812892479.jpg',
    isChefSpecial: true,
    isSpicy: true
  },
  {
    id: 'c2',
    category: 'mkk-special-combos',
    name: 'Paneer do Pyaza Combo',
    price: 140,
    description: 'Rich slow-cooked onion rich semi-dry gravy paneer. Served with authentic Laccha Paratha.',
    image: '/images/paneer_pyaza_combo_1781813839457.jpg'
  },
  {
    id: 'c3',
    category: 'mkk-special-combos',
    name: 'Paneer Champaran Combo',
    price: 140,
    description: 'Clay pot cooked rich garlic, robust whole-spiced paneer stew. Served with fresh aromatic Laccha Paratha.',
    image: '/images/paneer_saoji_combo_1781812892479.jpg'
  },
  {
    id: 'c4',
    category: 'mkk-special-combos',
    name: 'Shahi Paneer Combo',
    price: 150,
    description: 'Royal luxurious sweet-tinged white cashew cream cottage cheese. Served with hot Laccha Paratha.',
    image: '/images/shahi_paneer_combo_1781813809699.jpg'
  },
  {
    id: 'c5',
    category: 'mkk-special-combos',
    name: 'Amritsari Tawa Chaap Combo',
    price: 140,
    description: 'Pan-seared spiced soya chaap chopped with traditional crushed masala. Served with Laccha Paratha.',
    image: '/images/paneer_saoji_combo_1781812892479.jpg'
  },
  {
    id: 'c6',
    category: 'mkk-special-combos',
    name: 'Banjara Tawa Chaap Combo',
    price: 140,
    description: 'Roughly ground black pepper, rustic countryside spiced griddle chaap. Served with Laccha Paratha.',
    image: '/images/banjara_tawa_chaap_1781813821548.jpg'
  },
  {
    id: 'c7',
    category: 'mkk-special-combos',
    name: 'Afghani Tawa Chaap Combo',
    price: 150,
    description: 'Yogurt, white pepper & cooked butter doused tawa pan soya chaap. Served with delicate crispy Laccha Paratha.',
    image: '/images/paneer_saoji_combo_1781812892479.jpg'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Aarav Sharma',
    dishName: 'Afghani Chaap',
    rating: 5,
    title: 'A true game changer!',
    feedback: 'The Afghani Chaap is a game changer! Never thought vegetarian food could be this juicy and flavorful. Cooked to complete soft perfection.',
    date: '12 June 2026',
    initials: 'AS'
  },
  {
    id: 'r2',
    name: 'Priya Kapoor',
    dishName: 'Cheese Chilly Bag',
    rating: 5,
    title: 'Absolute heaven',
    feedback: 'Cheese Chilly Bag is so creative. The crunch on the outside and the warm, melted cheese on the inside... absolute heaven. Will order again!',
    date: '15 June 2026',
    initials: 'PK'
  },
  {
    id: 'r3',
    name: 'Vikram Singh',
    dishName: 'Malai Paneer Tikka',
    rating: 5,
    title: 'Highly fresh and savory',
    feedback: 'Best Paneer Tikka in Gondia! Flavor is perfectly infused, super rich malai, and tandoor charcoal smoky hint is exceptional. Highly recommend!',
    date: '17 June 2026',
    initials: 'VS'
  }
];

export interface RestaurantTable {
  id: string;
  name: string;
  capacity: number;
  positionClass: string; // Tailwind grid placement
  status: 'available' | 'occupied' | 'selected';
}

export const INITIAL_TABLES: RestaurantTable[] = [
  { id: 'T-01', name: 'T-01', capacity: 2, positionClass: 'col-start-1 row-start-1', status: 'available' },
  { id: 'T-02', name: 'T-02', capacity: 2, positionClass: 'col-start-1 row-start-2', status: 'available' },
  { id: 'T-03', name: 'T-03', capacity: 2, positionClass: 'col-start-1 row-start-3', status: 'occupied' },
  { id: 'VIP', name: 'VIP CABIN', capacity: 6, positionClass: 'col-start-3 col-span-2 row-start-2 row-span-2', status: 'available' },
  { id: 'T-05', name: 'T-05', capacity: 4, positionClass: 'col-start-6 row-start-1', status: 'available' },
  { id: 'T-06', name: 'T-06', capacity: 4, positionClass: 'col-start-6 row-start-2', status: 'available' },
  { id: 'T-07', name: 'T-07', capacity: 2, positionClass: 'col-start-6 row-start-4', status: 'selected' },
  { id: 'T-08', name: 'T-08', capacity: 4, positionClass: 'col-start-3 row-start-4', status: 'available' }
];
