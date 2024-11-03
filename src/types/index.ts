export interface Coordinates {
    lat: number;
    lng: number;
  }
  
  export interface Hospital {
    name: string;
    address: string;
    phone: string;
    coords: Coordinates;
  }
  
  export interface EmergencyContact {
    name: string;
    description: string;
    phone: string;
    available: string;
    type: 'emergency' | 'hotline';
  }
  
  export interface EmergencyData {
    emergencyContacts: {
      contacts: EmergencyContact[];
    }[];
    hospitals: Hospital[];
  }