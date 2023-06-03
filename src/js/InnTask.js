import RequestControl from "./requestControl";

export default class InnTask {
  #element;
  #activeDescription;
  constructor(element) {
    this.#element = element;
    this.#activeDescription = null;
    this.addTasks(this.innerHtmlTask);
  }

  innerHtmlTask(tasks) {
    if (tasks.length === 0) return;
    let tasksList = [];
    for (let task of tasks) {
      const status =
        task.status === false ? "status-task" : "status-task selected";
      const html = `
        <li class="task" id="${task.id}">
          <div class=${status}></div>
              <div class="task-board">
                  <p class="name">${task.name}</p>
              </div>
          <div class="time">${task.created}</div>
          <div class="edit-task"></div>
          <div class="delete-task"></div>
        </li>
      `;
      tasksList.push(html);
    }
    return tasksList.join("");
  }

  addTasks(innerHTMLTask) {
    const innerHtml = RequestControl.getAllTasks(innerHTMLTask);
    this.#element.insertAdjacentHTML("afterbegin", innerHtml);

    this.#element.addEventListener("click", this.onClick);
  }

  onClick = (e) => {
    const target = e.target;
    const task = target.closest(".task");
    const id = task.getAttribute("id");
    const description = task.querySelector(".description");
    if (task) {
      if (target.classList.contains("name")) {
        if (
          this.#activeDescription &&
          description !== this.#activeDescription
        ) {
          this.#activeDescription.remove();
          const innerHtml = RequestControl.getTask(
            id,
            this.innerHtmlDescription
          );
          task
            .querySelector(".task-board")
            .insertAdjacentHTML("beforeend", innerHtml);
          this.#activeDescription = task.querySelector(".description");
        }
        if (
          this.#activeDescription &&
          description === this.#activeDescription
        ) {
          this.#activeDescription.remove();
        }
      }

    //   if (target.classList.contains("edit-task")) {

    //   }

      if (target.classList.contains("delete-task")) {
        RequestControl.deleteTask(id);
        this.addTasks(this.innerHtmlTask);
      }
    }
  };

  innerHtmlDescription(taskFull) {
    const p = document.createElement("p");
    p.classList.add("description");
    p.textContent = taskFull.description;
    return p.outerHTML;
  }
}
