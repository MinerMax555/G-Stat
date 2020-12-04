<template>
  <div>
    <h1>Test!</h1>
    {{ marker.lat }}
    {{ marker.lon }}
    <button>Click me!</button>
  </div>
</template>

<script>
export default {
  name: "TestPopupContent",
  props: {
    marker: {type: Object, required: true},
    callbackData: {type: Object, required: false, default: null}
  }
}
</script>

<style scoped>

</style>
