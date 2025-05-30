
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Map, 
  User, 
  Home, 
  Bell, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo from '@/components/common/Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userInitials, setUserInitials] = useState<string>('');

  useEffect(() => {
    fetchUserProfile();

    // Listen to storage changes for avatar updates
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        fetchUserProfile();
      } else if (event === 'SIGNED_OUT') {
        setAvatarUrl(null);
        setUserName('');
        setUserInitials('');
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      // Fetch current user's profile data
      const { data } = await supabase
        .from('profiles')
        .select('name, username, avatar_url')
        .eq('id', session.user.id)
        .maybeSingle();
      
      if (data) {
        setAvatarUrl(data.avatar_url);
        const displayName = data.name || data.username || '';
        setUserName(displayName);
        
        // Get initials for avatar fallback
        const initials = displayName
          .split(' ')
          .map(name => name[0])
          .join('')
          .toUpperCase()
          .substring(0, 2);
          
        setUserInitials(initials || session.user.email?.substring(0, 2).toUpperCase() || 'U');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      navigate('/auth');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-eclipse-800/80 backdrop-blur-md border-b border-eclipse-700/30 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Logo className="h-8 w-8 mr-2" />
              <span className="font-display text-xl font-bold bg-gradient-to-r from-white to-eclipse-200 bg-clip-text text-transparent">
                Eclipsers
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="nav-link flex items-center gap-1">
                <Home size={18} /> <span>Home</span>
              </Link>
              <Link to="/map" className="nav-link flex items-center gap-1">
                <Map size={18} /> <span>Map</span>
              </Link>
              <Link to="/calendar" className="nav-link flex items-center gap-1">
                <Calendar size={18} /> <span>Calendar</span>
              </Link>
            </div>
          )}

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center">
            {!isMobile ? (
              <>
                <Button variant="ghost" size="icon" className="mr-2 text-eclipse-200">
                  <Bell size={20} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer border border-eclipse-700/50">
                      <AvatarImage src={avatarUrl || ''} />
                      <AvatarFallback className="bg-eclipse-700">{userInitials}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-eclipse-800 border-eclipse-700">
                    <DropdownMenuLabel className="text-eclipse-100">{userName || 'My Account'}</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-eclipse-700" />
                    <DropdownMenuItem className="text-eclipse-200 focus:bg-eclipse-700 focus:text-white">
                      <User className="mr-2 h-4 w-4" />
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-eclipse-700" />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="text-eclipse-200 focus:bg-eclipse-700 focus:text-white cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-eclipse-200"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden bg-eclipse-800 border-t border-eclipse-700/30">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="nav-link block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home size={18} className="mr-2" /> Home
              </div>
            </Link>
            
            <Link 
              to="/map" 
              className="nav-link block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Map size={18} className="mr-2" /> Map
              </div>
            </Link>
            
            <Link 
              to="/calendar" 
              className="nav-link block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" /> Calendar
              </div>
            </Link>

            <Link 
              to="/profile" 
              className="nav-link block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <User size={18} className="mr-2" /> Profile
              </div>
            </Link>

            <div className="border-t border-eclipse-700 my-2"></div>
            
            <div className="px-3 py-2 flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={avatarUrl || ''} />
                <AvatarFallback className="bg-eclipse-700">{userInitials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm text-white font-medium">{userName || 'User'}</span>
                <button 
                  className="text-left text-xs text-eclipse-400 hover:text-eclipse-300"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
