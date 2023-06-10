import InnTask from "./InnTask";
import RequestControl from "./requestControl";

export default class InnFormWidget {
  #element;
  #form;
  #taskId;
  constructor(element) {
    this.#element = element;
    this.#form = document.forms.task;
    this.#taskId = null;
  }

  static get markup() {
    return `
        <form class="" name "task">
            <h2 name="title"></h2>
            <div name="description-board">
              <label for="short-description">Краткое описание:</label><br><br>
              <input type="text" id="short-description" name="short-description"><br><br>
              <label for="long-description">Подробное описание:</label><br><br>
              <textarea id="long-description" name="long-description"></textarea><br><br>
              <button name="cancel">Отмена</button>
              <button name="ok">Ок</button>
            </div>
            <p class="unvisible" name="text-delete>Вы уверены, что хотите удалить задачу? Это действие необратимо.</p>
        </form>
    `;
  }

  bindToDom() {
    this.#element.insertAdjacentHTML("beforeend", InnFormWidget.markup);

    this.title = this.#form.elements.title;
    this.descriptionBoard = this.#form.elements["description-board"];
    this.textDelete = this.#form.elements["text-delete"];
    this.shortDescription = this.#form.elements["short-description"];
    this.longDescription = this.#form.elements["long-description"];
    this.cancel = this.#form.elements.cancel;
    this.ok = this.#form.elements.ok;

    if (!document.querySelector(".task")) {
      this.#innTitle("Добавить задачу");
      this.#form.classList.remove("unvisible");
    }
    this.#form.addEventListener("click", this.onClickForm);
  }

  static get title() {
    return this.title.textContent;
  }

  onClickForm = (e) => {
    e.preventDefault;
    const target = e.target;
    if (target === this.cancel) {
      this.formVision(false);
      if (InnFormWidget.title === "Удалить задачу") {
        InnFormWidget.descriptionVision();
      }
    }
    if (target === this.ok) {
      if (this.shortDescription === "" || this.longDescription === "") {
        alert("Поля обязательны для заполнения!");
        return;
      }
      if (InnFormWidget.title === "Добавить задачу") {
        const { name, description } = this.#description();
        RequestControl.createTask(name, description);
        this.formVision(false);
        InnTask.addTasks();
      }
      if (InnFormWidget.title === "Изменить задачу") {
        const { name, description } = this.#description();
        RequestControl.updateTask(this.#taskId, name, description);
        this.formVision(false);
        InnTask.addTasks();
      }
      if (InnFormWidget.title === "Удалить задачу") {
        RequestControl.deleteTask(this.#taskId);
        this.formVision(false);
        InnFormWidget.descriptionVision();
        InnTask.addTasks();
      }
    }
  };

  #innTitle(text) {
    this.title.textContent = text;
  }

  formVision(title = null, optionVision = true) {
    this.#innTitle(title);
    optionVision
      ? this.#form.classList.remove("unvisible")
      : this.#form.classList.add("unvisible");
  }

  #description() {
    return {
      name: this.shortDescription.value,
      description: this.longDescription.value,
    };
  }

  /**
   * @param {{ id: any; name: any; description: any; }} task
   */
  static set description(task) {
    const { id, name, description } = task;
    this.#taskId = id;
    this.shortDescription.value = name;
    this.longDescription.value = description;
  }

  static descriptionVision() {
    this.descriptionBoard.classList.toggle("unvisible");
    this.textDelete.classList.toggle("unvisible");
  }
}
