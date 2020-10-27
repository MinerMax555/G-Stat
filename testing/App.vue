<template>
  <div
    id="app"
    style="height: 750px"
  >
    <test-component />
  </div>
</template>

<script>
import TestComponent from './components/TestComponent.vue'
export default {
  name: 'App',
  components: { TestComponent }
}
</script>

<style type="text/css">
  @import "../node_modules/leaflet/dist/leaflet.css";
  @import "../node_modules/leaflet-gesture-handling/dist/leaflet-gesture-handling.min.css";
</style>
