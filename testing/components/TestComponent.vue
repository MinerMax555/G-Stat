<template>
  <div style="height: 100%">
    <g-stat-base-map
      ref="map"
      :attribution-area-data="'Area attribution'"
      :marker-draggable-func="markerDraggableFunc"
      :marker-icon-func="markerIcon"
      :marker-popup-component="popup"
      :marker-popup-lazy="true"
      :marker-popup-width="200"
      :marker-cluster-icon-func="clusterFunc"
      :disable-marker-clustering="false"
      :marker-data="markerData"
      :area-data="[]"
      :area-geo-json="geoJson"
      :area-tooltip-func="() => 'Tooltip'"
      :area-border-color-func="'red'"
      :area-fill-color-func="'orange'"
      :area-fill-opacity-func="1"
      :area-border-opacity-func="1"
      :area-border-width-func="1"
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
    <div v-if="markerData[0]">
      <p>{{ markerData[0].lat }}</p>
      <p>{{ markerData[0].lon }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import GStatBaseMap from '../../src/components/GStatBaseMap.vue'
import Vue from 'vue'
import axios from 'axios'
import { divIcon, Point } from 'leaflet'
import TestPopupContent from './TestPopupContent.vue'

export default Vue.extend({
  name: 'TestComponent',
  components: { GStatBaseMap },
  data () {
    return {
      geoJson: null,
      markerData: [] as any[],
      markerDraggableFunc: () => {
        return false
      },
      popup: TestPopupContent,
      markerIcon: 'M23,11H18A1,1 0 0,0 17,12V21A1,1 0 0,0 18,22H23A1,1 0 0,0 24,21V12A1,1 0 0,0 23,11M23,20H18V13H23V20M20,2H2C0.89,2 0,2.89 0,4V16A2,2 0 0,0 2,18H9V20H7V22H15V20H13V18H15V16H2V4H20V9H22V4C22,2.89 21.1,2 20,2Z',
      clusterFunc: (cluster: any) => {
        const count = cluster.getChildCount()

        return divIcon({
          html: `<div><span>${count}</span></div>`,
          className: 'marker-cluster marker-cluster-large',
          iconSize: new Point(40, 40)
        })
      }
    }
  },
  async mounted () {
    console.log('remount')
    const geo = (await axios.get('https://gstat.eu/api/v1/adminarea/?adminLevel=10')).data
    geo.forEach((f: any) => {
      f.type = 'Feature'
    })
    this.geoJson = geo
    this.markerData = []
    for (let i = 0; i < 35; i++) {
      const batch = []
      //Simulate Backend API-Calls
      await new Promise(resolve => setTimeout(resolve, 150))
      for (let j = 0; j < 100; j++) {
        batch.push({
          id: i * 100 + j,
          lat: 46.5 + Math.random(),
          lon: 11 + Math.random()
        })
      }
      this.markerData = this.markerData.concat(batch)
      console.log('batch' + i)
    }
    //Add 20 Batches of 100 Markers each
  },
  methods: {
  }
})
</script>
