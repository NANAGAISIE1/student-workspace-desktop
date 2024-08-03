"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  minimizeWindow: () => electron.ipcRenderer.send("minimize-window"),
  maximizeWindow: () => electron.ipcRenderer.send("maximize-window"),
  closeWindow: () => electron.ipcRenderer.send("close-window"),
  fetchTodos: () => electron.ipcRenderer.invoke("fetch-todo"),
  createTodo: (content) => electron.ipcRenderer.invoke("create-todo", content)
});
