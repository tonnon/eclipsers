
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostCard from '@/components/post/PostCard';
import CommentSection from '@/components/post/CommentSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data - in a real app, this would come from a database
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
      coordinates: [45.5152, -122.6784] as [number, number],
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
      coordinates: [-37.8136, 144.9631] as [number, number],
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
      coordinates: [40.4168, -3.7038] as [number, number],
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

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundPost = posts.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost);
      setLiked(foundPost.liked || false);
      setLikeCount(foundPost.likes);
    }
    setLoading(false);
  }, [id]);
  
  const handleReturn = () => {
    navigate(-1);
  };
  
  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2">
          <Card className="p-8 flex items-center justify-center">
            <p>Loading post...</p>
          </Card>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Post not found</h2>
            <p>The post you are looking for does not exist or has been removed.</p>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="max-w-6xl mx-auto mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleReturn}
          className="mb-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to feed
        </Button>
      </div>
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
        {/* Post image section */}
        <div className={`${isMobile ? 'w-full' : 'w-7/12'} bg-black flex items-center justify-center`}>
          <img 
            src={post.image} 
            alt={post.caption}
            className="max-h-[80vh] object-contain w-full"
          />
        </div>
        
        {/* Post details and comments section */}
        <div className={`${isMobile ? 'w-full' : 'w-5/12'} bg-white flex flex-col h-[80vh]`}>
          {/* Post header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-8 h-8 rounded-full object-cover" 
              />
              <div>
                <p className="font-medium">{post.author.name}</p>
                {post.location && (
                  <p className="text-xs text-eclipse-300">{post.location.name}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Post actions */}
          <div className="p-4 border-b flex items-center">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLike}
                className={cn(
                  "text-eclipse-300 hover:text-eclipse-orange transition-colors flex items-center", 
                  liked && "text-eclipse-orange"
                )}
              >
                <Heart size={22} fill={liked ? "currentColor" : "none"} />
                <span className="ml-1 font-medium">{likeCount}</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-eclipse-300 hover:text-eclipse-blue flex items-center">
                <MessageSquare size={22} />
                <span className="ml-1 font-medium">{post.comments}</span>
              </Button>
            </div>
          </div>
          
          {/* Comment section */}
          <CommentSection postId={post.id} />
        </div>
      </div>
    </div>
  );
};

export default Post;
