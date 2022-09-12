<template>
  <div v-if="marker">
    <h1 v-if="marker.touched">
      Touched!
    </h1>
    {{ marker.lat }} <br>
    {{ marker.lon }}
    <br>
    <button>Click me!</button>
  </div>
</template>

<script>
export default {
  name: 'TestPopupContent',
  props: {
    marker: { type: Object, required: false, default: null },
    callbackData: { type: Object, required: false, default: null }
  },
  mounted () {
    console.log('popup mount')
  }
}
</script>

<style scoped>

</style>
