import * as geojson from 'geojson'

export declare interface GStatMarkerOptions {
  className: string;
  icon: string | null;
  markerColor: string;
  iconColor: string;
  outlineColor: string;
  outlineWidth: number;
}

export declare interface MarkerItem {
  id: number | string;
  lat: number;
  lon: number;
}

export declare type markerIconFuncType = (item: MarkerItem) => string;
export declare type markerIconColorFuncType = (item: MarkerItem) => string;
export declare type markerFillColorFuncType = (item: MarkerItem) => string;

export declare type areaBorderOpacityFunc = (feature: geojson.Feature, data: unknown, callbackData?: Record<string, unknown>) => number;
export declare type areaBorderColorFunc = (feature: geojson.Feature, data: unknown, fillColor: string, callbackData?: Record<string, unknown>) => string;
export declare type areaBorderWidthFunc = (feature: geojson.Feature, data: unknown, callbackData?: Record<string, unknown>) => number;
export declare type areaFillOpacityFunc = (feature: geojson.Feature, data: unknown, callbackData?: Record<string, unknown>) => number;
export declare type areaFillColorFunc = (feature: geojson.Feature, data: unknown, callbackData?: Record<string, unknown>) => string;
export declare type areaTooltipFunc = (feature: geojson.Feature, data: unknown, callbackData?: Record<string, unknown>) => string;
