export default class InnFormWidget {
  #element;
  #form;
  constructor(element) {
    this.#element = element;
    this.taskId = null;
    this.description = this.description.bind(this);
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
  }

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

  description(object) {
    const { id, name, description } = object.taskFull;
    this.taskId = id;
    this.shortDescription.value = name;
    this.longDescription.value = description;
  }

  descriptionVision() {
    this.descriptionBoard.classList.toggle("unvisible");
    this.textDelete.classList.toggle("unvisible");
  }

  descriptionDelete() {
    this.shortDescription.value = "";
    this.longDescription.value = "";
  }
}
