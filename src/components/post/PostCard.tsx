
import React, { useState } from 'react';
import { Heart, MessageSquare, Share, MoreHorizontal, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: {
    id: string;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    image: string;
    caption: string;
    location?: {
      name: string;
      coordinates: [number, number];
    };
    createdAt: Date;
    likes: number;
    comments: number;
    liked?: boolean;
  }
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  
  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  return (
    <div className="eclipse-card overflow-hidden mb-6 animate-fade-in">
      {/* Post header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to={`/profile/${post.author.id}`}>
            <Avatar>
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback className="bg-eclipse-700">{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link to={`/profile/${post.author.id}`} className="font-medium hover:underline">
              {post.author.name}
            </Link>
            {post.location && (
              <div className="flex items-center text-xs text-eclipse-300 mt-0.5">
                <MapPin size={12} className="mr-1" />
                <span>{post.location.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Post image - now links to post details */}
      <div className="relative">
        <Link to={`/post/${post.id}`}>
          <img 
            src={post.image} 
            alt={post.caption}
            className="w-full object-cover max-h-[500px]"
          />
        </Link>
      </div>
      
      {/* Post actions */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLike}
            className={cn(
              "hover:bg-transparent text-eclipse-300 hover:text-eclipse-orange transition-colors flex items-center", 
              liked && "text-eclipse-orange"
            )}
          >
            <Heart size={22} fill={liked ? "currentColor" : "none"} />
            <span className="ml-1">{likeCount}</span>
          </Button>
          <Link to={`/post/${post.id}`}>
            <Button variant="ghost" size="icon" className="hover:bg-transparent text-eclipse-300 hover:text-eclipse-blue flex items-center">
              <MessageSquare size={22} />
              <span className="ml-1">{post.comments}</span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Likes count */}
      <div className="px-4 pb-2">
        <p className="font-medium">{likeCount} likes</p>
      </div>
      
      {/* Caption */}
      <div className="px-4 pb-2">
        <p>
          <Link to={`/profile/${post.author.id}`} className="font-medium mr-2">
            {post.author.name}
          </Link>
          <span className="text-eclipse-100">{post.caption}</span>
        </p>
      </div>
      
      {/* Comments link */}
      {post.comments > 0 && (
        <div className="px-4 pb-2">
          <Link to={`/post/${post.id}`} className="text-eclipse-400 hover:text-white transition-colors">
            View all {post.comments} comments
          </Link>
        </div>
      )}
      
      {/* Post date */}
      <div className="px-4 pb-4">
        <p className="text-xs text-eclipse-400">
          {format(post.createdAt, 'MMMM d, yyyy')}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
