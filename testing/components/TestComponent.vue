<template>
  <g-stat-base-map
    :attribution="'HERE COMES TEXT!'"
    :map-options="{gestureHandling: true}"
    :marker-data="markerData"
  />
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
