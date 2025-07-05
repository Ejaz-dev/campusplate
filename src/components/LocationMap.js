import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const LocationMap = ({ meals, onLocationSelect, height = "400px" }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      });

      try {
        await loader.load();
        
        // Center on Memorial University
        const mapOptions = {
          center: { lat: 47.5717, lng: -52.7348 }, // MUN coordinates
          zoom: 15,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            }
          ]
        };

        const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
        setMap(newMap);

        // Add campus buildings as markers
        addCampusMarkers(newMap);
        
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    if (mapRef.current && !map) {
      initMap();
    }
  }, [map]);

  const addCampusMarkers = (mapInstance) => {
    const campusLocations = [
      {
        name: 'UC Cafeteria',
        position: { lat: 47.5720, lng: -52.7340 },
        address: 'University Centre, Memorial University',
        meals: meals?.filter(meal => meal.location.includes('UC')) || []
      },
      {
        name: 'Bruneau Centre',
        position: { lat: 47.5710, lng: -52.7360 },
        address: 'Bruneau Centre, Memorial University',
        meals: meals?.filter(meal => meal.location.includes('Bruneau')) || []
      },
      {
        name: 'Campus Corner',
        position: { lat: 47.5725, lng: -52.7335 },
        address: 'Campus Corner Deli',
        meals: meals?.filter(meal => meal.location.includes('Campus Corner')) || []
      },
      {
        name: 'Marketplace Café',
        position: { lat: 47.5715, lng: -52.7345 },
        address: 'Marketplace Café, Memorial University',
        meals: meals?.filter(meal => meal.location.includes('Marketplace')) || []
      }
    ];

    const newMarkers = campusLocations.map(location => {
      const marker = new window.google.maps.Marker({
        position: location.position,
        map: mapInstance,
        title: location.name,
        icon: {
          url: location.meals.length > 0 
            ? 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#10B981" stroke="#ffffff" stroke-width="3"/>
                <text x="20" y="26" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${location.meals.length}</text>
              </svg>
            `)
            : 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#6B7280" stroke="#ffffff" stroke-width="3"/>
                <text x="20" y="26" text-anchor="middle" fill="white" font-size="16">🍽️</text>
              </svg>
            `),
          scaledSize: new window.google.maps.Size(40, 40)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 250px;">
            <h3 style="margin: 0 0 10px 0; color: #1F2937; font-weight: bold;">${location.name}</h3>
            <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 14px;">${location.address}</p>
            ${location.meals.length > 0 ? `
              <div style="background: #F3F4F6; padding: 8px; border-radius: 8px;">
                <p style="margin: 0; color: #10B981; font-weight: bold; font-size: 14px;">
                  🍽️ ${location.meals.length} meals available
                </p>
                <div style="margin-top: 8px;">
                  ${location.meals.slice(0, 2).map(meal => `
                    <div style="margin-bottom: 4px; font-size: 12px; color: #374151;">
                      • ${meal.title} (${meal.quantity} left)
                    </div>
                  `).join('')}
                  ${location.meals.length > 2 ? `<div style="font-size: 12px; color: #6B7280;">+${location.meals.length - 2} more...</div>` : ''}
                </div>
              </div>
            ` : `
              <div style="background: #F9FAFB; padding: 8px; border-radius: 8px;">
                <p style="margin: 0; color: #6B7280; font-size: 14px;">No meals available right now</p>
              </div>
            `}
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstance, marker);
        if (onLocationSelect) {
          onLocationSelect(location);
        }
      });

      return { marker, infoWindow, location };
    });

    setMarkers(newMarkers);
  };

  // Update markers when meals change
  useEffect(() => {
    if (map && meals) {
      // Clear existing markers
      markers.forEach(({ marker }) => marker.setMap(null));
      // Add new markers with updated meal counts
      addCampusMarkers(map);
    }
  }, [meals, map]);

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <div 
        ref={mapRef} 
        style={{ height: height, width: '100%' }}
        className="bg-gray-100"
      />
    </div>
  );
};

export default LocationMap;