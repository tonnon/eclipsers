
import React from 'react';
import { SightingLocation } from '@/types/map';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Calendar } from 'lucide-react';

interface SightingsListProps {
  sightings: SightingLocation[];
}

const SightingsList: React.FC<SightingsListProps> = ({ sightings }) => {
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sightings.map((sighting) => (
        <Card key={sighting.id} className="bg-eclipse-800 border-eclipse-700 overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 relative">
            <img 
              src={sighting.image} 
              alt={sighting.title} 
              className="object-cover w-full h-48"
            />
          </div>
          <CardHeader className="pb-2">
            <h3 className="text-lg font-medium">{sighting.title}</h3>
            <div className="flex items-center text-sm text-eclipse-300">
              <MapPin size={14} className="mr-1" />
              <span>{sighting.location}</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center text-sm text-eclipse-300">
              <Calendar size={14} className="mr-1" />
              <span>{sighting.date}</span>
            </div>
          </CardContent>
          <CardFooter className="border-t border-eclipse-700 bg-eclipse-750 pt-3">
            <div className="flex items-center text-sm">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={sighting.image} alt={sighting.title} />
                <AvatarFallback>{sighting.title.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-eclipse-200">Sighting #{sighting.id}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SightingsList;
