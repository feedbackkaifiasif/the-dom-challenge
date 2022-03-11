const stars = document.querySelector('#stars__wrapper')
const starsList = stars.querySelectorAll('.fa-star')
const starCountDisplay = document.querySelector('#star-count-display')
let STARCOUNT = 0

const updateStarCountDisplay = () => {
  starCountDisplay.textContent = STARCOUNT
}

const paintStar = (cnt = STARCOUNT) => {
  starsList.forEach((star, i) => {
    if(i < cnt) {
      star.classList.remove('fa-regular')
      star.classList.add('fa-solid')
    } else {
      star.classList.add('fa-regular')
      star.classList.remove('fa-solid')
    }
  })
  updateStarCountDisplay()
}

const handleStarHover = (e) => {
  [ , cnt] = e.target.id.split('-') // star-3
  paintStar(cnt) // creating a temorary count
}
const handleStarHoverEnd = (e) => {
  paintStar() // paint back to global count
}
const handleStarClick = (e) => {
  [ , cnt] = e.target.id.split('-') // star-3
  STARCOUNT = cnt
  paintStar()
}

starsList.forEach(star => {
  star.addEventListener('mouseenter', handleStarHover)
  star.addEventListener('mouseout', handleStarHoverEnd)
  star.addEventListener('click', handleStarClick)
})