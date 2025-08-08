let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    ['todo', 'in-progress', 'done'].forEach(status => {
        const container = document.getElementById(`${status}-tasks`);
        container.innerHTML = '';
        tasks.filter(task => task.status === status).forEach(task => {
            const div = document.createElement('div');
            div.className = 'task';
            div.draggable = true;
            div.innerHTML = `
                <span>${task.text}</span>
                <div style="float: right;">
                    <button onclick="editTask('${task.id}')"><i class='fas fa-edit'></i></button>
                    <button onclick="deleteTask('${task.id}')"><i class='fas fa-trash'></i></button>
                </div>
            `;
            div.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text/plain', task.id);
            });
            container.appendChild(div);
        });
    });
}

function openModal(status, editingId = null) {
    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('task-status').value = status;
    document.getElementById('task-input').value = '';
    document.getElementById('task-input').dataset.editingId = editingId || '';
    document.getElementById('task-input').focus();
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
    document.getElementById('task-input').dataset.editingId = '';
}

function addTask() {
    const text = document.getElementById('task-input').value.trim();
    const status = document.getElementById('task-status').value;
    const editingId = document.getElementById('task-input').dataset.editingId;

    if (!text) return;

    if (editingId) {
        const task = tasks.find(t => t.id === editingId);
        task.text = text;
    } else {
        const newTask = {
            id: Date.now().toString(),
            text,
            status
        };
        tasks.push(newTask);
    }

    saveTasks();
    renderTasks();
    closeModal();
}

document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('modal');
    const isModalOpen = !modal.classList.contains('hidden');
    if (e.key === 'Enter' && isModalOpen) {
        addTask();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    document.getElementById('task-input').value = task.text;
    openModal(task.status, id);
}

document.querySelectorAll('.task-container').forEach(container => {
    container.addEventListener('dragover', e => e.preventDefault());
    container.addEventListener('drop', e => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const task = tasks.find(t => t.id === id);
        const status = container.parentElement.getAttribute('data-status');
        task.status = status;
        saveTasks();
        renderTasks();
    });
});

renderTasks();
