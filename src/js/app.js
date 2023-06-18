/**
 * Entry point of app: don't change this
 */

import InnBoardTasks from "./InnBoardTasks";
import InnFormWidget from "./InnFormWidget";
import InnTask from "./InnTask";
import Controller from "./Controller";

const board = document.querySelector(".board-tasks");

document.addEventListener("DOMContentLoaded", async () => {
  // const innBoardTasks = new InnBoardTasks(board);
  // innBoardTasks.bindToDom();
  // const innTask = new InnTask(innBoardTasks.tasks);
  // const innFormWidget = new InnFormWidget(board);
  // innFormWidget.bindToDom();
  const controller = new Controller(board);

  board.addEventListener("click", controller.onClick);
});

// document.documentElement.addEventListener("click", innTask.onClickTask);
