/**
 * Entry point of app: don't change this
 */

import InnBoardTasks from "./InnBoardTasks";
import InnFormWidget from "./InnFormWidget";
import InnTask from "./InnTask";
import Controller from "./Controller";

const board = document.querySelector(".board-tasks");

document.addEventListener("DOMContentLoaded", () => {
  const controller = new Controller(board);

  board.addEventListener("click", controller.onClick);
});
