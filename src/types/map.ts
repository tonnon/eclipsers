
export interface MapState {
  lng: number;
  lat: number;
  zoom: number;
}

export interface SightingLocation {
  id: number;
  title: string;
  location: string;
  coordinates: [number, number]; // Using tuple type for coordinates
  date: string;
  image: string;
}
