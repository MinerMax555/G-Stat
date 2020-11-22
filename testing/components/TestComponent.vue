<template>
  <div style="height: 100%">
    <g-stat-base-map
      ref="map"
      :attribution-area-data="'Area attribution'"
      :map-options="{gestureHandling: true}"
      :marker-data="markerData"
      :area-data="[]"
      :area-geo-json="geoJson"
      :area-tooltip-func="() => 'Tooltip'"
      :area-border-color-func="() => 'red'"
      :area-fill-color-func="() => 'orange'"
      :area-fill-opacity-func="() => 1"
      :area-border-opacity-func="() => 1"
      :area-border-width-func="() => 1"
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

export default Vue.extend({
  name: 'TestComponent',
  components: { GStatBaseMap },
  data () {
    return {
      geoJson: null,
      markerData: [
        {
          id: 1,
          lat: 40,
          lon: 40
        },
        {
          id: 2,
          lat: 40.1,
          lon: 40
        },
        {
          id: 3,
          lat: 40.2,
          lon: 40
        }
      ]
    }
  },
  async mounted () {
    const geo = (await axios.get('https://gstat.eu/api/v1/adminarea/?adminLevel=2')).data
    geo.forEach((f: any) => {
      f.type = 'Feature'
    })
    this.geoJson = geo
  }
})
</script>
