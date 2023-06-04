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
    this.#element.addEventListener("click", this.onClickForm);
  }

  onClickForm = (e) => {
    const target = e.target;
    if (target.classList.contains("add-task")) {
      this.#innTitle(target.textContent);
      this.#form.classList.remove("unvisible");
    }
    if (target === this.cancel) this.#form.classList.add("unvisible");
  };

  #innTitle(text) {
    this.title.textContent = text;
  }
}
