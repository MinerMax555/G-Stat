import L from 'leaflet'
import {GStatMarkerOptions} from '../types'

const DEFAULT_MARKER_OPTIONS: GStatMarkerOptions = {
  className: 'l-icon-material',
  markerColor: '#FFFFFF',
  icon: null,
  iconColor: '#000000',
  outlineColor: '#000000',
  outlineWidth: 1,
  iconWebFont: false,
}

const GstatMapMarkerIcon = L.Icon.extend({
  initialize: function (options: GStatMarkerOptions) {
    this.options = L.Util.setOptions(this, options)
  },

  createIcon: function () {
    const options = L.Util.setOptions(this, this.options)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

    svg.setAttribute('width', '32')
    svg.setAttribute('height', '42')
    svg.setAttribute('class', 'l-icon-material')
    let iconHTML = ''
    if (options.icon) {
      if (options.iconWebFont) {
        iconHTML = `<foreignObject width="32" height="42" color="${options.iconColor}" class="node mdi ${options.icon}"></foreignObject>`
      } else {
        iconHTML = `<svg width="20" height="20" viewBox="0 0 24 24" x="5" y="5"><path d="${options.icon}" fill="${options.iconColor}"></path></svg>`
      }
    }
    svg.innerHTML = `
      <path
      d="M 15 1 c -7.7 0 -14 6.3 -14 14 c 0 10.5 14 26 14 26 s 14 -15.5 14 -26 C 29 7 23.3 1 15 1 z"
      fill="${options.markerColor}"
      stroke="${options.outlineColor}"
      stroke-width="${options.outlineWidth}">
      </path>
      ${iconHTML}
    `
    return svg
  }
})

export function createIconClass(options: Partial<GStatMarkerOptions>): L.Icon {
  options = Object.assign(DEFAULT_MARKER_OPTIONS, options)
  const ret = new GstatMapMarkerIcon()
  ret.initialize(options)
  return ret
}
