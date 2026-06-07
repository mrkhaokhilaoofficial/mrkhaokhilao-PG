export const rewardsData = {
  currentPoints: 320,
  nextMilestone: 500,
  totalEarned: 1250,
  totalRedeemed: 930,
  tier: 'Gold',
  tierBenefits: ['Free delivery on all orders', '10% off every 5th order', 'Priority support'],
  history: [
    { id: 1, type: 'earned', points: 50, description: 'Order #MKK-2380', date: 'Dec 18, 2024' },
    { id: 2, type: 'earned', points: 30, description: 'Order #MKK-2375', date: 'Dec 15, 2024' },
    { id: 3, type: 'redeemed', points: -100, description: 'Redeemed for ₹50 off', date: 'Dec 10, 2024' },
    { id: 4, type: 'earned', points: 70, description: 'Order #MKK-2368', date: 'Dec 8, 2024' },
    { id: 5, type: 'earned', points: 45, description: 'Referral Bonus', date: 'Dec 5, 2024' },
  ],
  milestones: [
    { points: 100, reward: '₹25 Off', achieved: true },
    { points: 250, reward: '₹50 Off', achieved: true },
    { points: 500, reward: '₹100 Off + Free Drink', achieved: false },
    { points: 1000, reward: '₹250 Off + Free Item', achieved: false },
  ],
}

export const offers = [
  {
    id: 1,
    code: 'MKKNEW20',
    title: '20% Off for New Users',
    description: 'Get 20% off on your first order',
    discount: '20%',
    minOrder: 199,
    validTill: 'Dec 31, 2024',
    color: '#FF7A00',
  },
  {
    id: 2,
    code: 'WEEKEND15',
    title: 'Weekend Special',
    description: 'Flat 15% off every weekend',
    discount: '15%',
    minOrder: 299,
    validTill: 'Jan 15, 2025',
    color: '#FFD700',
  },
  {
    id: 3,
    code: 'FREEDELIVERY',
    title: 'Free Delivery',
    description: 'Free delivery on orders above ₹300',
    discount: 'Free Del.',
    minOrder: 300,
    validTill: 'Jan 31, 2025',
    color: '#22C55E',
  },
]
