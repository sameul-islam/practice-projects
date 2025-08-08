const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// This ensures that the DOM is fully loaded before any other code runs.

window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task));
});

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// This function runs when the Add button is clicked or the Enter key is pressed.

function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    const task = {
      id: Date.now(),
      text,
      completed: false
    };
    addTaskToDOM(task);
    saveTask(task);
    taskInput.value = '';
  }
}

// This function displays the input task in a list format and allows it to be deleted.
// Inside this function, a list item is created along with a Delete button and a Complete button.
// The Delete button is used to permanently remove the task from the list.
// The Complete button is used to temporarily mark the task as done by striking it through and fading it.
// In short, clicking the Complete button will make the task appear crossed out and dimmed.


function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.setAttribute('data-id', task.id);
  const textSpan = document.createElement('span');
  textSpan.textContent = task.text;
  textSpan.className = 'task-text';
  if (task.completed) {
    textSpan.classList.add('completed');
  }

  const btnGroup = document.createElement('div');
  btnGroup.className = 'btn-group';

  const completeBtn = document.createElement('button');
  completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
  completeBtn.className = 'complete-btn';
  completeBtn.addEventListener('click', () => {
    task.completed = !task.completed;
    updateTask(task);
    textSpan.classList.toggle('completed');
    completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    deleteTask(task.id);
  });

  btnGroup.appendChild(completeBtn);
  btnGroup.appendChild(deleteBtn);

  li.appendChild(textSpan);
  li.appendChild(btnGroup);
  taskList.appendChild(li);
}

// This function is created to save the tasks in local storage so that they are not lost when the page is reloaded.

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// This function updates the task in local storage whenever any changes are made, such as marking it complete or incomplete, so that the current state is saved properly.

function updateTask(updatedTask) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const newTasks = tasks.map(task =>
    task.id === updatedTask.id ? updatedTask : task
  );
  localStorage.setItem('tasks', JSON.stringify(newTasks));
}

// This function is triggered when the delete button is clicked. It is designed to completely remove the selected task from the list and from local storage.

function deleteTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
