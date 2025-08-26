
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect } from "react";
import "leaflet-routing-machine";
import { PiPackageDuotone } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";

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

const StaticLocationMap = ({ pickup, delivery }) => {
  if (!pickup || !delivery) {
    return <div>Loading map...</div>;
  }

  const pickupPosition = [pickup.lat, pickup.lon];
  const deliveryPosition = [delivery.lat, delivery.lon];

  return (
    <div className="w-full h-96">
      <MapContainer center={pickupPosition} zoom={10} scrollWheelZoom={true} className="h-full w-full">
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

        <RoutingMachine pickup={pickup} delivery={delivery} />
      </MapContainer>
    </div>
  );
};

export default StaticLocationMap;
