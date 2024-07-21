// Setup Event Listener for Page Load
document.addEventListener("DOMContentLoaded", function() {
  // Select DOM Elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load Tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));
  }

  // Create the addTask Function
  function addTask(taskText, save = true) {
    // Create a new li element
    const taskListItem = document.createElement("li");
    taskListItem.textContent = taskText;

    // Create a new button element for removing the task
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";

    // Assign an onclick event to the remove button
    removeButton.onclick = function() {
      taskList.removeChild(taskListItem);
      removeTaskFromStorage(taskText);
    };

    // Append the remove button to the li element
    taskListItem.appendChild(removeButton);

    // Append the li element to the task list
    taskList.appendChild(taskListItem);

    // Save task to Local Storage if save is true
    if (save) {
      saveTaskToStorage(taskText);
    }
  }

  // Save task to Local Storage
  function saveTaskToStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
  }

  // Remove task from Local Storage
  function removeTaskFromStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const index = storedTasks.indexOf(taskText);
    if (index !== -1) {
      storedTasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
  }

  // Attach Event Listeners
  addButton.addEventListener("click", function() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      taskInput.value = "";
    }
  });

  taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";
      }
    }
  });

  // Load tasks from Local Storage
  loadTasks();
});
