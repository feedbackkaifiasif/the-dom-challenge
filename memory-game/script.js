const score = document.querySelector('#curr-score')
const highScore = document.querySelector('#high-score')
const boxWrapper = document.querySelector('.box__wrapper')
const boxList = document.querySelectorAll('.box')
const startBtn = document.querySelector('#start')

let blinkedBoxNumber = []
let boxesUserClicked = []
let isBlinkingDone = true

highScore.textContent = +localStorage.getItem('memory__game-high__score') || 0

const blinkBox = i => {
  setTimeout(() => {
    const randomInt = Math.floor(Math.random()*5)
    blinkedBoxNumber.push(randomInt+1)
    boxList[randomInt].classList.add('blink')
    setTimeout(() => {
      boxList[randomInt].classList.remove('blink')
    }, 500)
  }, 1000 * i)
  // setting a difference of 500ms between each add and remove ( blink )
}

const blinkBoxes = (num) => {
  isBlinkingDone = false
  for(let i = 0; i < num; i++) {
    blinkBox(i)
  }
  setTimeout(() => {
    isBlinkingDone = true
  }, 1000 * num)
}

const compare = () => {
  // @return isErrorFound Boolean
  const len = boxesUserClicked.length
  if(boxesUserClicked[len-1] != blinkedBoxNumber[len-1]) return true
  return false
}

const shakeBoxWrapper = () => {
  boxWrapper.classList.add('shake')
  setTimeout(() => {
    boxWrapper.classList.remove('shake')
  }, 800)
}

const resetGame = () => {
  boxesUserClicked = []
  blinkedBoxNumber = []
  boxList.forEach(box => box.removeEventListener('click', handleClickOnBoxes))
  startBtn.classList.remove('disabled')

  score.textContent = 0
}

const updateHighScore = () => {
  highScore.textContent = score.textContent
  localStorage.setItem('memory__game-high__score', highScore.textContent)
}

const validateRules = () => {
  const isErrorFound = (() => compare())()
  if(isErrorFound) {
      shakeBoxWrapper()
      resetGame()

      return 0
  } else {
    if(boxesUserClicked.length === blinkedBoxNumber.length) {
      score.textContent = +score.textContent + 1
      boxesUserClicked = []
      blinkedBoxNumber = []

      if(+score.textContent > +highScore.textContent) updateHighScore()

      setTimeout(() => {
        blinkBoxes(+score.textContent + 1)
      }, 1000)
    } 
    // else wait for next user input till an error or level crossed
  }
  return 1;
}

const handleClickOnBoxes = (e) => {
  if(!isBlinkingDone) return
  const [ , num ] = e.target.id.split('-')
  boxesUserClicked.push(num)
  const isValid = validateRules()

  if(isValid) {
    e.target.classList.add('clicked-success')
  } else {
    e.target.classList.add('clicked-failed')
  }

  setTimeout(() => {
    e.target.classList.remove('clicked-success')
    e.target.classList.remove('clicked-failed')
  }, 500)
}

const getUserInput = () => {
  boxList.forEach(box => {
    box.addEventListener('click', handleClickOnBoxes)
  })
}

const startGame = () => {
  if(startBtn.classList.contains('disabled')) return
  startBtn.classList.add('disabled')
  blinkBoxes(1)
  getUserInput()
}

startBtn.addEventListener('click', () => startGame())