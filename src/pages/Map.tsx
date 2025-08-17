import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapState, SightingLocation } from '../types/map';
import SightingsList from '../components/map/SightingsList';

import { sightings } from '../data/sightings';

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


  // Fix for SSR (Server-Side Rendering) issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Eclipse Sightings</h1>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-md ${viewMode === 'map' ? 'bg-eclipse-400 text-white' : 'bg-eclipse-700 text-eclipse-200'}`}
          >
            Map View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-md ${viewMode === 'list' ? 'bg-eclipse-400 text-white' : 'bg-eclipse-700 text-eclipse-200'}`}
          >
            List View
          </button>
        </div>
      </div>
      
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