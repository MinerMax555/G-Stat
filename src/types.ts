import * as geojson from 'geojson'

export declare interface GStatMarkerOptions {
  className: string;
  markerColor: string;
  icon: string | null;
  iconColor: string;
  outlineColor: string;
  outlineWidth: number;
  iconWebFont: boolean;
}

export declare interface MarkerItem {
  id: number | string;
  lat: number;
  lon: number;
  draggable?: boolean;
  touched?: boolean;
}

export declare type MarkerDraggableFuncType = (item: MarkerItem, callbackData?: Record<string, unknown>) => boolean;
export declare type MarkerIconFuncType = (item: MarkerItem, callbackData?: Record<string, unknown>) => string;
export declare type MarkerIconColorFuncType = (item: MarkerItem, callbackData?: Record<string, unknown>) => string;
export declare type MarkerFillColorFuncType = (item: MarkerItem, callbackData?: Record<string, unknown>) => string;

export declare type AreaBorderOpacityFunc = (feature: geojson.Feature, data: unknown, callbackData?: Record<string, unknown>) => number;
export declare type AreaBorderColorFunc = (feature: geojson.Feature, data: unknown, fillColor: string, callbackData?: Record<string, unknown>) => string;
export declare type AreaBorderWidthFunc = (feature: geojson.Feature, data: unknown, callbackData?: Record<string, unknown>) => number;
export declare type AreaFillOpacityFunc = (feature: geojson.Feature, data: unknown, callbackData?: Record<string, unknown>) => number;
export declare type AreaFillColorFunc = (feature: geojson.Feature, data: unknown, callbackData?: Record<string, unknown>) => string;
export declare type AreaTooltipFunc = (feature: geojson.Feature, data: unknown, callbackData?: Record<string, unknown>) => string;

export declare class GStatMarkercluster {

}
