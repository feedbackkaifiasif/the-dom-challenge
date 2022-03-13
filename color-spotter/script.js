const grid = document.querySelector('.grid')
const score = document.querySelector('#score')
let order = 4

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360)
  return ({
    cellColor : `hsl(${hue}, 40%, 50%)`,
    oddCellColor : `hsl(${hue}, 40%, 70%)`,
  })
}

function CellItem(isOdd, colors){
  const { cellColor, oddCellColor } = colors

  const cell = document.createElement('span')
  cell.className = 'grid-item'
  cell.style.background = isOdd ? oddCellColor : cellColor
  cell.id = isOdd ? 'odd' : 'normal'

  return cell
}

const addCellsToGrid = () => {
  const randomCellIndex = Math.floor(Math.random() * (order*order))
  const colors = getRandomColor()
  grid.style.setProperty('--val', order)
  for(let i = 0; i < order*order; i++) {
    grid.appendChild(new CellItem(randomCellIndex === i, colors))
  }
}

const handleClick = e => {
  if(e.target.id == 'odd') {
    score.textContent = +score.textContent + 1
    order++
    grid.innerHTML = ''
    addCellsToGrid()
    addClickEventToCells()
  } else {
    grid.classList.add('shake')
    setTimeout(() => {
      grid.classList.remove('shake')
    }, 500)
  }
}
const addClickEventToCells = () => {
  const itemList = document.querySelectorAll('.grid-item')
  itemList.forEach(item => {
    item.addEventListener('click', handleClick)
  })
}

addCellsToGrid()
addClickEventToCells()