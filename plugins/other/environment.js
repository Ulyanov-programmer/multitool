const deleteDistBeforeLaunch = process.argv.includes('--update-dist')
const isProductionMode = process.argv.includes('--production')

export {
  deleteDistBeforeLaunch,
  isProductionMode,
}