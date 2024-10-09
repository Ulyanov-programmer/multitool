const
  navigation = document.querySelector('#main-navigation'),
  activeLink = navigation.querySelector('a.active'),
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    .test(navigator.userAgent)

activeLink.scrollIntoView({
  block: 'center', inline: 'center'
})

let startY, startX,
  scrollTop, scrollLeft


if (isMobile) {
  addPointerUpListenerForMobiles()
}

navigation.addEventListener('pointerdown', event => {
  addActive()

  startY = event.pageY - navigation.offsetTop
  startX = event.pageX - navigation.offsetLeft
  scrollTop = navigation.scrollTop
  scrollLeft = navigation.scrollLeft

  document.addEventListener('pointermove', move)

  if (!isMobile) {
    document.addEventListener('pointerup', stopListening, { once: true, })
  }
})


function move(event) {
  navigation.removeEventListener('pointerleave', removeActive)

  const y = event.pageY - navigation.offsetTop
  const x = event.pageX - navigation.offsetLeft

  const walkY = (y - startY) * 1
  const walkX = (x - startX) * 1

  navigation.scrollTop = scrollTop - walkY
  navigation.scrollLeft = scrollLeft - walkX
}
function addActive() {
  navigation.classList.add('active')
}
function removeActive() {
  navigation.classList.remove('active')
}
function stopListening() {
  document.removeEventListener('pointermove', move)

  navigation.addEventListener('pointerleave', removeActive, { once: true, })
}
function addPointerUpListenerForMobiles() {
  document.addEventListener('pointerdown', event => {
    if (!event.target.closest('#main-navigation')) {
      navigation.classList.remove('active')

      document.removeEventListener('pointermove', move)
    }
  })
}