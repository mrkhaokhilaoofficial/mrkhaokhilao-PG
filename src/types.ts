export type ViewType = 'home' | 'menu' | 'booking' | 'reviews' | 'franchise';

export interface MenuItem {
  id: string;
  category: 'bbq-soya-chaap' | 'byo-bag' | 'bbq-paneer' | 'tandoori-rolls' | 'bbq-momos' | 'mkk-special-combos';
  name: string;
  price: number;
  description: string;
  image: string;
  isChefSpecial?: boolean;
  isSpicy?: boolean;
}

export interface Review {
  id: string;
  name: string;
  dishName: string;
  rating: number;
  title: string;
  feedback: string;
  date: string;
  initials: string;
}

export interface Booking {
  id: string;
  tableId: string;
  tableName: string;
  tableSeats: number;
  date: string;
  time: string;
  guestsCount: number;
  cuisineInterests: string[];
  specialOccasion: string;
  isConfirmed: boolean;
}

export interface FranchiseInquiry {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  investmentRange: string;
  experience: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
