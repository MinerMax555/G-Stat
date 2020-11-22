<template>
  <l-geo-json
    ref="geolayer"
    :attribution="attribution"
    :geojson="geoJson"
    :options="geoOptions"
  />
</template>

<script lang="ts">
import {
  areaBorderColorFunc,
  areaBorderOpacityFunc,
  areaBorderWidthFunc,
  areaFillColorFunc,
  areaFillOpacityFunc,
  areaTooltipFunc
} from '../types'
import { Layer, LeafletMouseEvent, SVG } from 'leaflet'
import { LGeoJson } from 'vue2-leaflet'
import Vue, { PropType } from 'vue'
import * as geojson from 'geojson'

export default Vue.extend({
  name: 'GStatAreaLayer',
  components: {
    LGeoJson
  },
  props: {
    // Data
    geoJson: { type: Array as PropType<Array<geojson.Feature>>, required: true },
    geoData: { type: [Array, Object] as PropType<Array<unknown>|Record<number, unknown>>, required: true },
    callbackData: { type: Object, required: false, default: null },

    // misc
    renderer: { type: Object as PropType<SVG>, default: () => new SVG({ padding: 0.35 }) },
    refresh: { type: Number, required: false, default: 0 },
    mouseHoverAnimation: { type: Boolean, default: true },
    attribution: { type: String, default: null },

    borderOpacityFunc: { type: Function as PropType<areaBorderOpacityFunc>, default: () => () => 1 },
    borderColorFunc: { type: Function as PropType<areaBorderColorFunc>, default: () => () => '#000000' },
    borderWidthFunc: { type: Function as PropType<areaBorderWidthFunc>, default: () => () => 1 },
    fillOpacityFunc: { type: Function as PropType<areaFillOpacityFunc>, default: () => () => 0.75 },
    fillColorFunc: { type: Function as PropType<areaFillColorFunc>, default: () => () => '#FFFFFF' },
    tooltipFunc: { type: Function as PropType<areaTooltipFunc>, default: () => () => null }
  },
  computed: {
    geoOptions: function () {
      return {
        style: (feature: geojson.Feature) => {
          const geoID = Number(feature.id)
          const data = this.geoData[geoID]

          const fillColor = this.fillColorFunc(feature, data, this.callbackData)
          return {
            renderer: this.renderer,
            color: this.borderColorFunc(feature, data, fillColor, this.callbackData),
            opacity: this.borderOpacityFunc(feature, data, this.callbackData),
            weight: this.borderWidthFunc(feature, data, this.callbackData),
            fillColor: fillColor,
            fillOpacity: this.fillOpacityFunc(feature, data, this.callbackData)
          }
        },
        onEachFeature: (feature: geojson.Feature, layer: Layer): void => {
          layer.on({
            mouseover: this.onMouseEnter.bind(this),
            mouseout: this.onMouseLeave.bind(this),
            click: this.onMouseClick.bind(this)
          })
          const geoID = Number(feature.id)
          const data = this.geoData[geoID]

          const tooltip = this.tooltipFunc.bind(this)(feature, data, this.callbackData)
          // only set tooltip if function returns something
          if (tooltip) {
            layer.bindTooltip(tooltip)
          }
        }
      }
    }
  },
  watch: {
    geoData: function () {
      this.refreshStyle()
    },
    refresh: function () {
      this.refreshStyle()
    }
  },
  async mounted () {
    this.refreshStyle()
  },
  methods: {
    refreshStyle () {
      (this.$refs.geolayer as LGeoJson).setOptions(this.geoOptions)
    },
    getLayer () : LGeoJson {
      return (this.$refs.geolayer as LGeoJson)
    },
    onMouseEnter (event: LeafletMouseEvent) {
      if (this.mouseHoverAnimation) {
        const target = event.target
        const data = this.geoData[target.feature.id]
        target.setStyle({
          weight: this.borderWidthFunc(target.feature, data) * 2 + 3
        })
        target.bringToFront()
      }
      this.$emit('mouse-enter', event)
    },
    onMouseLeave (event: LeafletMouseEvent) {
      if (this.mouseHoverAnimation) {
        const target = event.target
        const data = this.geoData[target.feature.id]
        target.setStyle({
          weight: this.borderWidthFunc(target.feature, data)
        })
      }
      this.$emit('mouse-leave', event)
    },
    onMouseClick (event: LeafletMouseEvent) {
      this.$emit('click', event)
    }
  }
})
</script>

<style scoped>

</style>
