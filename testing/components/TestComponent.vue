<template>
  <g-stat-base-map
    :attribution="'HERE COMES TEXT!'"
    :map-options="{gestureHandling: true}"
    :marker-data="markerData"
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
</template>
<script lang="ts">
import GStatBaseMap from '../../src/components/GStatBaseMap.vue'

export default {
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
  }
}
</script>
