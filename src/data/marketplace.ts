import type { MarketplaceListing } from '../types';

export const MARKETPLACE_LISTINGS: MarketplaceListing[] = [
  {
    id: '1',
    title: 'Calculus Textbook - 3rd Edition',
    description: 'Like new condition, barely used. All pages intact.',
    price: 50,
    category: 'Books',
    condition: 'Like New',
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c'],
    sellerId: 'user1',
    sellerName: 'John Doe',
    createdAt: new Date(),
    status: 'Available'
  },
  {
    id: '2',
    title: 'iPad Pro 11" (2021)',
    description: 'Perfect for taking notes. Includes Apple Pencil.',
    price: 600,
    category: 'Electronics',
    condition: 'Good',
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0'],
    sellerId: 'user2',
    sellerName: 'Jane Smith',
    createdAt: new Date(),
    status: 'Available'
  },
  {
    id: '3',
    title: 'Sheridan College Hoodie',
    description: 'Size M, worn once. Perfect condition.',
    price: 25,
    category: 'Clothing',
    condition: 'Like New',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7'],
    sellerId: 'user3',
    sellerName: 'Bob Johnson',
    createdAt: new Date(),
    status: 'Available'
  },
  {
    id: '4',
    title: 'Room for Rent - Near Davis Campus',
    description: 'Private room in a 2-bedroom apartment. All utilities included.',
    price: 800,
    category: 'Housing',
    condition: 'Good',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
    sellerId: 'user4',
    sellerName: 'Alice Brown',
    createdAt: new Date(),
    status: 'Available'
  },
  {
    id: '5',
    title: 'Math Tutoring Services',
    description: 'Experienced tutor for Calculus and Linear Algebra.',
    price: 30,
    category: 'Services',
    condition: 'New',
    images: ['https://images.unsplash.com/photo-1434030216411-0b793f4b4173'],
    sellerId: 'user5',
    sellerName: 'Eve Wilson',
    createdAt: new Date(),
    status: 'Available'
  },
  {
    id: '6',
    title: 'Study Notes - Programming Fundamentals',
    description: 'Complete set of notes for first-year programming courses.',
    price: 0,
    category: 'Free',
    condition: 'Good',
    images: ['https://images.unsplash.com/photo-1517842645767-c639042777db'],
    sellerId: 'user6',
    sellerName: 'Charlie Davis',
    createdAt: new Date(),
    status: 'Available'
  }
];

export const MARKETPLACE_CATEGORIES = [
  'All',
  'Books',
  'Electronics',
  'Clothing',
  'Housing',
  'Services',
  'Free'
] as const; 