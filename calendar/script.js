const calender = document.querySelector('#calender')

const nonConflictingData = [
  {
    startTime: "00:00",
    endTime: "01:30",
    color: "#f6be23",
    title: "#TeamDevkode",
  },
  {
    startTime: "4:30",
    endTime: "7:30",
    color: "#f6501e",
    title: "#TeamDevkode",
  },
  {
    startTime: "12:00",
    endTime: "13:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "9:00",
    endTime: "10:00",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "16:00",
    endTime: "19:00",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "20:30",
    endTime: "22:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
]
const conflictingData = [
  {
    startTime: "00:00",
    endTime: "01:30",
    color: "#f6be23",
    title: "#TeamDevkode",
  },
  {
    startTime: "3:30",
    endTime: "7:30",
    color: "#f6501e",
    title: "#TeamDevkode",
  },
  {
    startTime: "4:30",
    endTime: "8:30",
    color: "#f6501e",
    title: "#TeamDevkode",
  },
  {
    startTime: "6:30",
    endTime: "9:00",
    color: "#f6501e",
    title: "Demo",
  },
  {
    startTime: "11:00",
    endTime: "13:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "12:00",
    endTime: "13:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "9:30",
    endTime: "10:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "16:00",
    endTime: "17:00",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "15:00",
    endTime: "17:00",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "18:00",
    endTime: "19:00",
    color: "#f6501e",
    title: "#TeamDevkode",
  },
  {
    startTime: "20:30",
    endTime: "22:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "20:30",
    endTime: "22:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
]


function Time(hour, zone) {
  const timeWrapper = document.createElement('div')
  timeWrapper.classList.add('time__wrapper')
  timeWrapper.id = `time-${hour}-${zone == 'AM' ? 0 : 1}`

  const h3 = document.createElement('h3')
  h3.classList.add('time')
  h3.appendChild(document.createTextNode(`${hour}:00 ${zone}`))

  timeWrapper.appendChild(h3)

  return timeWrapper
}

const addTimeBoxesToCalender = () => {
  for(let i = 1; i < 12; i++) {
    const time = new Time(i, 'AM')
    calender.appendChild(time)
  }
  calender.appendChild(new Time(12, 'PM'))
  for(let i = 1; i < 12; i++) {
    const time = new Time(i, 'PM') 
    calender.appendChild(time)
  }
}

const extractTime = (time) => {
  const [hourStart, minuteStart] = time.split(':')
  return (+hourStart + (+minuteStart / 60))
}

function Task({startTime, endTime, color, title}, i) {
  const task = document.createElement('div')
  task.className = 'task'

  const titleH3 = document.createElement('h3')
  titleH3.className = 'title'
  titleH3.textContent = title

  const timesBox = document.createElement('div')
  timesBox.className = 'times'
  timesBox.innerHTML = `<span class="start__time">${startTime}</span>-<span class="end__time">${endTime}</span>`

  task.appendChild(titleH3)
  task.appendChild(timesBox)

  task.style.backgroundColor = color
  task.style.color = 'white'

  const top = extractTime(startTime)
  const bottom = extractTime(endTime)

  task.style.setProperty('--top', top)
  task.style.setProperty('--height', bottom - top)
  
  task.style.zIndex = i + 1
  return task
}

const addNonConflictingTaskToCalender = () => {
  nonConflictingData.forEach((data, i) => {
    const task = new Task(data, i)
    calender.appendChild(task)
  })
}

const sortFunction = (dataA, dataB) => {
  return dataA.startTime - dataB.startTime
}

const addConflictingTaskToCalender = () => {
  const sortedData = conflictingData.sort((dataA,dataB) => sortFunction(dataA, dataB))
  sortedData.forEach((data, i) => {
    const task = new Task(data, i)
    calender.appendChild(task)
  })
}

// addNonConflictingTaskToCalender()
addConflictingTaskToCalender()
addTimeBoxesToCalender()