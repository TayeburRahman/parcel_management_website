"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
 
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const LocationPickerMap = ({ onLocationSelect, initialLocation }) => {
  const [position, setPosition] = useState(initialLocation || [23.8103, 90.4125]); 
  const [address, setAddress] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (initialLocation) {
      setPosition(initialLocation);
      reverseGeocode(initialLocation[0], initialLocation[1]);
    }
  }, [initialLocation]);

  const shortenAddress = (fullAddress) => {
    const parts = fullAddress.split(",").map((part) => part.trim());
    return parts.length > 2 ? `${parts[0]}, ${parts[1]}` : fullAddress;
  };
 
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        reverseGeocode(lat, lng);
      },
    });
    return null;
  };
 
const RecenterMap = ({ lat, lon }) => {
  const map = useMap();

  useEffect(() => {
    if (lat != null && lon != null) {  
      map.flyTo([lat, lon], map.getZoom());
    }
  }, [lat, lon, map]);

  return null;
};
 
  const reverseGeocode = async (lat, lon) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
      const data = await res.json();
      if (data.display_name) {
        const shortened = shortenAddress(data.display_name);
        setAddress(shortened);
        onLocationSelect?.({ lat, lon, address: shortened });
      }
    } catch (err) {
      console.error("Reverse geocode error:", err);
      setAddress("Location not found");
    }
  };
 
  const geocodeSearch = async () => {
    if (!searchTerm) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newPos = [parseFloat(lat), parseFloat(lon)];
        const shortened = shortenAddress(display_name);
        setPosition(newPos);
        setAddress(shortened);
        onLocationSelect?.({ lat: parseFloat(lat), lon: parseFloat(lon), address: shortened });
      } else {
        setAddress("Location not found");
      }
    } catch (err) {
      console.error("Geocode search error:", err);
      setAddress("Search failed");
    }
  };

  return (
    <div className="w-full h-full flex flex-col"> 
      <div className="relative z-10 p-2 bg-white shadow-md rounded-md mb-2 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Search location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && geocodeSearch()}
          className="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={geocodeSearch}
          className="px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition w-full sm:w-auto"
        >
          Search
        </button>
      </div>
 
      <div className="flex-1 relative">
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler />
          <RecenterMap lat={position[0]} lon={position[1]} />
          <Marker position={position}>
            <Popup>{address || "Selected Location"}</Popup>
          </Marker>
        </MapContainer>
      </div>
 
      <div className="mt-2 text-sm text-gray-700 p-2 bg-white shadow-md rounded-md">
        Selected: <span className="font-medium">{address || "No location selected"}</span>
      </div>
    </div>
  );
};

export default LocationPickerMap;
