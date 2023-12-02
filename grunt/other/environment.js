const isDeleteDistBeforeLaunch = process.argv.includes('--update-dist')
const isProductionMode = process.argv.includes('--production')

export {
  isDeleteDistBeforeLaunch,
  isProductionMode,
}