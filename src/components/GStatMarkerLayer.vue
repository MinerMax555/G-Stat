<template>
  <marker-cluster
    ref="clusterlayer"
    :options="{maxClusterRadius: 50}"
  >
    <l-marker
      v-for="marker of validPoints"
      :key="marker.id"
      :lat-lng="[marker.lat, marker.lon]"
      :icon="getMarkerIcon(marker)"
      @click="onClick(marker)"
    />
  </marker-cluster>
</template>
<script lang="ts">
import {
  MarkerItem,
  markerIconFuncType,
  markerIconColorFuncType,
  markerFillColorFuncType
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
    iconFunc: { type: Function as PropType<markerIconFuncType>, required: false, default: () => null },
    iconColorFunc: { type: Function as PropType<markerIconColorFuncType|string>, required: true, default: () => '#000000' },
    fillColorFunc: { type: Function as PropType<markerFillColorFuncType|string>, required: true, default: () => '#FFFFFF' }
  },
  computed: {
    validPoints (): Array<MarkerItem> {
      return this.data.filter(x => (x.lat !== null && x.lon !== null))
    }
  },
  methods: {
    getMarkerIcon: function (item: MarkerItem) {
      return createIconClass({
        icon: this.iconFunc(item),
        iconColor: typeof this.iconColorFunc === 'string' ? this.iconColorFunc : this.iconColorFunc(item),
        markerColor: typeof this.fillColorFunc === 'string' ? this.fillColorFunc : this.fillColorFunc(item)
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
