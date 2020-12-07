<template>
  <div>
    <h1 v-if="marker.touched">
      Touched!
    </h1>
    <h1 v-if="marker.touched">
      Touched!
    </h1>
    <h1 v-if="marker.touched">
      Touched!
    </h1>
    <h1 v-if="marker.touched">
      Touched!
    </h1>
    <h1 v-if="marker.touched">
      Touched!
    </h1>
    {{ marker.lat }}
    {{ marker.lon }}
    <br>
    <button>Click me!</button>
  </div>
</template>

<script>
export default {
  name: "TestPopupContent",
  props: {
    marker: {type: Object, required: true},
    callbackData: {type: Object, required: false, default: null}
  },
  mounted() {
    console.log('popup mount')
  }
}
</script>

<style scoped>

</style>
