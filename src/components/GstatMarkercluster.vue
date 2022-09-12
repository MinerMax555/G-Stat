<template>
  <div style="display: none;">
    <slot v-if="ready" />
  </div>
</template>

<script lang="ts">
import 'leaflet.markercluster'
import leaflet, { DomEvent, Marker } from 'leaflet'
import { findRealParent, propsBinder } from 'vue2-leaflet'
import Vue from 'vue'
import { GStatMarkercluster } from '../types'
import EventHandlerFn = DomEvent.EventHandlerFn

const props = {
  options: { type: Object, required: true },
  data: { type: Array, required: true }
}
export default Vue.extend({
  name: 'GStatLeafletMarkercluster',
  props,
  data () {
    return {
      mapObject: null as leaflet.MarkerClusterGroup | null,
      parentContainer: null as any,
      ready: false
    }
  },
  watch: {
    data(newVal: Marker[], oldVal: Marker[]) {
      if (this.mapObject) {
        this.mapObject.removeLayers(oldVal);
        this.mapObject.addLayers(newVal);
      }
    }
  },
  mounted () {
    this.mapObject = new leaflet.MarkerClusterGroup(this.options)
    DomEvent.on(this.mapObject as unknown as HTMLElement, this.$listeners as Record<string, EventHandlerFn>)
    propsBinder(this, this.mapObject as any, props)
    this.ready = true
    this.parentContainer = findRealParent(this.$parent as Vue)
    this.parentContainer.addLayer(this)
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject)
    })
  },
  beforeDestroy () {
    this.parentContainer.removeLayer(this)
  },
  methods: {
    addLayer (layer: { mapObject: leaflet.Layer }, alreadyAdded: boolean) {
      if (!alreadyAdded) {
        (this.mapObject as leaflet.MarkerClusterGroup).addLayer(layer.mapObject)
      }
    },
    removeLayer (layer: { mapObject: leaflet.Layer }, alreadyRemoved: boolean) {
      if (!alreadyRemoved && this.mapObject !== null) {
        (this.mapObject as leaflet.MarkerClusterGroup).removeLayer(layer.mapObject)
      }
    }
  }
}) as GStatMarkercluster
</script>
<style>

.leaflet-cluster-anim .leaflet-marker-icon, .leaflet-cluster-anim .leaflet-marker-shadow {
  -webkit-transition: -webkit-transform 0.3s ease-out, opacity 0.3s ease-in;
  -moz-transition: -moz-transform 0.3s ease-out, opacity 0.3s ease-in;
  -o-transition: -o-transform 0.3s ease-out, opacity 0.3s ease-in;
  transition: transform 0.3s ease-out, opacity 0.3s ease-in;
}

.leaflet-cluster-spider-leg {
  /* stroke-dashoffset (duration and function) should match with leaflet-marker-icon transform in order to track it exactly */
  -webkit-transition: -webkit-stroke-dashoffset 0.3s ease-out, -webkit-stroke-opacity 0.3s ease-in;
  -moz-transition: -moz-stroke-dashoffset 0.3s ease-out, -moz-stroke-opacity 0.3s ease-in;
  -o-transition: -o-stroke-dashoffset 0.3s ease-out, -o-stroke-opacity 0.3s ease-in;
  transition: stroke-dashoffset 0.3s ease-out, stroke-opacity 0.3s ease-in;
}

.marker-cluster-small {
  background-color: rgba(181, 226, 140, 0.6);
}

.marker-cluster-small div {
  background-color: rgba(110, 204, 57, 0.6);
}

.marker-cluster-medium {
  background-color: rgba(241, 211, 87, 0.6);
}

.marker-cluster-medium div {
  background-color: rgba(240, 194, 12, 0.6);
}

.marker-cluster-large {
  background-color: rgba(253, 156, 115, 0.6);
}

.marker-cluster-large div {
  background-color: rgba(241, 128, 23, 0.6);
}

/* IE 6-8 fallback colors */
.leaflet-oldie .marker-cluster-small {
  background-color: rgb(181, 226, 140);
}

.leaflet-oldie .marker-cluster-small div {
  background-color: rgb(110, 204, 57);
}

.leaflet-oldie .marker-cluster-medium {
  background-color: rgb(241, 211, 87);
}

.leaflet-oldie .marker-cluster-medium div {
  background-color: rgb(240, 194, 12);
}

.leaflet-oldie .marker-cluster-large {
  background-color: rgb(253, 156, 115);
}

.leaflet-oldie .marker-cluster-large div {
  background-color: rgb(241, 128, 23);
}

.marker-cluster {
  background-clip: padding-box;
  border-radius: 20px;
}

.marker-cluster div {
  width: 30px;
  height: 30px;
  margin-left: 5px;
  margin-top: 5px;

  text-align: center;
  border-radius: 15px;
  font: 12px "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.marker-cluster span {
  line-height: 30px;
}

</style>
