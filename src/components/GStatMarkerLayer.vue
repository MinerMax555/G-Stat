<template>
  <marker-cluster
    ref="clusterlayer"
    :options="{maxClusterRadius: 50}"
    @ready="$emit('ready')"
  >
    <l-marker
      v-for="marker of validPoints"
      :key="marker.id"
      :lat-lng="[marker.lat, marker.lon]"
      :draggable="marker.draggable"
      :icon="getMarkerIcon(marker)"
      @click="onClick(marker)"
    />
  </marker-cluster>
</template>
<script lang="ts">
import {
  MarkerItem,
  MarkerDraggableFuncType,
  MarkerIconFuncType,
  MarkerIconColorFuncType,
  MarkerFillColorFuncType
} from '../types'
import { LMarker } from 'vue2-leaflet'
import { createIconClass } from '@/util/markerUtils.ts'
import Vue, { PropType } from 'vue'
import { FeatureGroup } from 'leaflet'

export default Vue.extend({
  name: 'GStatMarkerLayer',
  components: {
    'l-marker': LMarker,
    'marker-cluster': () => import('@/components/GstatMarkercluster.vue')
  },
  props: {
    data: { type: Array as PropType<Array<MarkerItem>>, required: true },
    callbackData: { type: Object, required: false, default: null },
    markerDraggableFunc: { type: [Boolean, Function] as PropType<boolean|MarkerDraggableFuncType>, required: false, default: false },
    iconFunc: { type: Function as PropType<MarkerIconFuncType>, required: false, default: () => null },
    iconColorFunc: { type: Function as PropType<MarkerIconColorFuncType|string>, required: true, default: () => '#000000' },
    fillColorFunc: { type: Function as PropType<MarkerFillColorFuncType|string>, required: true, default: () => '#FFFFFF' }
  },
  computed: {
    validPoints (): Array<MarkerItem> {
      const filtered = this.data.filter(x => (x.lat !== null && x.lon !== null))
      for (const item of filtered) {
        if (item.draggable === undefined) {
          item.draggable = typeof this.markerDraggableFunc === 'boolean' ? this.markerDraggableFunc : this.markerDraggableFunc(item)
        }
      }
      return filtered
    }
  },
  methods: {
    getMarkerIcon: function (item: MarkerItem) {
      return createIconClass({
        icon: this.iconFunc(item, this.callbackData),
        iconColor: typeof this.iconColorFunc === 'string' ? this.iconColorFunc : this.iconColorFunc(item, this.callbackData),
        markerColor: typeof this.fillColorFunc === 'string' ? this.fillColorFunc : this.fillColorFunc(item, this.callbackData)
      })
    },
    getLayer: function () : FeatureGroup {
      return (this.$refs.clusterlayer as any).mapObject
    },
    onClick: function (item: MarkerItem): void {
      this.$emit('click', item)
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
