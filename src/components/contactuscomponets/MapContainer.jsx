'use client';
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = ({ latitude, longitude }) => {
  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  console.log("latitude",latitude);
  
  const center = {
    lat: Number(latitude),
    lng: Number(longitude)
  };

  const darkMapStyle = [
    {
      elementType: 'geometry',
      stylers: [{ color: '#212121' }],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ color: '#757575' }],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#212121' }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ color: '#757575' }],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9e9e9e' }],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#bdbdbd' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#757575' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#181818' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#616161' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#1b1b1b' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [{ color: '#2c2c2c' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#8a8a8a' }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{ color: '#373737' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#3c3c3c' }],
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [{ color: '#4e4e4e' }],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#616161' }],
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#757575' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#3d3d3d' }],
    },
  ];

  const icon = {
    url: '/assets/images/map.png',
    scaledSize: { width: 66, height: 77 }, // Adjust the size as needed
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCgyqxIH4ckL8EAkXPisbmcM-5vJJPK5oo">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={20}
        options={{
          styles: darkMapStyle,
          mapTypeId: 'hybrid',
          mapTypeControl: true,
          mapTypeControlOptions: {
            position: window.google?.maps ?  window.google.maps?.ControlPosition?.TOP_RIGHT : "",
            mapTypeIds: ['roadmap', 'satellite', 'terrain', 'hybrid'],
          },
        }}
      >
        <Marker position={center} icon={icon} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
