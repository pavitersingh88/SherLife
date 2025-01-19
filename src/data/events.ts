import type { Event } from '../types';

export const EVENT_LISTINGS: Event[] = [
  {
    id: '1',
    title: 'Career Fair 2024',
    description: 'Connect with top employers from the GTA. Bring your resume!',
    date: new Date('2025-03-15T13:00:00'),
    location: 'Davis Campus - SCAET Building',
    link: 'https://careers.sheridancollege.ca',
    category: 'Career',
    organizerId: 'admin',
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'End of Semester Party',
    description: 'Celebrate the end of winter semester with music, food, and fun!',
    date: new Date('2025-04-20T18:00:00'),
    location: 'Trafalgar Campus - Student Union',
    link: 'https://www.sheridancollege.ca/events/end-of-semester-party',
    category: 'Social',
    organizerId: 'admin',
    createdAt: new Date()
  }
];

export const EVENT_CATEGORIES = ['All', 'Academic', 'Social', 'Career', 'Other'] as const; 