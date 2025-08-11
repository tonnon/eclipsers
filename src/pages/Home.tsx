import React, { useEffect, useState } from 'react';
import PostCard from '@/components/post/PostCard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';
import { Link, useNavigate } from 'react-router-dom';

import { posts } from '@/data';

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
