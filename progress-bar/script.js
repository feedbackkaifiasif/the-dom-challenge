const progress = document.querySelector('.progress__bar')
const run = document.querySelector('#run')
const queueValText = document.querySelector('.queue-value')
let QUEUEVAL = 0
let isAnimationOver = true

const animate = () => {
  isAnimationOver = false
  if(QUEUEVAL == 0) {
    isAnimationOver = true
    return
  }
  progress.classList.add('animate')
  setTimeout(() => {
    progress.classList.remove('animate')
    QUEUEVAL--
    queueValText.textContent = QUEUEVAL != 0 ? QUEUEVAL : '' 
  }, 4000)
  setTimeout(() => {
    animate()
  }, 4100)
}
const handleClick = () => {
  QUEUEVAL++
  queueValText.textContent = QUEUEVAL
  isAnimationOver ? animate() : ''
}
run.addEventListener('click', handleClick)