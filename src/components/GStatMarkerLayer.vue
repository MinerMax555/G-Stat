<template>
  <marker-cluster
    v-if="!disableClustering"
    ref="clusterlayer"
    :data="markerData"
    :icon-func="getMarkerIcon"
    :options="clusterOptions"
    @ready="$emit('ready')"
  >
    <!--
    <l-marker
      v-for="marker of validPoints"
      :key="marker.id"
      :lat-lng="[marker.lat, marker.lon]"
      :draggable="marker.draggable"
      :icon="getMarkerIcon(marker)"
      @click="onClick(marker)"
      @update:latLng="onPositionUpdate(marker, $event)"
    >
      <l-popup
        v-if="popupComponent"
        :options="{
          offset: popupOffset,
          minWidth: popupWidth
        }"
      >
        <component
          :is="popupComponent"
          v-if="(!popupLazy || marker.touched)"
          :marker="marker"
          :callback-data="callbackData"
        />
        <div v-else />
      </l-popup>
    </l-marker>
    -->
  </marker-cluster>
  <div v-else>
    <l-marker
      v-for="marker of validPoints"
      :key="marker.id"
      :lat-lng="[marker.lat, marker.lon]"
      :draggable="marker.draggable"
      :icon="getMarkerIcon(marker)"
      @click="onClick(marker)"
      @update:latLng="onPositionUpdate(marker, $event)"
    >
      <l-popup
        v-if="popupComponent"
        :options="{offset: popupOffset}"
      >
        <component
          :is="popupComponent"
          v-if="(!popupLazy || marker.touched)"
          :marker="marker"
          :callback-data="callbackData"
        />
      </l-popup>
    </l-marker>
  </div>
</template>
<script lang="ts">
import {
  MarkerItem,
  MarkerDraggableFuncType,
  MarkerIconFuncType,
  MarkerIconColorFuncType,
  MarkerFillColorFuncType
} from '../types'
import { LMarker, LPopup } from 'vue2-leaflet'
import { createIconClass } from '@/util/markerUtils'
import Vue, { PropType } from 'vue'
import { FeatureGroup, Point, LatLng, Marker } from 'leaflet'

export default Vue.extend({
  name: 'GStatMarkerLayer',
  components: {
    'l-marker': LMarker,
    'l-popup': LPopup,
    'marker-cluster': () => import('@/components/GstatMarkercluster.vue')
  },
  props: {
    data: { type: Array as PropType<Array<MarkerItem>>, required: true },
    callbackData: { type: Object, required: false, default: null },
    disableClustering: { type: Boolean, required: false, default: false },
    popupComponent: { type: Object, required: false, default: null },
    popupLazy: { type: Boolean, required: false, default: true },
    popupWidth: { type: Number, required: false, default: 50 },
    markerDraggableFunc: {
      type: [Boolean, Function] as PropType<MarkerDraggableFuncType | boolean>,
      required: false,
      default: false
    },
    iconFunc: {
      type: [Function, String] as PropType<MarkerIconFuncType | string>,
      required: false,
      default: ''
    },
    iconColorFunc: {
      type: [Function, String] as PropType<MarkerIconColorFuncType | string>,
      required: true,
      default: '#000000'
    },
    iconWebFont: {
      type: Boolean,
      required: false,
      default: false
    },
    fillColorFunc: {
      type: [Function, String] as PropType<MarkerFillColorFuncType | string>,
      required: true,
      default: '#FFFFFF'
    },
    clusterIconFunc: {
      type: Function,
      required: false,
      default: undefined
    }
  },
  data () {
    return {
      popupOffset: new Point(0, -15)
    }
  },
  computed: {
    validPoints (): Array<MarkerItem> {
      if (!this.data) {
        return []
      }
      const filtered = this.data.filter(x => (x.lat !== null && x.lon !== null))
      for (const item of filtered) {
        if (item.draggable === undefined) {
          item.draggable = typeof this.markerDraggableFunc === 'boolean' ? this.markerDraggableFunc : this.markerDraggableFunc(item)
        }
      }
      return filtered
    },
    markerData () {
      const ret = []
      for(const point of this.validPoints) {
        ret.push(new Marker([point.lat, point.lon], { icon: this.getMarkerIcon(point)}))
      }
      return ret
    },
    clusterOptions () {
      return {
        maxClusterRadius: 50,
        iconCreateFunction: this.clusterIconFunc,
        iconSize: new Point(40, 40)
      }
    }
  },
  methods: {
    getMarkerIcon: function (item: MarkerItem) {
      return createIconClass({
        icon: typeof this.iconFunc === 'function' ? this.iconFunc(item, this.callbackData) : this.iconFunc,
        iconColor: typeof this.iconColorFunc === 'function' ? this.iconColorFunc(item, this.callbackData) : this.iconColorFunc,
        iconWebFont: this.iconWebFont,
        markerColor: typeof this.fillColorFunc === 'function' ? this.fillColorFunc(item, this.callbackData) : this.fillColorFunc,
      })
    },
    getLayer: function (): FeatureGroup {
      return (this.$refs.clusterlayer as any).mapObject
    },
    onClick: function (item: MarkerItem): void {
      Vue.set(item, 'touched', true)
      this.$emit('click', item)
    },
    onPositionUpdate: function (marker: MarkerItem, latLng: LatLng): void {
      this.$emit('marker-move', { marker: marker, newPosition: latLng })
    }
  }
})
</script>

<style>

.l-icon-material {
  margin-top: -42px;
  margin-left: -17px;
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  text-align: center;
}

.l-icon-material {
  font-size: 20px;
}
</style>
