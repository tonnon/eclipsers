export type EclipseEvent = {
  id: number;
  title: string;
  date: Date;
  type: 'solar' | 'lunar';
  visibility: string[];
  duration: string;
  description: string;
  image: string;
};

export const eclipseEvents: EclipseEvent[] = [
  {
    id: 1,
    title: 'Total Solar Eclipse',
    date: new Date(2024, 9, 2),
    type: 'solar',
    visibility: ['Southern South America', 'South Pacific', 'Antarctica'],
    duration: '1h 43m',
    description: 'A total solar eclipse occurs when the Moon completely blocks the Sun.',
    image: 'https://images.unsplash.com/photo-1613174495872-c4718057500d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    title: 'Partial Lunar Eclipse',
    date: new Date(2024, 8, 18),
    type: 'lunar',
    visibility: ['North & South America', 'Africa', 'Europe'],
    duration: '2h 18m',
    description: 'A partial lunar eclipse occurs when the Earth moves between the Sun and Moon but they are not perfectly aligned.',
    image: 'https://images.unsplash.com/photo-1605776502818-8d2103f63a25?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    title: 'Annular Solar Eclipse',
    date: new Date(2025, 3, 20),
    type: 'solar',
    visibility: ['Pacific & Indian Ocean', 'Southeast Asia', 'Australia'],
    duration: '1h 22m',
    description: 'An annular solar eclipse happens when the Moon passes between the Sun and Earth but is too far from Earth to completely block the Sun.',
    image: 'https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
];


