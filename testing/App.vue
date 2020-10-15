<template>
  <div id="app" style="height: 750px">
    <test-component />
  </div>
</template>

<script>
import TestComponent from "./components/TestComponent.vue";
export default {
  name: 'app',
  components: {TestComponent}
}
</script>

<style type="text/css">
  @import "../node_modules/leaflet/dist/leaflet.css";
</style>
