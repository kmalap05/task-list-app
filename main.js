const form = document.querySelector(".task-form");
const input = document.querySelector(".task-input");
const taskList = document.querySelector(".task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const handleFormSubmit = (e) => {
	e.preventDefault();
	const taskText = input.value.trim();
	if (taskText === "") return;
	addTask(taskText);
	input.value = "";
};

form.addEventListener("submit", handleFormSubmit);

const addTask = (taskText) => {
	const task = {
		id: Date.now(),
		text: taskText,
		completed: false,
	};
	tasks.push(task);
	updateLocalStorage();
	renderTasks();
};

const deleteTask = (id) => {
	tasks = tasks.filter((task) => task.id !== id);
	updateLocalStorage();
	renderTasks();
};

const toggleComplete = (id) => {
	tasks = tasks.map((task) => {
		if (task.id === id) {
			return { ...task, completed: !task.completed };
		}
		return task;
	});
	updateLocalStorage();
	renderTasks();
};

const renderTasks = () => {
	taskList.innerHTML = "";

	for (const task of tasks) {
		const li = document.createElement("li");
		li.classList.add("task-item");
		if (task.completed) {
			li.classList.add("completed");
		}

		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = task.completed;
		checkbox.onchange = () => toggleComplete(task.id);

		const textSpan = document.createElement("span");
		textSpan.textContent = task.text;

		const deleteBtn = document.createElement("button");
		deleteBtn.type = "button";
		deleteBtn.textContent = "Delete";
		deleteBtn.onclick = () => deleteTask(task.id);

		li.appendChild(checkbox);
		li.appendChild(textSpan);
		li.appendChild(deleteBtn);
		taskList.appendChild(li);
	}
};

const updateLocalStorage = () => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
};

renderTasks();
