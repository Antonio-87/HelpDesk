export default class InnFormWidget {
  #element;
  constructor(element) {
    this.#element = element;
  }

  static get markup() {
    return `
        <form>
            <h2>${this.#element}</h2>
            <label for="short-description">Краткое описание:</label>
            <input type="text" id="short-description" name="short-description"><br><br>
            <label for="long-description">Подробное описание:</label>
            <textarea id="long-description" name="long-description"></textarea><br><br>
            <button type="button" onclick="cancel()">Отмена</button>
            <button type="submit">Ок</button>
        </form>
    `;
  }

  bindToDom() {
    this.#element.insertAdjacentHTML("beforeend", InnFormWidget.markup);
  }

  addTask(name, description, status) {}
}
