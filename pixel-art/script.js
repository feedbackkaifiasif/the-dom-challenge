const grid = document.querySelector('.grid')
let CURRENTCOLOR = null
let isMouseClicked = false

function GridItem(className, bgcolor) {
  const gridItem = document.createElement('span')
  gridItem.className = `gridItem ${className}`
  gridItem.style.background = bgcolor
  return gridItem
}

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 100%, 75%)`
}

const addPaintingArea = () => {
  for(let i = 0; i < 100; i++) {
    grid.appendChild(new GridItem('painting-block', '#fbfffd'))
  }
}
const addLastRow = () => {
  // this row contains colors
  for(let i = 0; i < 10; i++) {
   grid.appendChild(new GridItem('paint-block last-row', getRandomColor()))
  }
}

const addEventToPaintBlocks = () => {
  const paintBlockList = document.querySelectorAll('.paint-block')
  paintBlockList.forEach(block => {
    block.addEventListener('click', e => {
      CURRENTCOLOR = e.target.style.backgroundColor
    })
  })
}

const handleMouseDown = (e) => {
  if(CURRENTCOLOR) e.target.style.background = CURRENTCOLOR
  isMouseClicked = true
}
const handleMouseMove = e => {
  if(isMouseClicked && CURRENTCOLOR) e.target.style.background = CURRENTCOLOR
}
const handleMouseUp = e => {
  isMouseClicked = false
}

const addEventToPaintingBlocks = () => {
  const paintingBlockList = document.querySelectorAll('.painting-block')
  paintingBlockList.forEach(block => {
    block.addEventListener('mousedown', handleMouseDown)
    block.addEventListener('mousemove', handleMouseMove)
    block.addEventListener('mouseup', handleMouseUp)

    block.addEventListener('touchstart', handleMouseDown)
    block.addEventListener('touchend', handleMouseUp)
  })
}

const paintGridWithItems = () => {
  addPaintingArea()
  addLastRow()
  addEventToPaintBlocks()
  addEventToPaintingBlocks()
  setTimeout(() => {
    grid.addEventListener('touchmove', handleMouseMove)
  })
}
paintGridWithItems()