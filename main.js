const form = document.querySelector(".task-form");
const input = document.querySelector(".task-input");
const taskList = document.querySelector(".task-list");
const taskAddBtn = document.querySelector(".task-add-btn");

let tasks = localStorage.getItem("tasks")
	? JSON.parse(localStorage.getItem("tasks"))
	: [];

const handleFormSubmit = (e) => {
	e.preventDefault();
	const taskText = input.value.trim();
	if (taskText === "") return;
	addTask(taskText);
	input.value = "";
	taskAddBtn.disabled = true;
};

form.addEventListener("submit", handleFormSubmit);

input.addEventListener("input", () => {
	taskAddBtn.disabled = input.value.trim() === "";
});

const addTask = (taskText) => {
	const task = {
		id: Date.now(),
		text: taskText,
		completed: false,
	};
	tasks.push(task);
	updateLocalStorage();
	addTaskToDOM(task);
};

const deleteTask = (id) => {
	tasks = tasks.filter((task) => task.id !== id);
	updateLocalStorage();
	document.getElementById(id).remove();
};

const toggleComplete = (id) => {
	tasks = tasks.map((task) => {
		if (task.id === id) {
			task.completed = !task.completed;
			const taskItem = document.getElementById(id);
			taskItem.classList.toggle("completed");
			taskItem.querySelector("input[type='checkbox']").checked = task.completed;
		}
		return task;
	});
	updateLocalStorage();
};

const addTaskToDOM = (task) => {
	const li = document.createElement("li");
	li.classList.add("task-item");
	li.id = task.id;
	if (task.completed) {
		li.classList.add("completed");
	}

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.checked = task.completed;

	const textSpan = document.createElement("span");
	textSpan.textContent = task.text;

	const deleteBtn = document.createElement("button");
	deleteBtn.type = "button";
	deleteBtn.textContent = "Delete";

	li.appendChild(checkbox);
	li.appendChild(textSpan);
	li.appendChild(deleteBtn);
	taskList.appendChild(li);
};

taskList.addEventListener("click", (e) => {
	if (e.target.tagName === "BUTTON") {
		const id = Number.parseInt(e.target.parentElement.id, 10);
		deleteTask(id);
	} else if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
		const id = Number.parseInt(e.target.parentElement.id, 10);
		toggleComplete(id);
	}
});

const renderTasks = () => {
	taskList.innerHTML = "";
	tasks.forEach(addTaskToDOM);
};

const updateLocalStorage = () => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
};

document.addEventListener("DOMContentLoaded", () => {
	renderTasks();
	taskAddBtn.disabled = true;
});
