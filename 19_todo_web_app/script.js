document.addEventListener('DOMContentLoaded', () => {
    
    // DOM Elements
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clearBtn = document.getElementById('clear-completed');
    const taskCounter = document.getElementById('task-counter');
    const emptyState = document.getElementById('empty-state');
    
    // Modal Elements
    const editModal = document.getElementById('edit-modal');
    const editInput = document.getElementById('edit-input');
    const saveEditBtn = document.getElementById('save-edit');
    const cancelEditBtn = document.getElementById('cancel-edit');

    // State
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';
    let currentEditId = null;

    // Initialize
    renderTodos();

    // Event Listeners
    todoForm.addEventListener('submit', addTask);
    todoList.addEventListener('click', handleTaskAction);
    searchInput.addEventListener('input', renderTodos);
    clearBtn.addEventListener('click', clearCompleted);
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderTodos();
        });
    });

    cancelEditBtn.addEventListener('click', closeEditModal);
    saveEditBtn.addEventListener('click', saveEdit);

    // Core Functions
    function saveToLocal() {
        localStorage.setItem('todos', JSON.stringify(todos));
        updateCounter();
    }

    function updateCounter() {
        const activeTasks = todos.filter(t => !t.completed).length;
        taskCounter.innerText = activeTasks;
        
        if (todos.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }

    function addTask(e) {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            const newTodo = {
                id: Date.now().toString(),
                text: text,
                completed: false
            };
            todos.push(newTodo);
            saveToLocal();
            todoInput.value = '';
            renderTodos();
        }
    }

    function handleTaskAction(e) {
        const target = e.target;
        const item = target.closest('.todo-item');
        if (!item) return;
        
        const id = item.getAttribute('data-id');

        // Toggle Complete
        if (target.type === 'checkbox') {
            const todo = todos.find(t => t.id === id);
            todo.completed = target.checked;
            saveToLocal();
            renderTodos();
        }

        // Delete Task
        if (target.closest('.delete-btn')) {
            todos = todos.filter(t => t.id !== id);
            saveToLocal();
            renderTodos();
        }

        // Edit Task
        if (target.closest('.edit-btn')) {
            const todo = todos.find(t => t.id === id);
            currentEditId = id;
            editInput.value = todo.text;
            editModal.classList.add('active');
            editInput.focus();
        }
    }

    function clearCompleted() {
        todos = todos.filter(t => !t.completed);
        saveToLocal();
        renderTodos();
    }

    // Modal Functions
    function closeEditModal() {
        editModal.classList.remove('active');
        currentEditId = null;
    }

    function saveEdit() {
        const newText = editInput.value.trim();
        if (newText && currentEditId) {
            const todo = todos.find(t => t.id === currentEditId);
            todo.text = newText;
            saveToLocal();
            closeEditModal();
            renderTodos();
        }
    }

    // Render Logic
    function renderTodos() {
        const searchText = searchInput.value.toLowerCase();
        
        // Clear list
        todoList.innerHTML = '';
        
        // Filter array based on state and search
        let filteredTodos = todos.filter(todo => {
            const matchesSearch = todo.text.toLowerCase().includes(searchText);
            
            if (currentFilter === 'active') return matchesSearch && !todo.completed;
            if (currentFilter === 'completed') return matchesSearch && todo.completed;
            return matchesSearch;
        });

        // Toggle empty state based on search/filter results
        if(filteredTodos.length === 0 && todos.length > 0) {
            emptyState.classList.remove('hidden');
            emptyState.querySelector('p').innerText = "No matching tasks.";
        } else if (todos.length === 0) {
            emptyState.classList.remove('hidden');
            emptyState.querySelector('p').innerText = "No tasks found.";
        } else {
            emptyState.classList.add('hidden');
        }

        // Generate DOM
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.setAttribute('data-id', todo.id);

            li.innerHTML = `
                <label class="checkbox-container">
                    <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                    <span class="checkmark"></span>
                </label>
                <span class="task-text">${todo.text}</span>
                <div class="actions">
                    <button class="action-btn edit-btn" aria-label="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="action-btn delete-btn" aria-label="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            todoList.appendChild(li);
        });

        updateCounter();
    }
});
