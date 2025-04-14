import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Types
interface MapState {
  lng: number;
  lat: number;
  zoom: number;
}

interface SightingLocation {
  id: number;
  title: string;
  location: string;
  coordinates: [number, number]; // [lng, lat]
  date: string;
  image: string;
}

interface MapControlsProps {
  viewMode: 'map' | 'list';
  setViewMode: (mode: 'map' | 'list') => void;
  mapState: MapState;
  setMapState: (state: MapState) => void;
}

// MapControls Component
const MapControls: React.FC<MapControlsProps> = ({ 
  viewMode, 
  setViewMode,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-2">
        <button
          onClick={() => setViewMode('map')}
          className={`px-4 py-2 rounded-md ${
            viewMode === 'map' ? 'bg-blue-500 text-white' : 'bg-eclipse'
          }`}
        >
          Map View
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 rounded-md ${
            viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-eclipse'
          }`}
        >
          List View
        </button>
      </div>
    </div>
  );
};

// SightingsList Component
const SightingsList: React.FC<{ sightings: SightingLocation[] }> = ({ sightings }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sightings.map((sighting) => (
        <div key={sighting.id} className="border rounded-lg overflow-hidden shadow-sm">
          <img 
            src={sighting.image} 
            alt={sighting.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg">{sighting.title}</h3>
            <p className="text-gray-600 flex items-center mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {sighting.location}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {sighting.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Fix for default marker icons in Leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Main MapPage Component
const MapPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [mapState, setMapState] = useState<MapState>({
    lng: -70,
    lat: 40,
    zoom: 3
  });
  const [isClient, setIsClient] = useState(false);

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

  // Fix for SSR (Server-Side Rendering) issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Eclipse Sightings</h1>
      
      <MapControls 
        viewMode={viewMode}
        setViewMode={setViewMode}
        mapState={mapState}
        setMapState={setMapState}
      />
      
      {viewMode === 'map' && isClient ? (
        <div className="mt-6 shadow-lg rounded-lg overflow-hidden">
          <MapContainer 
            center={[mapState.lat, mapState.lng]} 
            zoom={mapState.zoom}
            style={{ height: '500px', width: '100%', borderRadius: '0.5rem' }}
            ref={(map) => {
              if (map) {
                map.on('moveend', () => {
                  const center = map.getCenter();
                  setMapState({
                    lng: center.lng,
                    lat: center.lat,
                    zoom: map.getZoom()
                  });
                });
              }
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {sightings.map((sighting) => (
              <Marker 
                key={sighting.id}
                position={[sighting.coordinates[1], sighting.coordinates[0]]}
              >
                <Popup>
                  <div className="w-48">
                    <img 
                      src={sighting.image} 
                      alt={sighting.title}
                      className="w-full h-24 object-cover rounded-t-lg"
                    />
                    <div className="p-2">
                      <h3 className="font-bold">{sighting.title}</h3>
                      <p className="text-sm">{sighting.location}</p>
                      <p className="text-xs text-gray-500">{sighting.date}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      ) : (
        <div className="mt-6">
          <SightingsList sightings={sightings} />
        </div>
      )}
    </div>
  );
};

export default MapPage;