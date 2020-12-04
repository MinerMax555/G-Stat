<template>
  <div style="height: 100%">
    <g-stat-base-map
      ref="map"
      :attribution-area-data="'Area attribution'"
      :marker-draggable-func="markerDraggableFunc"
      :marker-popup-component="popup"
      :disable-marker-clustering="true"
      :marker-data="markerData"
      :area-data="[]"
      :area-geo-json="geoJson"
      :area-tooltip-func="() => 'Tooltip'"
      :area-border-color-func="'red'"
      :area-fill-color-func="'orange'"
      :area-fill-opacity-func="1"
      :area-border-opacity-func="1"
      :area-border-width-func="1"
      @marker-move="onMarkerMove"
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
    <br>
    <div v-if="markerData">
      <p>{{ markerData[0].lat }}</p>
      <p>{{ markerData[0].lon }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import GStatBaseMap from '../../src/components/GStatBaseMap.vue'
import Vue from 'vue'
import axios from 'axios'
import { MarkerItem } from '@/types'
import { LatLng } from 'leaflet'
import TestPopupContent from './TestPopupContent.vue'

export default Vue.extend({
  name: 'TestComponent',
  components: { GStatBaseMap },
  data () {
    return {
      geoJson: null,
      markerData: [] as any[],
      markerDraggableFunc: () => {
        return true
      },
      popup: TestPopupContent
    }
  },
  async mounted () {
    console.log('remount')
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
    ]
  },
  methods: {
    onMarkerMove: function (event: {marker: MarkerItem, newPosition: LatLng}) {
      this.markerData[0].lat = event.newPosition.lat
      this.markerData[0].lon = event.newPosition.lng
      //event.marker.lat = event.newPosition.lat
      //event.marker.lon = event.newPosition.lng
    }
  }
})
</script>
