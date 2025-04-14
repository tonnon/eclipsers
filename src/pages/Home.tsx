import React, { useEffect, useState } from 'react';
import PostCard from '@/components/post/PostCard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';
import { Link, useNavigate } from 'react-router-dom';

// Mock data for posts
const posts = [
  {
    id: '1',
    author: {
      id: '101',
      name: 'Alex Stargazer',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    caption: 'Total solar eclipse captured from Oregon. Truly a breathtaking moment when the diamond ring effect appeared! #SolarEclipse #Oregon #Astronomy',
    location: {
      name: 'Oregon, United States',
      coordinates: [45.5152, -122.6784] as [number, number], // Cast to tuple type
    },
    createdAt: new Date('2024-04-08'),
    likes: 284,
    comments: 42,
    liked: false,
  },
  {
    id: '2',
    author: {
      id: '102',
      name: 'Maria Light',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    image: 'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    caption: 'The lunar eclipse last night was incredible! Captured this with my new telephoto lens. The reddish glow of the Blood Moon was even more vivid in person. #LunarEclipse #BloodMoon #NightSky',
    location: {
      name: 'Melbourne, Australia',
      coordinates: [-37.8136, 144.9631] as [number, number], // Cast to tuple type
    },
    createdAt: new Date('2024-04-02'),
    likes: 512,
    comments: 73,
    liked: true,
  },
  {
    id: '3',
    author: {
      id: '103',
      name: 'Carlos Stellar',
      avatar: 'https://i.pravatar.cc/150?img=7',
    },
    image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    caption: "A perfect alignment of the sun, moon and Earth. This partial solar eclipse created fascinating crescent shadows under the trees. Nature's own pinhole cameras! #PartialEclipse #NaturePhotography",
    location: {
      name: 'Madrid, Spain',
      coordinates: [40.4168, -3.7038] as [number, number], // Cast to tuple type
    },
    createdAt: new Date('2024-03-25'),
    likes: 347,
    comments: 28,
    liked: false,
  },
  {
    id: '4',
    author: {
      id: '104',
      name: 'Luna Eclipse',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    image: 'https://images.unsplash.com/photo-1526186616836-56d1a1da98c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    caption: "Caught the ISS transiting during yesterday's eclipse! Years of planning for this 0.8 second moment. Worth every second of preparation! #ISS #Transit #SolarEclipse #Astrophotography",
    location: {
      name: 'Toronto, Canada',
      coordinates: [43.6532, -79.3832] as [number, number],
    },
    createdAt: new Date('2024-04-05'),
    likes: 1251,
    comments: 143,
    liked: false,
  },
  {
    id: '5',
    author: {
      id: '105',
      name: 'Stella Nova',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    image: 'https://images.unsplash.com/photo-1600267204016-88cf876b91db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    caption: "First attempt at capturing a lunar eclipse with my new telescope! The details of the moon's surface during totality were breathtaking. #LunarEclipse #BloodMoon #Astronomy #FirstLight",
    location: {
      name: 'Denver, USA',
      coordinates: [39.7392, -104.9903] as [number, number],
    },
    createdAt: new Date('2024-04-01'),
    likes: 632,
    comments: 59,
    liked: false,
  },
  {
    id: '6',
    author: {
      id: '106',
      name: 'Orion Hunter',
      avatar: 'https://i.pravatar.cc/150?img=13',
    },
    image: 'https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    caption: "My composite of the eclipse progression! Spent hours aligning these shots to show the full journey of the moon across the sun. #SolarEclipse #TimeComposite #Astrophotography",
    location: {
      name: 'Phoenix, USA',
      coordinates: [33.4484, -112.0740] as [number, number],
    },
    createdAt: new Date('2024-03-29'),
    likes: 892,
    comments: 87,
    liked: true,
  },
];

const Home: React.FC = () => {
  const isMobile = useIsMobile();
  const [visiblePosts, setVisiblePosts] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  // Function to handle infinite scroll
  const handleScroll = () => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.offsetHeight;
    
    // Load more posts when user scrolls near the bottom
    if (scrollHeight - scrollPosition < 500 && !loading && visiblePosts < posts.length) {
      loadMorePosts();
    }
  };
  
  // Function to load more posts with a delay to simulate network request
  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      setVisiblePosts(prev => Math.min(prev + 2, posts.length));
      setLoading(false);
    }, 1000);
  };
  
  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visiblePosts, loading]);
  
  const handleViewCalendar = () => {
    navigate('/calendar');
  };
  
  return (
    <div className="container mx-auto px-4 md:px-0 pb-20">
      <div className="flex flex-col md:flex-row">
        {/* Main feed */}
        <div className="w-full md:w-2/3 lg:w-1/2 md:mx-auto">
          {posts.slice(0, visiblePosts).map((post, index) => (
            <div 
              key={post.id} 
              className="mb-6"
            >
              <PostCard post={post} />
            </div>
          ))}
          
          {/* Loading indicator */}
          {loading && (
            <div className="space-y-6 animate-pulse mt-4">
              <Skeleton className="w-full h-64" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar - only on desktop */}
        {!isMobile && (
          <div className="hidden md:block md:w-1/3 lg:w-1/4 ml-8">
            <div className="eclipse-card p-4 sticky top-24">
              <h3 className="text-lg font-display font-medium mb-4">Upcoming Eclipses</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Lunar Eclipse</p>
                    <p className="text-sm text-eclipse-300">Sept 18, 2024</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-eclipse-700 text-eclipse-300">
                    In 163 days
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Solar Eclipse</p>
                    <p className="text-sm text-eclipse-300">Oct 2, 2024</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-eclipse-700 text-eclipse-300">
                    In 177 days
                  </span>
                </div>
              </div>
              <Button className="w-full" variant="outline" onClick={handleViewCalendar}>View Calendar</Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Floating action button for creating post - mobile only */}
      {isMobile && (
        <div className="fixed bottom-8 right-8">
          <Button size="icon" className="h-14 w-14 rounded-full bg-eclipse-400 hover:bg-eclipse-500 shadow-lg">
            <PlusCircle size={24} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
