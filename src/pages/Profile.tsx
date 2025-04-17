
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Grid, Camera, Users, Settings, MapPin, Calendar, Link as LinkIcon, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Mock data for other users' profiles
const mockUserProfile = {
  id: '101',
  name: 'Alex Stargazer',
  username: 'alexstargazer',
  avatar: 'https://i.pravatar.cc/150?img=3',
  bio: 'Passionate astrophotographer and eclipse chaser. Traveled to 8 countries for celestial events. Canon EOS R5 + Celestron EdgeHD 8"',
  location: 'Oregon, United States',
  website: 'alexstargazer.com',
  joined: 'January 2023',
  stats: {
    posts: 87,
    followers: 1245,
    following: 368
  }
};

// Mock data for user posts
const userPosts = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1579978683768-d0f4e8a7c7fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    likes: 284
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    likes: 156
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    likes: 428
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1613174495872-c4718057500d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    likes: 189
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1605776502818-8d2103f63a25?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    likes: 312
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    likes: 247
  }
];

const Profile: React.FC = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }
      
      setCurrentUser(session.user);
      
      // If no ID is provided in the URL, or ID matches current user, show current user profile
      if (!id || id === session.user.id) {
        setIsCurrentUserProfile(true);
        
        // Fetch current user's profile data
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (error) {
          toast.error("Error loading profile");
          console.error("Error fetching profile:", error);
          setProfileData({
            id: session.user.id,
            name: 'New User',
            username: session.user.email?.split('@')[0] || 'newuser',
            avatar_url: null,
            bio: 'Tell others about yourself',
            location: '',
            website: '',
            created_at: new Date().toISOString(),
            followers: 0,
            following: 0
          });
        } else {
          setProfileData(profileData);
        }
      } else {
        // Show another user's profile
        setIsCurrentUserProfile(false);
        // For now, use mock data
        setProfileData(mockUserProfile);
      }
      
      setIsLoading(false);
    };
    
    fetchCurrentUser();
  }, [id, navigate]);
  
  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-eclipse-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4">
      {/* Profile header */}
      <div className="eclipse-card p-6 mb-6">
        <div className="flex flex-col md:flex-row">
          {/* Avatar section */}
          <div className="flex justify-center md:justify-start mb-6 md:mb-0">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-eclipse-700">
              {profileData?.avatar_url ? (
                <AvatarImage src={profileData.avatar_url} />
              ) : (
                <AvatarFallback className="bg-eclipse-600 text-lg">
                  {profileData?.name?.charAt(0) || profileData?.username?.charAt(0) || '?'}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          
          {/* Profile info */}
          <div className="md:ml-8 flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-display font-bold">
                  {profileData?.name || 'New User'}
                </h1>
                <p className="text-eclipse-300">
                  @{profileData?.username || 'username'}
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center space-x-3">
                {isCurrentUserProfile ? (
                  <Button 
                    onClick={handleEditProfile}
                    variant="secondary"
                    className="border-eclipse-400 text-eclipse-400"
                  >
                    <Edit size={18} className="mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={toggleFollow}
                      variant={isFollowing ? "outline" : "default"}
                      className={isFollowing ? "border-eclipse-400 text-eclipse-400" : ""}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    <Button variant="outline">Message</Button>
                  </>
                )}
                
                {isCurrentUserProfile && (
                  <Button variant="ghost" size="icon">
                    <Settings size={20} />
                  </Button>
                )}
              </div>
            </div>
            
            {/* Bio and stats */}
            <p className="mb-4">{profileData?.bio || 'No bio yet'}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
              {profileData?.location && (
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-eclipse-400" />
                  <span className="text-sm">{profileData.location}</span>
                </div>
              )}
              
              {profileData?.website && (
                <div className="flex items-center">
                  <LinkIcon size={16} className="mr-2 text-eclipse-400" />
                  <a 
                    href={`https://${profileData.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-eclipse-400 hover:underline"
                  >
                    {profileData.website}
                  </a>
                </div>
              )}
              
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-eclipse-400" />
                <span className="text-sm">
                  Joined {new Date(profileData?.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </span>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex space-x-6 mt-4">
              <div className="text-center">
                <p className="font-bold">{profileData?.stats?.posts || 0}</p>
                <p className="text-sm text-eclipse-300">Posts</p>
              </div>
              
              <div className="text-center">
                <p className="font-bold">{profileData?.followers || 0}</p>
                <p className="text-sm text-eclipse-300">Followers</p>
              </div>
              
              <div className="text-center">
                <p className="font-bold">{profileData?.following || 0}</p>
                <p className="text-sm text-eclipse-300">Following</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content tabs */}
      <Tabs defaultValue="posts">
        <TabsList className="eclipse-card mb-6 w-full grid grid-cols-3">
          <TabsTrigger value="posts" className="data-[state=active]:bg-eclipse-700">
            <Grid size={18} className="mr-2" /> Posts
          </TabsTrigger>
          <TabsTrigger value="map" className="data-[state=active]:bg-eclipse-700">
            <MapPin size={18} className="mr-2" /> Map
          </TabsTrigger>
          <TabsTrigger value="tagged" className="data-[state=active]:bg-eclipse-700">
            <Users size={18} className="mr-2" /> Tagged
          </TabsTrigger>
        </TabsList>
        
        {/* Posts Grid */}
        <TabsContent value="posts">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
            {userPosts.map(post => (
              <div key={post.id} className="aspect-square relative group cursor-pointer">
                <img 
                  src={post.image} 
                  alt={`Post ${post.id}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-eclipse-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-md">
                  <div className="flex items-center">
                    <Camera size={20} className="mr-2 text-white" />
                    <span className="text-white font-medium">{post.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        {/* Map View */}
        <TabsContent value="map">
          <div className="eclipse-card p-6 h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="mx-auto mb-4 text-eclipse-400" />
              <h3 className="text-xl font-medium mb-2">Eclipse Locations</h3>
              <p className="text-eclipse-300">
                View all the places where {isCurrentUserProfile ? 'you have' : `${profileData?.name} has`} captured eclipse photos
              </p>
            </div>
          </div>
        </TabsContent>
        
        {/* Tagged Photos */}
        <TabsContent value="tagged">
          <div className="eclipse-card p-6 h-96 flex items-center justify-center">
            <div className="text-center">
              <Users size={48} className="mx-auto mb-4 text-eclipse-400" />
              <h3 className="text-xl font-medium mb-2">Tagged Photos</h3>
              <p className="text-eclipse-300">
                Photos where {isCurrentUserProfile ? 'you have' : `${profileData?.name} has`} been tagged will appear here
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
