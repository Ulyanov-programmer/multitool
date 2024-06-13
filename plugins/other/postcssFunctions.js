const LAYOUT_WIDTH = 1440


export function pxToVw(px) {
  let pxNumber = px.replace('px', '')

  return `calc(${pxNumber} * 100vw / ${LAYOUT_WIDTH})`
}

export function bgImageMultiType(url) {
  let webpUrl, avifUrl, newParams

  webpUrl = url.replace('.jpg', '.webp')
  webpUrl = webpUrl.replace('.png', '.webp')

  avifUrl = url.replace('.jpg', '.avif')
  avifUrl = avifUrl.replace('.png', '.avif')

  newParams = `image-set(url(${url}) 1x, url(${webpUrl}) 1x, url(${avifUrl}) 1x)`

  return newParams
}

export function grid(gap, columns, rows) {
  let props = 'grid'

  if (gap)
    props += `;\ngap: ${gap}`

  if (columns)
    props += `;\ngrid-template-columns: ${columns}`

  if (rows)
    props += `;\ngrid-template-rows: ${rows}`

  return props
}
export function flex(gap, flexFlow, inline) {
  if (inline == 'inline')
    var props = `inline-flex`
  else
    var props = `flex`

  if (gap)
    props += `;\ngap: ${gap}`

  if (flexFlow)
    props += `;\nflex-flow: ${flexFlow}`

  return props
}

export function absolute(inset, zIndex) {
  var props = `absolute`

  if (inset)
    props += `;\ninset: ${inset}`

  if (zIndex)
    props += `;\nz-index: ${zIndex}`

  return props
}
