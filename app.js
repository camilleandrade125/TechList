const nameInput = document.getElementById('nameInput');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');


document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        nameInput.value = userName;
    }
    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task));
});


function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = { text: taskText, done: false };
        addTaskToList(task);
        saveTasksToLocalStorage();
        taskInput.value = '';
    }
}


function addTaskToList(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.style.textDecoration = task.done ? 'line-through' : 'none';
    li.addEventListener('click', () => toggleTaskStatus(li, task));
    taskList.appendChild(li);
}


function toggleTaskStatus(li, task) {
    task.done = !task.done;
    li.style.textDecoration = task.done ? 'line-through' : 'none';
    saveTasksToLocalStorage();
}


function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.children).map(li => ({
        text: li.textContent,
        done: li.style.textDecoration === 'line-through'
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


nameInput.addEventListener('blur', () => {
    const userName = nameInput.value.trim();
    localStorage.setItem('userName', userName);
});


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado com sucesso:', registration);
            })
            .catch(error => {
                console.error('Erro ao registrar Service Worker:', error);
            });
    });
}
