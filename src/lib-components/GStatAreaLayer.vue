<template>
  <l-geo-json
    :geojson="geoJson"
    :options="geoOptions"
    ref="geolayer"
  />
</template>

<script>
import {SVG} from "leaflet";
import {LGeoJson} from "vue2-leaflet";

export default {
  name: "GStatAreaLayer",
  components: {
    LGeoJson
  },
  props: {
    //Data
    geoJson: {type: Array, required: true},
    geoData: {type: Object, required: true},
    callbackData: {type: Object, required: false, default: null},

    //misc
    renderer: {type: Object, default: () => new SVG({padding: 0.35})},
    refresh: {type: Number, required: false, default: 0},
    mouseHoverAnimation: {type: Boolean, default: true},

    borderOpacityFunc: {type: Function, default: () => 1},
    borderColorFunc: {type: Function, default: () => "#000000"},
    borderWidthFunc: {type: Function, default: () => 1},
    fillOpacityFunc: {type: Function, default: () => 0.75},
    fillColorFunc: {type: Function, default: () => "#FFFFFF"},
    tooltipFunc: {type: Function, default: () => null},
  },
  computed: {
    geoOptions: function() {
      return {
        style: feature => {
          const geoID = Number(feature.id);
          const data = this.geoData[geoID];

          const fillColor = this.fillColorFunc(feature, data, this.callbackData);
          return {
            renderer: this.renderer,
            color: this.borderColorFunc(feature, data, fillColor),
            opacity: this.borderOpacityFunc(feature, data, this.callbackData),
            weight: this.borderWidthFunc(feature, data),
            fillColor: fillColor,
            fillOpacity: this.fillOpacityFunc(feature, data, this.callbackData)
          };
        },
        onEachFeature: (feature, layer) => {
          layer.on({
            mouseover: this.onMouseEnter.bind(this),
            mouseout: this.onMouseLeave.bind(this),
            click: this.onMouseClick.bind(this),
          });
          const geoID = Number(feature.id);
          const data = this.geoData[geoID];

          let tooltip = this.tooltipFunc(feature, data, this.callbackData)
          //only set tooltip if function returns something
          if(tooltip) {
            layer.bindTooltip(tooltip)
          }
        }
      }
    }
  },
  watch: {
    geoData: function () {
      this.refreshStyle();
    },
    refresh: function () {
      this.refreshStyle();
    },
  },
  async mounted() {
    this.refreshStyle();
  },
  methods: {
    refreshStyle() {
      this.$refs.geolayer.setOptions(this.geoOptions);
    },
    onMouseEnter(event) {
      if(this.mouseHoverAnimation) {
        const target = event.target;
        const data = this.geoData[target.feature.id]
        target.setStyle({
          weight: this.borderWidthFunc(target.feature, data) * 2 + 3
        });
        target.bringToFront();
      }
      this.$emit('mouse-enter', event);
    },
    onMouseLeave(event) {
      if(this.mouseHoverAnimation) {
        const target = event.target;
        const data = this.geoData[target.feature.id]
        target.setStyle({
          weight: this.borderWidthFunc(target.feature, data)
        });
      }
      this.$emit('mouse-leave', event);
    },
    onMouseClick(event) {
      this.$emit('click', event);
    }
  }
}
</script>

<style scoped>

</style>
