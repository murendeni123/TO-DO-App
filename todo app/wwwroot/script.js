// Global variables
let currentFilter = 'all';
let tasks = [];
const API_BASE_URL = window.location.origin + '/api/todo';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    setupEventListeners();
    setupFilterButtons();
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('addTaskForm').addEventListener('submit', handleAddTask);
    document.getElementById('editTaskForm').addEventListener('submit', handleEditTask);
    document.querySelector('.close').addEventListener('click', closeEditModal);
}

// Setup filter buttons
function setupFilterButtons() {
    document.querySelectorAll('.btn-filter').forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            setActiveFilter(filter);
        });
    });
}

// Set active filter
function setActiveFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    renderTasks();
}

// Load all tasks from API
async function loadTasks() {
    try {
        const response = await fetch(API_BASE_URL);
        if (response.ok) {
            tasks = await response.json();
            renderTasks();
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

// Render tasks based on current filter
function renderTasks() {
    const filteredTasks = filterTasks(tasks, currentFilter);
    const taskList = document.getElementById('taskList');
    const noTasks = document.getElementById('noTasks');
    
    if (filteredTasks.length === 0) {
        taskList.style.display = 'none';
        noTasks.style.display = 'block';
        return;
    }
    
    taskList.style.display = 'block';
    noTasks.style.display = 'none';
    taskList.innerHTML = filteredTasks.map(task => createTaskHTML(task)).join('');
}

// Filter tasks
function filterTasks(tasks, filter) {
    switch (filter) {
        case 'pending': return tasks.filter(task => !task.isCompleted);
        case 'completed': return tasks.filter(task => task.isCompleted);
        default: return tasks;
    }
}

// Create HTML for a single task
function createTaskHTML(task) {
    const statusClass = task.isCompleted ? 'completed' : 'pending';
    const statusText = task.isCompleted ? 'Completed' : 'Pending';
    
    return `
        <div class="task-item ${statusClass}" data-id="${task.id}">
            <div class="task-header">
                <div>
                    <div class="task-title">${escapeHtml(task.title)}</div>
                    ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
                </div>
                <span class="task-status ${statusClass}">${statusText}</span>
            </div>
            <div class="task-meta">
                Created: ${new Date(task.createdAt).toLocaleDateString()}
            </div>
            <div class="task-actions">
                <button class="btn btn-edit" onclick="openEditModal(${task.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        </div>
    `;
}

// Handle add task
async function handleAddTask(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const taskData = {
        title: formData.get('title').trim(),
        description: formData.get('description').trim()
    };
    
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
        
        if (response.ok) {
            const newTask = await response.json();
            tasks.push(newTask);
            renderTasks();
            event.target.reset();
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

// Open edit modal
function openEditModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    document.getElementById('editTaskId').value = task.id;
    document.getElementById('editTaskTitle').value = task.title;
    document.getElementById('editTaskDescription').value = task.description;
    document.getElementById('editTaskCompleted').checked = task.isCompleted;
    document.getElementById('editModal').style.display = 'block';
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Handle edit task
async function handleEditTask(event) {
    event.preventDefault();
    const taskId = parseInt(document.getElementById('editTaskId').value);
    const taskData = {
        title: document.getElementById('editTaskTitle').value.trim(),
        description: document.getElementById('editTaskDescription').value.trim(),
        isCompleted: document.getElementById('editTaskCompleted').checked
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
        
        if (response.ok) {
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                tasks[taskIndex] = { ...tasks[taskIndex], ...taskData };
            }
            renderTasks();
            closeEditModal();
        }
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

// Delete task
async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/${taskId}`, { method: 'DELETE' });
        if (response.ok) {
            tasks = tasks.filter(t => t.id !== taskId);
            renderTasks();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Utility function
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
