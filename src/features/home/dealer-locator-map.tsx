"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import type { Branch } from "@/types";

function branchIcon(isNearest: boolean) {
  return L.divIcon({
    className: "",
    html: `<span style="
      display:flex;align-items:center;justify-content:center;
      width:${isNearest ? 34 : 26}px;height:${isNearest ? 34 : 26}px;
      border-radius:9999px;
      background:${isNearest ? "oklch(0.58 0.22 27)" : "oklch(0.2 0.01 260)"};
      border:2px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.4);
    "></span>`,
    iconSize: [isNearest ? 34 : 26, isNearest ? 34 : 26],
    iconAnchor: [isNearest ? 17 : 13, isNearest ? 17 : 13],
  });
}

export default function DealerLocatorMap({
  branches,
  nearestId,
}: {
  branches: Branch[];
  nearestId: string | null;
}) {
  const bounds = L.latLngBounds(
    branches.map((branch): [number, number] => [branch.lat, branch.lng]),
  );

  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={{ padding: [30, 30] }}
      scrollWheelZoom={false}
      className="size-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {branches.map((branch) => (
        <Marker
          key={branch.id}
          position={[branch.lat, branch.lng]}
          icon={branchIcon(branch.id === nearestId)}
        >
          <Popup>
            <p className="font-semibold">{branch.name}</p>
            <p className="text-xs">{branch.phone}</p>
            <p className="text-xs">{branch.hours}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
