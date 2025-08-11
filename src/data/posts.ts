export type Post = {
  id: string;
  author: { id: string; name: string; avatar: string };
  image: string;
  caption: string;
  location?: { name: string; coordinates: [number, number] };
  createdAt: Date;
  likes: number;
  comments: number;
  liked?: boolean;
};

export const posts: Post[] = [
  {
    id: '1',
    author: { id: '101', name: 'Alex Stargazer', avatar: 'https://i.pravatar.cc/150?img=3' },
    image: 'https://images.unsplash.com/photo-1579978683768-d0f4e8a7c7fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    caption: 'Total solar eclipse captured from Oregon. Truly a breathtaking moment when the diamond ring effect appeared! #SolarEclipse #Oregon #Astronomy',
    location: { name: 'Oregon, United States', coordinates: [45.5152, -122.6784] },
    createdAt: new Date('2024-04-08'),
    likes: 284,
    comments: 42,
    liked: false,
  },
  {
    id: '2',
    author: { id: '102', name: 'Maria Light', avatar: 'https://i.pravatar.cc/150?img=5' },
    image: 'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    caption: 'The lunar eclipse last night was incredible! Captured this with my new telephoto lens. The reddish glow of the Blood Moon was even more vivid in person. #LunarEclipse #BloodMoon #NightSky',
    location: { name: 'Melbourne, Australia', coordinates: [-37.8136, 144.9631] },
    createdAt: new Date('2024-04-02'),
    likes: 512,
    comments: 73,
    liked: true,
  },
  {
    id: '3',
    author: { id: '103', name: 'Carlos Stellar', avatar: 'https://i.pravatar.cc/150?img=7' },
    image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    caption: "A perfect alignment of the sun, moon and Earth. This partial solar eclipse created fascinating crescent shadows under the trees. Nature's own pinhole cameras! #PartialEclipse #NaturePhotography",
    location: { name: 'Madrid, Spain', coordinates: [40.4168, -3.7038] },
    createdAt: new Date('2024-03-25'),
    likes: 347,
    comments: 28,
    liked: false,
  },
];


