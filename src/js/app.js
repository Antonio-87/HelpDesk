/**
 * Entry point of app: don't change this
 */

import InnBoardTasks from "./InnBoardTasks";
import InnTask from "./InnTask";

const board = document.querySelector(".board-tasks");

document.addEventListener("DOMContentLoaded", () => {
  const innBoardTasks = new InnBoardTasks(board);
  innBoardTasks.bindToDom();
  const innTask = new InnTask(innBoardTasks.tasks);
});
