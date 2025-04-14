
import React, { useState } from 'react';
import { MapState, SightingLocation } from '@/types/map';
import MapControls from '@/components/map/MapControls';
import SightingsList from '@/components/map/SightingsList';

const MapPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list'>('list');
  const [mapState, setMapState] = useState<MapState>({
    lng: -70,
    lat: 40,
    zoom: 3
  });

  // Sample location data for eclipse sightings
  const sightings: SightingLocation[] = [
    {
      id: 1,
      title: 'Solar Eclipse',
      location: 'Oregon, USA',
      coordinates: [-122.6784, 45.5152],
      date: 'April 8, 2024',
      image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      title: 'Partial Eclipse',
      location: 'Madrid, Spain',
      coordinates: [-3.7038, 40.4168],
      date: 'March 25, 2024',
      image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      title: 'Lunar Eclipse',
      location: 'Melbourne, Australia',
      coordinates: [144.9631, -37.8136],
      date: 'April 2, 2024',
      image: 'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 4,
      title: 'ISS Transit',
      location: 'Toronto, Canada',
      coordinates: [-79.3832, 43.6532],
      date: 'April 5, 2024',
      image: 'https://images.unsplash.com/photo-1526186616836-56d1a1da98c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-display font-bold mb-6">Eclipse Sightings</h1>
      
      <MapControls />
      <SightingsList sightings={sightings} />
    </div>
  );
};

export default MapPage;
