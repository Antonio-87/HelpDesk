import InnTask from "./InnTask";
import RequestControl from "./requestControl";

export default class InnFormWidget {
  #element;
  #form;
  constructor(element) {
    this.#element = element;
    this.#form = document.forms.task;
  }

  static get markup() {
    return `
        <form class="unvisible"name "task">
            <h2 name="title"></h2>
            <label for="short-description">Краткое описание:</label>
            <input type="text" id="short-description" name="short-description"><br><br>
            <label for="long-description">Подробное описание:</label>
            <textarea id="long-description" name="long-description"></textarea><br><br>
            <button name="cancel">Отмена</button>
            <button name="ok">Ок</button>
        </form>
    `;
  }

  bindToDom() {
    this.#element.insertAdjacentHTML("beforeend", InnFormWidget.markup);

    this.title = this.#form.elements.title;
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
    if (target === this.cancel) this.formVision(false);
    if (target === this.ok) {
      if (this.shortDescription === "" || this.longDescription === "") {
        alert("Поля обязательны для заполнения!");
        return;
      }
      if (InnFormWidget.title === "Добавить задачу") {
        const { name, description } = this.#description();
        RequestControl.createTask(name, description);
        InnTask.addTasks();/**посмотреть контекст */
      }
      if (InnFormWidget.title === "Изменить задачу") {
        const { name, description } = InnFormWidget.description();
        RequestControl.updateTask(id, name, description);/**получить id задачи */
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

  description(task) {
    const { name, description } = task;
    this.shortDescription.value = name;
    this.longDescription.value = description;
  }
}
