
import React, { useState } from 'react';
import { Heart, Send, Reply } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Mock data for comments
const mockComments = [
  {
    id: '1',
    postId: '1',
    author: {
      id: '201',
      name: 'Emma Sky',
      avatar: 'https://i.pravatar.cc/150?img=49',
    },
    content: 'This is absolutely stunning! What camera setup did you use?',
    createdAt: new Date('2024-04-09T08:23:00'),
    likes: 12,
    liked: false,
    replies: [],
  },
  {
    id: '2',
    postId: '1',
    author: {
      id: '202',
      name: 'John Nova',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    content: 'The diamond ring effect is my favorite part of solar eclipses. Great capture!',
    createdAt: new Date('2024-04-09T09:45:00'),
    likes: 8,
    liked: true,
    replies: [
      {
        id: 'r1',
        author: {
          id: '101',
          name: 'Alex Stargazer',
          avatar: 'https://i.pravatar.cc/150?img=3',
        },
        content: 'Thanks! It was the highlight for me too!',
        createdAt: new Date('2024-04-09T10:15:00'),
        likes: 3,
        liked: false,
      }
    ],
  },
  {
    id: '3',
    postId: '1',
    author: {
      id: '203',
      name: 'Luna Cosmos',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
    content: 'I missed this one! Thanks for sharing such a clear photo of the event.',
    createdAt: new Date('2024-04-09T11:17:00'),
    likes: 5,
    liked: false,
    replies: [],
  },
  {
    id: '4',
    postId: '2',
    author: {
      id: '204',
      name: 'Stella Night',
      avatar: 'https://i.pravatar.cc/150?img=25',
    },
    content: 'The Blood Moon is such a spectacular event. Your photo really captures the essence of it!',
    createdAt: new Date('2024-04-03T14:22:00'),
    likes: 19,
    liked: false,
    replies: [],
  },
  {
    id: '5',
    postId: '3',
    author: {
      id: '205',
      name: 'Orion Belt',
      avatar: 'https://i.pravatar.cc/150?img=60',
    },
    content: 'Those crescent shadows are such an interesting phenomenon. Great photo!',
    createdAt: new Date('2024-03-26T16:45:00'),
    likes: 14,
    liked: false,
    replies: [],
  }
];

interface CommentSectionProps {
  postId: string;
}

interface Reply {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: Date;
  likes: number;
  liked: boolean;
}

interface Comment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: Date;
  likes: number;
  liked: boolean;
  replies: Reply[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(() => 
    mockComments.filter(comment => comment.postId === postId)
  );
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: `new-${Date.now()}`,
      postId,
      author: {
        id: 'current-user',
        name: 'Current User',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      content: newComment,
      createdAt: new Date(),
      likes: 0,
      liked: false,
      replies: [],
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };
  
  const handleLikeComment = (commentId: string) => {
    setComments(prev => 
      prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            liked: !comment.liked,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1
          };
        }
        return comment;
      })
    );
  };

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
  };
  
  const handleAddReply = (commentId: string) => {
    if (!replyContent.trim()) {
      setReplyingTo(null);
      return;
    }
    
    const reply = {
      id: `reply-${Date.now()}`,
      author: {
        id: 'current-user',
        name: 'Current User',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      content: replyContent,
      createdAt: new Date(),
      likes: 0,
      liked: false,
    };
    
    setComments(prev => 
      prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, reply]
          };
        }
        return comment;
      })
    );
    
    setReplyContent('');
    setReplyingTo(null);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyContent('');
  };
  
  return (
    <>
      {/* Comments list - scrollable area */}
      <div className="flex-1 overflow-y-auto p-4">
        {comments.map(comment => (
          <div key={comment.id} className="mb-6">
            <div className="flex">
              <Avatar className="mr-3 h-8 w-8">
                <AvatarImage src={comment.author.avatar} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-medium mr-2">{comment.author.name}</span>
                    <span className="text-sm text-eclipse-100">{comment.content}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn(
                      "h-6 w-6 text-eclipse-300", 
                      comment.liked && "text-eclipse-orange"
                    )}
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <Heart size={14} fill={comment.liked ? "currentColor" : "none"} />
                  </Button>
                </div>
                <div className="flex mt-1 text-xs text-eclipse-400 space-x-3">
                  <span>{format(comment.createdAt, 'MMM d')}</span>
                  <span>{comment.likes} likes</span>
                  <button 
                    className="hover:text-eclipse-100"
                    onClick={() => handleReply(comment.id)}
                  >
                    Reply
                  </button>
                </div>
                
                {/* Display replies */}
                {comment.replies.length > 0 && (
                  <div className="ml-4 mt-2 space-y-3">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="flex">
                        <Avatar className="mr-2 h-6 w-6">
                          <AvatarImage src={reply.author.avatar} />
                          <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-start">
                            <span className="font-medium mr-2 text-sm">{reply.author.name}</span>
                            <span className="text-xs text-eclipse-100">{reply.content}</span>
                          </div>
                          <div className="flex mt-0.5 text-xs text-eclipse-400 space-x-2">
                            <span>{format(reply.createdAt, 'MMM d')}</span>
                            <span>{reply.likes} likes</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Reply input */}
                {replyingTo === comment.id && (
                  <div className="mt-2 flex flex-col space-y-2">
                    <div className="flex items-center">
                      <Avatar className="mr-2 h-6 w-6">
                        <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                        <AvatarFallback>CU</AvatarFallback>
                      </Avatar>
                      <Input 
                        placeholder={`Reply to ${comment.author.name}...`}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="text-xs h-8 flex-1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddReply(comment.id);
                          }
                        }}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs" 
                        onClick={handleCancelReply}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => handleAddReply(comment.id)}
                        disabled={!replyContent.trim()}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add comment section */}
      <div className="border-t p-3 flex items-center">
        <Input 
          placeholder="Add a comment..." 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border-0 focus-visible:ring-0 flex-1"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddComment();
            }
          }}
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-eclipse-400 hover:text-eclipse-blue"
          onClick={handleAddComment}
          disabled={!newComment.trim()}
        >
          <Send size={18} />
        </Button>
      </div>
    </>
  );
};

export default CommentSection;
