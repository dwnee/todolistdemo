let list = []
let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let tabs = document.querySelectorAll(".task-tabs div")
let underLine = document.getElementById("under-line");
let taskList = []
let mode = "all"
let filterList = []

addButton.addEventListener("click",addTask)
taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

for(let i =1; i<tabs.length; i++){
  tabs[i].addEventListener("click", function(event){
    filter(event)
  })
}


function addTask(){
  let taskValue = taskInput.value;
  if (taskValue === "") return alert("할일을 입력해주세요");
  let task = {
    id: randomIDGenerate(),
    taskContent : taskInput.value,
    isComplete: false
  }
  taskList.push(task)
  taskInput.value = ""
  filter();
}

function render(){
  let resultHTML = ``
  if (mode === "all"){
    list = taskList;
  } else if (mode === "ongoing" || mode === "done"){
    list = filterList
  } 
  for(let i=0;i<list.length;i++){
    if(list[i].isComplete == true){
      resultHTML += `<div class="task task-done-bg">
          <div class="task-done">${list[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>`
    } else{
      resultHTML += `<div class="task">
          <div>${list[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>`
    }
    
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id == id){
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  // render()
  filter()
}

function deleteTask(id){
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id == id){
      taskList.splice(i,1)
      break;
    }
  }
  filter()
  render()
}

function filter(event){
  if (event) {
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top =
    event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  }
  filterList = [];
  if(mode === "all"){
    // 전체 리스트를 보여준다
    list = taskList;
    render()
  }else if(mode === "ongoing"){
    // 진행중인 아이템을 보여준다
    // task.isComplete=false
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].isComplete === false){
        filterList.push(taskList[i])
      }
    }
    render()
  }else if(mode === "done"){
    // 끝나는 케이스
    // task.isComplete=true
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].isComplete === true)
      filterList.push(taskList[i])
    }
    render()
  }
}

function randomIDGenerate(){
  return '_' + Math.random().toString(36).substr(2, 9);
}