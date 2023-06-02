/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
import createRequest from "./createRequest";

export default class RequestControl {
  static HOST = "https://localhost:8080/";

  /**
   * создание задачи (объектов Task и TaskFull)
   */
  static createTask(name, description, status, callback) {
    const task = {
      name: name,
      description: description,
      status: status,
    };
    try {
      createRequest(
        `${this.HOST}/createTask/`,
        {
          method: "POST",
          body: JSON.stringify(task),
        },
        callback
      );
    } catch (e) {
      alert("Ошибка" + e.name + ":" + e.message);
    }
  }

  /**
   * получение всех задач (массив объектов Task)
   */
  static getAllTasks(callback) {
    try {
      createRequest(
        `${this.HOST}/allTasks/`,
        {
          method: "GET",
        },
        callback
      );
    } catch (e) {
      alert("Ошибка" + e.name + ":" + e.message);
    }
  }

  /**
   * получение задачи по id
   */
  static getTask(id, callback) {
    try {
      createRequest(
        `${this.HOST}/tasks/?id=${id}`,
        {
          method: "GET",
        },
        callback
      );
    } catch (e) {
      alert("Ошибка" + e.name + ":" + e.message);
    }
  }

  /**
   * обновление задачи (объектов Task и TaskFull)
   */
  static updateTask(id, name = "", description = "", status = "", callback) {
    const task = {
      name: name,
      description: description,
      status: status,
    };
    try {
      createRequest(
        `${this.HOST}/tasks/?id=${id}`,
        {
          method: "PUT",
          body: JSON.stringify(task),
        },
        callback
      );
    } catch (e) {
      alert("Ошибка" + e.name + ":" + e.message);
    }
  }

  /**
   * Метод удаления задачи
   */
  static deleteTask(id, callback) {
    try {
      createRequest(
        `${this.HOST}/tasks/?id=${id}`,
        {
          method: "DELETE",
        },
        callback
      );
    } catch (e) {
      alert("Ошибка" + e.name + ":" + e.message);
    }
  }
}
