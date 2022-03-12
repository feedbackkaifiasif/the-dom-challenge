const grid = document.querySelector('.grid')
let GRIDMATRIX = []

const resetGridMatrix = () => {
  GRIDMATRIX = []
  for(let i = 0; i < 8; i++) {
    let row = []
    for(let j = 0; j < 8; j++) {
      i+j & 1 ? row.push(1) : row.push(0)
      // this creates the black-white pattern
    }
    GRIDMATRIX.push(row)
  }
}

const recurse = (i, j, incrementI, incrementJ) => {
  if(i < 0 || i > 7 || j < 0 || j > 7) return
  GRIDMATRIX[i][j] = 2
  paintGrid()
  setTimeout(() => {
    recurse(+i + incrementI, +j + incrementJ, incrementI, incrementJ)
    // this time out is to create ripple animation effect
  }, 200)
}
const updateGridMatrix = (i, j) => {
  recurse(i, j, 1, 1)
  recurse(i, j, -1, -1)
  recurse(i, j, 1, -1)
  recurse(i, j, -1, 1)
}

const addCellsToGrid = () => {
  GRIDMATRIX.forEach((row, i) => {
    row.forEach((cell, j) => {
      const gridItem = document.createElement('span')
      gridItem.className = 'grid-item'
      gridItem.id = `num-${i}-${j}` // we can destructure i and j from id later
      grid.appendChild(gridItem)
    })
  })
}
const paintGrid = () => {
  GRIDMATRIX.forEach((row, i) => {
    row.forEach((val, j) => {
      let className;
      if(val === 0) className = 'white'
      if(val === 1) className = 'black'
      if(val === 2) className = 'highlight'
      const item = document.querySelector(`#num-${i}-${j}`)
      item.className = `grid-item ${className}`
    })
  })
}

const addClickEventToCells = () => {
  const itemList = document.querySelectorAll('.grid-item');
  itemList.forEach(item => {
    item.addEventListener('click', () => {
      [ , i, j] = item.id.split('-')
      resetGridMatrix()
      updateGridMatrix(i, j)
    })
  })
}

resetGridMatrix()
addCellsToGrid()
paintGrid()
addClickEventToCells()