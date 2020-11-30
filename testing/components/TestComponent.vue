<template>
  <div style="height: 100%">
    <g-stat-base-map
      ref="map"
      :attribution-area-data="'Area attribution'"
      :marker-draggable-func="markerDraggableFunc"
      :marker-data="markerData"
      :area-data="[]"
      :area-geo-json="geoJson"
      :area-tooltip-func="() => 'Tooltip'"
      :area-border-color-func="() => 'red'"
      :area-fill-color-func="() => 'orange'"
      :area-fill-opacity-func="() => 1"
      :area-border-opacity-func="() => 1"
      :area-border-width-func="() => 1"
      @marker-layer-ready="onMarkerLayerReady"
    >
      <template #legend>
        <div style="background: white">
          <h4>Styling: xyz</h4>
          <div style="border-left: 12px solid gray">
            0
          </div>
          <div style="border-left: 12px solid yellow">
            25
          </div>
          <div style="border-left: 12px solid orange">
            50
          </div>
          <div style="border-left: 12px solid red">
            100
          </div>
        </div>
      </template>
    </g-stat-base-map>
    <button
      @click="$refs.map.centerOnAreaLayer()"
    >
      Center on Areas
    </button>
    <button
      @click="$refs.map.centerOnMarkerLayer()"
    >
      Center on Marker
    </button>
  </div>
</template>
<script lang="ts">
import GStatBaseMap from '../../src/components/GStatBaseMap.vue'
import Vue from 'vue'
import axios from 'axios'
import { MarkerItem } from '@/types'

export default Vue.extend({
  name: 'TestComponent',
  components: { GStatBaseMap },
  data () {
    return {
      geoJson: null,
      markerData: [] as any[],
      markerDraggableFunc: (item: MarkerItem) => {
        return item.lat >= 46.6
      }
    }
  },
  async mounted () {
    const geo = (await axios.get('https://gstat.eu/api/v1/adminarea/?adminLevel=10')).data
    geo.forEach((f: any) => {
      f.type = 'Feature'
    })
    this.geoJson = geo
    this.markerData = [
      {
        id: 1,
        lat: 46.5,
        lon: 11
      },
      {
        id: 2,
        lat: 46.6,
        lon: 11
      },
      {
        id: 3,
        lat: 46.7,
        lon: 11
      }
    ]
  },
  methods: {
    onMarkerLayerReady: function () {
      console.log('Ready!')
    }
  }
})
</script>
