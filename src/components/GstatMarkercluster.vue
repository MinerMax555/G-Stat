<template>
  <div style="display: none;">
    <slot v-if="ready" />
  </div>
</template>

<script lang="ts">
/*
 * NOTE: this was copied over from https://github.com/jperelli/vue2-leaflet-markercluster (MIT License) and may be
 * modified in the future
 */
import { MarkerClusterGroup } from 'leaflet.markercluster'
import { findRealParent, propsBinder } from 'vue2-leaflet'
import { DomEvent } from 'leaflet'
import Vue from 'vue'
import EventHandlerFn = DomEvent.EventHandlerFn;

const props = {
  options: {
    type: Object,
    default () {
      return {}
    }
  }
}
export default Vue.extend({
  name: 'GStatLeafletMarkercluster',
  props,
  data () {
    return {
      mapObject: null,
      parentContainer: null,
      ready: false
    }
  },
  mounted () {
    this.mapObject = new MarkerClusterGroup(this.options) as any
    DomEvent.on(this.mapObject as unknown as HTMLElement, this.$listeners as Record<string, EventHandlerFn>)
    propsBinder(this, this.mapObject as any, props)
    this.ready = true
    this.parentContainer = findRealParent(this.$parent);
    (this.parentContainer as any).addLayer(this)
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject)
    })
  },
  beforeDestroy () {
    (this.parentContainer as any).removeLayer(this)
  },
  methods: {
    addLayer (layer: any, alreadyAdded: boolean) {
      if (!alreadyAdded) {
        (this.mapObject as any).addLayer(layer.mapObject)
      }
    },
    removeLayer (layer: any, alreadyRemoved: boolean) {
      if (!alreadyRemoved && this.mapObject !== null) {
        (this.mapObject as any).removeLayer(layer.mapObject)
      }
    }
  }
})
</script>
