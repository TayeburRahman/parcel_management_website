"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect, useState, useRef } from "react"; // Added useRef
import "leaflet-routing-machine";
import { PiPackageDuotone } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md"; // New icon for agent
import ReactDOMServer from "react-dom/server";
import { getUserInfo } from "@/helper/SessionHelper"; // To get agent ID
import socket from "@/socket/socket"; // To send location updates

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const pickupIcon = L.divIcon({
  html: ReactDOMServer.renderToStaticMarkup(
    <PiPackageDuotone style={{ color: 'green', fontSize: '30px' }} />
  ),
  className: 'bg-transparent',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const deliveryIcon = L.divIcon({
  html: ReactDOMServer.renderToStaticMarkup(
    <FaUserAlt style={{ color: 'green', fontSize: '30px' }} />
  ),
  className: 'bg-transparent',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const agentIcon = L.divIcon({
  html: ReactDOMServer.renderToStaticMarkup(
    <MdDeliveryDining style={{ color: 'blue', fontSize: '30px' }} />
  ),
  className: 'bg-transparent',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const RoutingMachine = ({ pickup, delivery }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !pickup || !delivery) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(pickup.lat, pickup.lon), L.latLng(delivery.lat, delivery.lon)],
      routeWhileDragging: true,
      createMarker: () => null, 
      lineOptions: {
        styles: [{ color: 'green', opacity: 0.8, weight: 6 }]
      }
    }).addTo(map);

    return () => {
      if (map.getContainer()) {
        map.removeControl(routingControl);
      }
    };
  }, [map, pickup, delivery]);

  return null;
};

const LiveTrackingMap = ({ pickup, delivery, agentId }) => {
  const [agentLocation, setAgentLocation] = useState(null);
  const userInfo = getUserInfo(); // Get user info to send agentId

  const isCurrentUserAssignedAgent = userInfo?.userId && userInfo.userId === agentId;

  console.log("[LiveTrackingMap Render] userInfo:", userInfo, "agentId:", agentId, "isCurrentUserAssignedAgent:", isCurrentUserAssignedAgent);

  useEffect(() => {
    console.log("[LiveTrackingMap useEffect] running. isCurrentUserAssignedAgent:", isCurrentUserAssignedAgent, "userInfo.userId:", userInfo?.userId, "agentId:", agentId);

    let watchId;

    // Logic for the assigned agent (who sends updates)
    if (isCurrentUserAssignedAgent) {
      console.log("[LiveTrackingMap useEffect] Current user is the assigned agent. Starting geolocation watch.");
      if ("geolocation" in navigator) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newLocation = [latitude, longitude];
            setAgentLocation(newLocation);
            console.log("[LiveTrackingMap Geolocation] updated:", newLocation);

            // Emit location update to backend
            console.log("[LiveTrackingMap Socket] Emitting agent_location_update:", { agentId: userInfo.userId, location: { lat: latitude, lng: longitude } });
            socket.emit('agent_location_update', {
              agentId: userInfo.userId,
              location: { lat: latitude, lng: longitude },
            });
          },
          (error) => {
            console.error("[LiveTrackingMap Geolocation] error:", error);
            // Specific error handling for common geolocation errors
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.error("Geolocation Error: User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                console.error("Geolocation Error: Location information is unavailable.");
                break;
              case error.TIMEOUT:
                console.error("Geolocation Error: The request to get user location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                console.error("Geolocation Error: An unknown error occurred.");
                break;
            }
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000,
          }
        );
      } else {
        console.warn("Geolocation is not supported by this browser.");
      }
    }

    // Logic for all viewers (including the assigned agent, to update their own marker from broadcast)
    // This listener should always be active if an agentId is present
    const handleAgentLocationUpdated = (data) => {
      console.log("[LiveTrackingMap Socket] Received agent_location_updated from socket:", data);
      if (data.agentId === agentId) { // Only update if it's for the agent on this parcel
        setAgentLocation([data.location.lat, data.location.lng]);
        console.log("[LiveTrackingMap State] Agent location updated from socket:", [data.location.lat, data.location.lng]);
      } else {
        console.log("[LiveTrackingMap Socket] Received update for different agent:", data.agentId, "Expected:", agentId);
      }
    };
    socket.on('agent_location_updated', handleAgentLocationUpdated);


    return () => {
      console.log("[LiveTrackingMap useEffect] cleanup.");
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        console.log("[LiveTrackingMap Geolocation] watch cleared.");
      }
      socket.off('agent_location_updated', handleAgentLocationUpdated);
      console.log("[LiveTrackingMap Socket] listener for agent_location_updated off.");
    };
  }, [isCurrentUserAssignedAgent, userInfo?.userId, agentId]); // Dependency array

  if (!pickup || !delivery) {
    return <div>Loading map...</div>;
  }

  const pickupPosition = [pickup.lat, pickup.lon];
  const deliveryPosition = [delivery.lat, delivery.lon];

  // Center the map on the agent's location if available, otherwise on pickup
  const mapCenter = agentLocation || pickupPosition;

  return (
    <div className="w-full h-96">
      <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={pickupPosition} icon={pickupIcon}>
          <Popup>
            <b>Pickup Location</b>
            <br />
            {pickup.address}
          </Popup>
        </Marker>

        <Marker position={deliveryPosition} icon={deliveryIcon}>
          <Popup>
            <b>Delivery Location</b>
            <br />
            {delivery.address}
          </Popup>
        </Marker>

        {agentLocation && (
          <Marker position={agentLocation} icon={agentIcon}>
            <Popup>
              <b>Agent Current Location</b>
              <br />
              Lat: {agentLocation[0].toFixed(4)}, Lng: {agentLocation[1].toFixed(4)}
            </Popup>
          </Marker>
        )}

        <RoutingMachine pickup={pickup} delivery={delivery} />
      </MapContainer>
    </div>
  );
};

export default LiveTrackingMap;