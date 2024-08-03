import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  minimizeWindow: () => ipcRenderer.send("minimize-window"),
  maximizeWindow: () => ipcRenderer.send("maximize-window"),
  closeWindow: () => ipcRenderer.send("close-window"),
  fetchTodos: () => ipcRenderer.invoke("fetch-todo"),
  createTodo: (content: string) => ipcRenderer.invoke("create-todo", content),
});
