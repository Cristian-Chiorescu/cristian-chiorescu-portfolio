const input = document.getElementById("input")
const form = document.getElementById("input-form")
const outerContainer= document.getElementById("outer-container")
const divider = document.getElementById("divider")
const taskList = document.getElementById("task-list")
document.getElementById('current-year').textContent = new Date().getFullYear();

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

const processTask = (taskText) =>{
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }
    tasks.push(newTask)
    saveTasks()
}

const renderTasks = () =>{
    taskList.innerHTML=""
    tasks.forEach((obj)=>{
    const liElement = document.createElement("li")
    liElement.setAttribute("class", "container frosted task-item")
    liElement.dataset.id = obj.id
  

    const liCheckbox = document.createElement("input")
    liCheckbox.setAttribute("type", "checkbox")
    liCheckbox.setAttribute("class", "checkbox")
    liCheckbox.checked = obj.completed

    if(obj.completed){
        liElement.classList.add("completed")
    }
    
    const liSpan = document.createElement("span")
    liSpan.textContent = obj.text
    
    const liButton = document.createElement("button")
    liButton.setAttribute("class", "delete-button")
    liButton.textContent = "X"
    
    liElement.appendChild(liCheckbox)
    liElement.appendChild(liSpan)
    liElement.appendChild(liButton)

    taskList.appendChild(liElement)
    })
}

const renderDivider = () =>{

if(tasks.length >= 1){
    divider.removeAttribute("hidden")
}
else{
    divider.setAttribute("hidden", "")
}
}


const savedTasksJSON = localStorage.getItem("tasks")
let tasks = JSON.parse(savedTasksJSON) ?? []
renderTasks()
renderDivider()






form.addEventListener("submit",(event)=>{
    event.preventDefault()
    if(input.value.trim() === ""){
        return
    }
    else{
        processTask(input.value.trim())
    }
    renderTasks()
    renderDivider()
})


taskList.addEventListener("click", (event)=>{
    if(event.target.classList.contains("delete-button")){
        const liElement = event.target.closest("li")
        const taskIdToDelete = Number(liElement.dataset.id)
        tasks = tasks.filter(task => task.id !== taskIdToDelete)
        saveTasks()
        renderTasks()
        renderDivider()
    }
   if(event.target.classList.contains("checkbox")){
        const liElement = event.target.closest("li")
        const taskIdToComplete = Number(liElement.dataset.id)
        const taskToToggle = tasks.find(task => task.id === taskIdToComplete)
        if(taskToToggle){
            taskToToggle.completed = !taskToToggle.completed
        }
        saveTasks()
        renderTasks()
        renderDivider()
    }
})
