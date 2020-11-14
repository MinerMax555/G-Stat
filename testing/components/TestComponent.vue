<template>
  <g-stat-base-map
    v-if="geoJson"
    :attribution="'HERE COMES TEXT!'"
    :map-options="{gestureHandling: true}"
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
      geoJson: null
    }
  },
  async mounted () {
    const geo = (await axios.get('https://corona.gstat.eu/api/v1/adminarea/?adminLevel=2')).data
    geo.forEach((f: any) => { f.type = 'Feature' })
    this.geoJson = geo
  }
})
</script>
