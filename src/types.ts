declare interface GStatMarkerOptions {
  className: string;
  icon: string | null;
  markerColor: string;
  iconColor: string;
  outlineColor: string;
  outlineWidth: number;
}

declare interface MarkerItem {
  id: number | string;
  lat: number;
  lon: number;
}
