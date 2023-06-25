import RequestControl from "./RequestControl";

export default class InnTask {
  #element;
  constructor(element) {
    this.#element = element;
    this.activeDescription = null;
    this.taskActiv = null;
    this.innerHtmlTask = this.#innerHtmlTask.bind(this);
    this.innerHtmlDescription = this.#innerHtmlDescription.bind(this);
  }

  #innerHtmlTask(object) {
    console.log(object);
    if (object.tasks.length === 0) {
      this.#removeTasks();
      this.#removeLoader();
      return;
    }
    this.#removeTasks();
    let tasksList = [];
    for (let task of object.tasks) {
      const status =
        task.status === false
          ? "status-task button"
          : "status-task button selected";
      const html = `
        <li class="task" id="${task.id}">
          <div class="${status}"></div>
              <div class="task-board">
                  <p class="name">${task.name}</p>
              </div>
          <div class="time">${task.created}</div>
          <div class="edit-task button"></div>
          <div class="delete-task button"></div>
        </li>
      `;
      tasksList.push(html);
    }
    const htmlList = tasksList.join("");
    this.#element.insertAdjacentHTML("beforeend", htmlList);
    this.#removeLoader();
  }

  addTasks() {
    this.#innerLoader();
    setTimeout(() => {
      RequestControl.getAllTasks(this.innerHtmlTask);
    }, 1000);
  }

  #removeTasks() {
    const activeTasks = [...document.querySelectorAll(".task")];
    if (activeTasks.length === 0) return;
    activeTasks.forEach((task) => {
      task.remove();
    });
  }

  #innerHtmlDescription(object) {
    const p = document.createElement("p");
    p.classList.add("description");
    p.textContent = object.taskFull.description;
    const innerHtml = p.outerHTML;
    this.taskActiv
      .querySelector(".task-board")
      .insertAdjacentHTML("beforeend", innerHtml);
    this.activeDescription = this.taskActiv.querySelector(".description");
  }

  addTaskDescription(id) {
    RequestControl.getTask(id, this.innerHtmlDescription);
  }

  #innerLoader() {
    const loader = document.body.appendChild(document.createElement("div"));
    loader.classList.add("loader");
    this.loader = loader;
  }
  #removeLoader() {
    this.loader.remove();
  }
}
