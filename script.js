const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const message = document.getElementById("message");

let tasks = [];
let nextId = 1;

taskForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const description = taskInput.value.trim();

  if (description === "") {
    message.textContent = "Escribe una tarea antes de agregarla.";
    taskInput.focus();
    return;
  }

  tasks.push({ id: nextId++, text: description, completed: false });
  taskInput.value = "";
  message.textContent = "";
  renderTasks();
  taskInput.focus();
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function(task) {
    const item = document.createElement("li");
    item.className = task.completed ? "task-item done" : "task-item";

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    if (!task.completed) {
      const completeButton = document.createElement("button");
      completeButton.className = "complete-btn";
      completeButton.textContent = "Completar";
      completeButton.addEventListener("click", function() {
        task.completed = true;
        renderTasks();
      });
      actions.appendChild(completeButton);
    }

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", function() {
      tasks = tasks.filter(function(currentTask) {
        return currentTask.id !== task.id;
      });
      renderTasks();
    });

    actions.appendChild(deleteButton);
    item.appendChild(text);
    item.appendChild(actions);
    taskList.appendChild(item);
  });

  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById("total").textContent = total;
  document.getElementById("completed").textContent = completed;
  document.getElementById("pending").textContent = pending;
  document.getElementById("percentage").textContent = percentage + "%";
  document.getElementById("progressBar").style.width = percentage + "%";
  emptyState.style.display = total === 0 ? "block" : "none";
}

renderTasks();
