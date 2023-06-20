import RequestControl from "./requestControl";
import InnFormWidget from "./InnFormWidget";
import InnTask from "./InnTask";
import InnBoardTasks from "./InnBoardTasks";

export default class Controller {
  #board;
  #innBoard;
  #form;
  #task;
  constructor(board) {
    this.#board = board;
    this.#innBoard = new InnBoardTasks(this.#board);
    this.#innBoard.bindToDom();
    this.#task = new InnTask(this.#innBoard.tasks);
    this.#form = new InnFormWidget(this.#board);
    this.#form.bindToDom();

    (() => {
      this.#task.addTasks();
      setTimeout(() => {
        if (!document.querySelector(".task")) {
          this.#form.firstOpenForm();
        }
      }, 2000);
    })();
  }

  onClick = (e) => {
    const target = e.target;
    const task = target.closest(".task");
    if (target.classList.contains("add-task")) {
      this.#form.formVision("Добавить задачу");
    }
    if (task) {
      this.#task.taskActiv = task;
      const id = task.getAttribute("id");
      const description = task.querySelector(".description");
      if (target.classList.contains("name")) {
        if (
          this.#task.activeDescription &&
          description !== this.#task.activeDescription
        ) {
          this.#task.activeDescription.remove();
          this.#task.addTaskDescription(id);
        }
        if (
          this.#task.activeDescription &&
          description === this.#task.activeDescription
        ) {
          this.#task.activeDescription.remove();
        }
        if (!this.#task.activeDescription) this.#task.addTaskDescription(id);
      }
      if (target.classList.contains("edit-task")) {
        this.#form.formVision("Изменить задачу");
        RequestControl.getTask(id, this.#form.description);
      }

      if (target.classList.contains("status-task")) {
        if (!target.classList.contains("selected")) {
          RequestControl.updateTask(id, null, null, true);
        } else {
          RequestControl.updateTask(id, null, null, false);
        }
        this.#task.addTasks();
      }

      if (target.classList.contains("delete-task")) {
        this.#form.formVision("Удалить задачу");
        this.#form.descriptionVision();
        RequestControl.getTask(id, this.#form.description);
      }
    }
    if (target === this.#form.cancel) {
      this.#form.descriptionDelete();
      this.#form.formVision();
      if (this.#form.title.textContent === "Удалить задачу") {
        this.#form.descriptionVision();
      }
    }
    if (target === this.#form.ok) {
      if (
        this.#form.textDelete.classList.contains("unvisible") &&
        (this.#form.shortDescription.value === "" ||
          this.#form.longDescription.value === "")
      ) {
        alert("Поля обязательны для заполнения!");
        return;
      }
      if (this.#form.title.textContent === "Добавить задачу") {
        const { name, description } = this.#form.getDescription();
        RequestControl.createTask(name, description);
        this.#form.formVision();
        this.#task.addTasks();
      }
      if (this.#form.title.textContent === "Изменить задачу") {
        const { name, description } = this.#form.getDescription();
        RequestControl.updateTask(this.#form.taskId, name, description);
        this.#form.formVision();
        this.#task.addTasks();
      }
      if (this.#form.title.textContent === "Удалить задачу") {
        RequestControl.deleteTask(this.#form.taskId);
        this.#form.formVision();
        this.#form.descriptionVision();
        this.#task.addTasks();
      }
      this.#form.descriptionDelete();
    }
  };
}
