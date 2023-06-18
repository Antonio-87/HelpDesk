import RequestControl from "./requestControl";
// import InnFormWidget from "./InnFormWidget";

export default class InnTask {
  #element;
  // #activeDescription;
  constructor(element) {
    this.#element = element;
    this.activeDescription = null;
    // this.form = null;
    // this.addTasks();
    this.innerHtmlTask = this.#innerHtmlTask.bind(this);
  }

  #innerHtmlTask(object) {
    console.log(object);
    if (object.tasks.length === 0) return;
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
  }

  addTasks() {
    RequestControl.getAllTasks(this.innerHtmlTask);

    // if (innerHtml !== undefined) {
    // this.#element.insertAdjacentHTML("beforeend", innerHtml);
    // }
    // this.#element.addEventListener("click", this.onClickTask);
  }

  #removeTasks() {
    const activeTasks = [...document.querySelectorAll(".task")];
    if (activeTasks.length === 0) return;
    activeTasks.forEach((task) => {
      task.remove();
    });
  }

  // onClickTask = (e) => {
  //   const target = e.target;
  //   const task = target.closest(".task");
  //   if (target.classList.contains("add-task")) {
  //     this.form.formVision("Добавить задачу");
  //   }
  //   if (task) {
  //     const id = task.getAttribute("id");
  //     const description = task.querySelector(".description");
  //     if (target.classList.contains("name")) {
  //       if (
  //         this.#activeDescription &&
  //         description !== this.#activeDescription
  //       ) {
  //         this.#activeDescription.remove();
  //         this.#addTaskDescription(id, task);
  //       }
  //       if (
  //         this.#activeDescription &&
  //         description === this.#activeDescription
  //       ) {
  //         this.#activeDescription.remove();
  //       }
  //       if (!this.#activeDescription) this.#addTaskDescription(id, task);
  //     }
  //     if (target.classList.contains("edit-task")) {
  //       InnFormWidget.formVision("Изменить задачу");
  //       RequestControl.getTask(id, InnFormWidget.description);
  //     }

  //     if (target.classList.contains("status-task")) {
  //       if (target.classList.contains("selected")) {
  //         RequestControl.updateTask(id, true);
  //       } else {
  //         RequestControl.updateTask(id, false);
  //       }
  //       this.addTasks();
  //     }

  //     if (target.classList.contains("delete-task")) {
  //       InnFormWidget.formVision("Удалить задачу");
  //       InnFormWidget.descriptionVision();
  //       RequestControl.getTask(id, InnFormWidget.description);
  //     }
  //   }
  // };

  innerHtmlDescription(taskFull) {
    const p = document.createElement("p");
    p.classList.add("description");
    p.textContent = taskFull.description;
    return p.outerHTML;
  }

  addTaskDescription(id, task) {
    const innerHtml = RequestControl.getTask(id, this.innerHtmlDescription);
    task
      .querySelector(".task-board")
      .insertAdjacentHTML("beforeend", innerHtml);
    this.activeDescription = task.querySelector(".description");
  }
}
