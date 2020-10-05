import L from 'leaflet'

const DEFAULT_MARKER_OPTIONS = {
  className: 'l-icon-material',
  icon: null,
  markerColor: '#FFFFFF',
  iconColor: '#000000',
  outlineColor: '#000000',
  outlineWidth: '1'
}

const GstatMapMarkerIcon = L.Icon.extend({
  initialize: function (options) {
    this.options = L.Util.setOptions(this, options)
  },

  createIcon: function () {
    const options = L.Util.setOptions(this, this.options)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    const icon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'foreignObject'
    )

    svg.setAttribute('width', '31')
    svg.setAttribute('height', '42')
    svg.setAttribute('class', 'l-icon-material')
    svg.setAttributeNS(
      'http://www.w3.org/2000/xmlns/',
      'xmlns:xlink',
      'http://www.w3.org/1999/xlink'
    )

    path.setAttributeNS(
      null,
      'd',
      'M15.6,1c-7.7,0-14,6.3-14,14c0,10.5,14,26,14,26s14-15.5,14-26C29.6,7.3,23.3,1,15.6,1z'
    )
    path.setAttribute('fill', options.markerColor)
    path.setAttribute('stroke', options.outlineColor)
    path.setAttribute('stroke-width', options.outlineWidth)
    svg.append(path)

    icon.setAttribute('width', '31')
    icon.setAttribute('height', '42')
    icon.setAttribute('class', `node mdi ${options.icon}`)
    icon.setAttribute('color', options.iconColor)
    svg.appendChild(icon)

    return svg
  }
})

export default {
  createIconClass: function (options) {
    options = Object.assign(DEFAULT_MARKER_OPTIONS, options)
    const ret = new GstatMapMarkerIcon()
    ret.initialize(options)
    return ret
  }
}
