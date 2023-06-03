// import InnTask from "./InnTask";

export default class InnBoardTasks {
  constructor(element) {
    this.element = element;
  }

  static get markup() {
    return `
        <div class="add-task">Добавить задачу</div>
        <div class="tasks-list">
            <ul class="tasks></ul>
        </div>
    `;
  }

  static get addTaskSelector() {
    return ".add-task";
  }

  static get tasksListSelector() {
    return ".tasks-list";
  }
  static get tasksSelector() {
    return ".tasks";
  }

  bindToDom() {
    this.element.insertAdjacentHTML("beforeend", InnBoardTasks.markup);

    this.addTask = this.element.querySelector(InnBoardTasks.addTaskSelector);
    this.tasksList = this.element.querySelector(
      InnBoardTasks.tasksListSelector
    );
    this.tasks = this.element.querySelector(InnBoardTasks.tasksSelector);

    // const innTask = new InnTask(this.tasks);
  }
}
