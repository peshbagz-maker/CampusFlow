
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");

function updateTaskCount() {
    if (!taskList || !taskCount) {
        return;
    }

    const tasks = taskList.querySelectorAll("li");
    let remaining = 0;

    tasks.forEach((task) => {
        if (!task.classList.contains("completed")) {
            remaining++;
        }
    });

    taskCount.textContent =
        `${remaining} task${remaining === 1 ? "" : "s"} remaining`;
}

function initCampusFlow() {
    if (!form || !input || !taskList || !taskCount) {
        console.error("CampusFlow: required elements were not found on the page.");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const taskText = input.value.trim();

        if (taskText === "") {
            return;
        }

        const task = document.createElement("li");
        const taskName = document.createElement("span");
        const completeButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        taskName.textContent = taskText;

        completeButton.textContent = "Done";
        completeButton.type = "button";

        deleteButton.textContent = "Delete";
        deleteButton.type = "button";

        completeButton.addEventListener("click", function () {
            task.classList.toggle("completed");
            updateTaskCount();
        });

        deleteButton.addEventListener("click", function () {
            task.remove();
            updateTaskCount();
        });

        task.append(
            taskName,
            document.createTextNode(" "),
            completeButton,
            document.createTextNode(" "),
            deleteButton
        );

        taskList.appendChild(task);

        input.value = "";
        input.focus();

        updateTaskCount();
    });

    updateTaskCount();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCampusFlow);
} else {
    initCampusFlow();
}
