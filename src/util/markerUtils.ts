import L from 'leaflet'
import {GStatMarkerOptions} from '@/types'

const DEFAULT_MARKER_OPTIONS: GStatMarkerOptions = {
  className: 'l-icon-material',
  icon: null,
  contentOffsetX: 5.4,
  contentOffsetY: 5,
  contentTransform: "scale(0.9)",
  markerColor: '#FFFFFF',
  iconColor: '#000000',
  outlineColor: '#000000',
  outlineWidth: 1
}

const GstatMapMarkerIcon = L.Icon.extend({
  initialize: function (options: GStatMarkerOptions) {
    this.options = L.Util.setOptions(this, options)
  },

  createIcon: function () {
    const options = L.Util.setOptions(this, this.options)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

    const content = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    )
    content.setAttribute('x', '5.4')
    content.setAttribute('y', '5')
    content.setAttribute('transform', 'scale(0.9)')

    const icon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    icon.setAttribute(
      'd',
      options.icon
    )
    //icon.setAttribute('class', `node mdi ${options.icon}`)
    icon.setAttribute('fill', options.iconColor)
    content.append(icon)

    svg.setAttribute('width', '31')
    svg.setAttribute('height', '42')
    svg.setAttribute('class', 'l-icon-material')
    svg.setAttributeNS(
      'http://www.w3.org/2000/xmlns/',
      'xmlns:xlink',
      'http://www.w3.org/1999/xlink'
    )

    path.setAttribute(
      'd',
      'M15.6,1c-7.7,0-14,6.3-14,14c0,10.5,14,26,14,26s14-15.5,14-26C29.6,7.3,23.3,1,15.6,1z'
    )
    path.setAttribute('fill', options.markerColor)
    path.setAttribute('stroke', options.outlineColor)
    path.setAttribute('stroke-width', options.outlineWidth)
    svg.append(path)

    svg.appendChild(content)

    return svg
  }
})

export function createIconClass(options: Partial<GStatMarkerOptions>): L.Icon {
  options = Object.assign(DEFAULT_MARKER_OPTIONS, options)
  const ret = new GstatMapMarkerIcon()
  ret.initialize(options)
  return ret
}
