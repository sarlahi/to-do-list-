
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");


window.addEventListener("DOMContentLoaded", loadTasks);


addTaskBtn.addEventListener("click", function() {
    const taskText = taskInput.value.trim();

  
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);

    saveTasks();
    taskInput.value = "";
});


function createTaskElement(taskText, isCompleted = false) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    if (isCompleted) {
        taskItem.classList.add("completed");
    }

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteBtn);

    
    taskSpan.addEventListener("click", function() {
        taskItem.classList.toggle("completed");
        saveTasks();
    });

    // Delete task
    deleteBtn.addEventListener("click", function() {
        taskList.removeChild(taskItem);
        saveTasks();
    });

    // Edit task
    taskSpan.addEventListener("dblclick", function() {
        const newTaskText = prompt("Edit your task:", taskSpan.textContent);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            taskSpan.textContent = newTaskText.trim();
            saveTasks();
        }
    });

    return taskItem;
}


function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll(".task-item").forEach(task => {
        const taskText = task.querySelector("span").textContent;
        const isCompleted = task.classList.contains("completed");
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        const taskItem = createTaskElement(task.text, task.completed);
        taskList.appendChild(taskItem);
    });
}
