// import InnTask from "./InnTask";
// import RequestControl from "./requestControl";

export default class InnFormWidget {
  #element;
  #form;
  // #taskId;
  // #innTask;
  constructor(element) {
    this.#element = element;
    // this.#innTask = new InnTask(element);
    this.taskId = null;
  }

  static get markup() {
    return `
        <form class="unvisible" name="task">
            <p class="title"></p>
            <div class="description-board">
              <label for="short-description">Краткое описание</label><br><br>
              <input type="text" id="short-description" name="short-description" maxlength="89"><br><br>
              <label for="long-description">Подробное описание</label><br><br>
              <textarea id="long-description" name="long-description"></textarea><br><br>
            </div>
            <p class="unvisible text-delete">Вы уверены, что хотите удалить задачу? Это действие необратимо.</p>
            <div class="form-control">
              <div class="form-button cancel">Отмена</div>
              <div class="form-button ok">Ок</div>
            </div>
        </form>
    `;
  }

  bindToDom() {
    this.#element.insertAdjacentHTML("beforeend", InnFormWidget.markup);

    this.#form = document.forms.task;
    this.title = this.#form.querySelector(".title");
    this.descriptionBoard = this.#form.querySelector(".description-board");
    this.shortDescription = this.#form.elements["short-description"];
    this.longDescription = this.#form.elements["long-description"];
    this.textDelete = this.#form.querySelector(".text-delete");
    this.cancel = this.#form.querySelector(".cancel");
    this.ok = this.#form.querySelector(".ok");

    // if (!document.querySelector(".task")) {
    //   this.#innTitle("Добавить задачу");
    //   this.#form.classList.remove("unvisible");
    // }
    // this.#form.addEventListener("click", this.onClickForm);
  }

  // onClickForm = (e) => {
  //   e.preventDefault;
  //   const target = e.target;
  //   if (target === this.cancel) {
  //     this.formVision();
  //     if (this.title.textContent === "Удалить задачу") {
  //       InnFormWidget.descriptionVision();
  //     }
  //   }
  //   if (target === this.ok) {
  //     if (
  //       this.shortDescription.value === "" ||
  //       this.longDescription.value === ""
  //     ) {
  //       alert("Поля обязательны для заполнения!");
  //       return;
  //     }
  //     if (this.title.textContent === "Добавить задачу") {
  //       const { name, description } = this.#description();
  //       RequestControl.createTask(name, description);
  //       this.formVision();
  //       InnTask.addTasks();
  //     }
  //     if (InnFormWidget.title === "Изменить задачу") {
  //       const { name, description } = this.#description();
  //       RequestControl.updateTask(this.#taskId, name, description);
  //       this.formVision();
  //       InnTask.addTasks();
  //     }
  //     if (InnFormWidget.title === "Удалить задачу") {
  //       RequestControl.deleteTask(this.#taskId);
  //       this.formVision();
  //       InnFormWidget.descriptionVision();
  //       InnTask.addTasks();
  //     }
  //   }
  // };

  firstOpenForm() {
    this.#innTitle("Добавить задачу");
    this.#form.classList.remove("unvisible");
  }

  #innTitle(text) {
    this.title.textContent = text;
  }

  formVision(title) {
    if (title) {
      this.#innTitle(title);
      this.#form.classList.remove("unvisible");
    } else {
      this.#form.classList.add("unvisible");
    }
  }

  getDescription() {
    return {
      name: this.shortDescription.value,
      description: this.longDescription.value,
    };
  }

  // eslint-disable-next-line no-dupe-class-members
  description(task) {
    const { id, name, description } = task;
    this.taskId = id;
    this.shortDescription.value = name;
    this.longDescription.value = description;
  }

  descriptionVision() {
    this.descriptionBoard.classList.toggle("unvisible");
    this.textDelete.classList.toggle("unvisible");
  }
}
