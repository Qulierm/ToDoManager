// Получаем ссылки на элементы DOM
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task");
const taskList = document.getElementById("task-list");

// Событие, которое происходит при загрузке страницы
window.addEventListener("load", () => {
  // Получаем список задач из localStorage и отображаем его
  const tasks = getTasks();
  displayTasks(tasks);
});

// Обработчик события отправки формы
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Получаем текст задачи из поля ввода
  const taskText = taskInput.value;

  // Создаем новый объект задачи
  const task = {
    id: Date.now().toString(),
    text: taskText,
    completed: false,
  };

  // Добавляем задачу в список задач
  addTask(task);

  // Очищаем поле ввода
  taskInput.value = "";
});

// Обработчик события клика на кнопку удаления задачи
taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    // Получаем ID задачи из атрибута data-id
    const taskId = event.target.getAttribute("data-id");

    // Удаляем задачу из списка задач
    deleteTask(taskId);
  }
});

// Обработик события клика на кнопку выполнения задачи
taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("complete")) {
    // Получаем ID задачи из атрибута data-id
    const taskId = event.target.getAttribute("data-id");

    // Изменяем статус задачи на выполненную
    toggleTaskCompletion(taskId);
  }
});

// Функция для получения списка задач из localStorage
function getTasks() {
  const tasksString = localStorage.getItem("tasks");
  if (tasksString) {
    return JSON.parse(tasksString);
  } else {
    return [];
  }
}

// Функция для сохранения списка задач в localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Функция для добавления задачи в список задач
function addTask(task) {
  // Получаем список задач из localStorage
  const tasks = getTasks();

  // Добавляем новую задачу в список
  tasks.push(task);

  // Сохраняем список задач в localStorage
  saveTasks(tasks);

  // Отображаем обновленный список задач
  displayTasks(tasks);
}

// Функция для удаления задачи из списка задач
function deleteTask(taskId) {
  // Получаем список задач из localStorage
  const tasks = getTasks();

  // Ищем задачу с заданным ID
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  // Если задача найдена, удаляем ее из списка
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);

    // Сохраняем список задач в localStorage
    saveTasks(tasks);

    // Отображаем обновленный список задач
    displayTasks(tasks);
  }
}

// Функция для изменения статуса выполнения задачи
function toggleTaskCompletion(taskId) {
  // Получаем список задач из localStorage
  const tasks = getTasks();

  // Ищем задачу с заданным ID
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  // Если задача найдена, изменяем ее статус выполнения
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;

    // Сохраняем список задач в localStorage
    saveTasks(tasks);

    // Отображаем обновленный список задач
    displayTasks(tasks);
  }
}

// Функция для отображения списка задач
function displayTasks(tasks) {
  // Очищаем список задач
  taskList.innerHTML = "";

  // Добавляем каждую задачу в список
  for (const task of tasks) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    if (task.completed) {
      taskItem.classList.add("completed");
    }

    const taskLabel = document.createElement("label");
    taskLabel.innerText = task.text;

    const taskActions = document.createElement("div");
    taskActions.classList.add("actions");

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.setAttribute("data-id", task.id);
    completeButton.innerText = task.completed ? "Undo" : "Done";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.setAttribute("data-id", task.id);
    deleteButton.innerText = "Delete";

    taskActions.appendChild(completeButton);
    taskActions.appendChild(deleteButton);

    taskItem.appendChild(taskLabel);
    taskItem.appendChild(taskActions);

    taskList.appendChild(taskItem);
  }
}