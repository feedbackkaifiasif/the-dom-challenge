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
const isVisited = new Array(conflictingData.length).fill(0) 

const extractTime = (time) => {
  const [hourStart, minuteStart] = time.split(':')
  return (+hourStart + (+minuteStart / 60))
}

const createAdjencyList = (data) => {
  const list = [...Array(data.length)].map(e => Array(0))
  for(let i = 0; i < data.length; i++) {
    let s1 = extractTime(data[i].startTime)
    let e1 = extractTime(data[i].endTime)
    for(let j = i+1; j < data.length; j++) {
      let s2 = extractTime(data[j].startTime)
      let e2 = extractTime(data[j].endTime)
      if(( s1 >= s2 && s1 <= e2 ) || ( s2 >= s1 && s2 <= e1)) {
        list[i].push(j)
        list[j].push(i)
      }
    }
  }
  return list
}

const graph = createAdjencyList(conflictingData)
 
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

function Task({startTime, endTime, color, title}, zIndex, width = 0) {
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
  task.style.setProperty('--width', width+1)
  
  task.style.zIndex = zIndex + 1
  return task
}

const addNonConflictingTaskToCalender = () => {
  nonConflictingData.forEach((data, i) => {
    const task = new Task(data, i)
    calender.appendChild(task)
  })
}

const getConflictingTasks = (index) => {
  isVisited[index] = 1
  let arr = []
  for(let j = 0; j < graph[index].length; j++) {
    if(!isVisited[graph[index][j]])
    arr = getConflictingTasks(graph[index][j])
  }
  return [...arr, index]
}

const addConflictingTaskToCalender = () => {
  for(let i = 0; i < graph.length; i++) {
    if(!isVisited[i]) {
      const arr = getConflictingTasks(i)
      const arrSorted = arr.sort((a,b) => {
        const s1 = extractTime(conflictingData[a].startTime)
        const s2 = extractTime(conflictingData[b].startTime)

        return s1 - s2;
      })
      arrSorted.forEach((e, i) => {
        const task = new Task(conflictingData[e], i, i)
        calender.appendChild(task)
      })
    }
  }
}

// addNonConflictingTaskToCalender()
addConflictingTaskToCalender()
addTimeBoxesToCalender()