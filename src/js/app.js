/**
 * Entry point of app: don't change this
 */
import Controller from "./Controller";

const board = document.querySelector(".board-tasks");

document.addEventListener("DOMContentLoaded", () => {
  const controller = new Controller(board);

  board.addEventListener("click", controller.onClick);
});
