<template>
  <g-stat-base-map :map-options="{gestureHandling: true}" />
</template>
<script>
import GStatBaseMap from '../../src/components/GStatBaseMap.vue'
export default {
  name: 'TestComponent',
  components: { GStatBaseMap }
}
</script>
