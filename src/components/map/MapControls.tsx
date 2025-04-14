
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const MapControls: React.FC = () => {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-eclipse-400 h-4 w-4" />
        <Input 
          placeholder="Search for locations, users, or eclipse types..."
          className="bg-eclipse-800 border-eclipse-700 pl-10"
        />
      </div>
    </div>
  );
};

export default MapControls;
