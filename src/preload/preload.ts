import {
  CreateDocument,
  DeleteDocument,
  GetDocuments,
  ReadDocument,
  WriteDocument,
} from "@shared/types.js";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  minimizeWindow: () => ipcRenderer.send("minimize-window"),
  maximizeWindow: () => ipcRenderer.send("maximize-window"),
  closeWindow: () => ipcRenderer.send("close-window"),
  signUp: async (data: any) => ipcRenderer.invoke("sign-up", data),
  getSession: async () => ipcRenderer.invoke("get-session"),
  signOut: async () => ipcRenderer.invoke("sign-out"),
});

contextBridge.exposeInMainWorld("documents", {
  getDocuments: (...args: Parameters<GetDocuments>) =>
    ipcRenderer.invoke("get-documents", ...args),
  readDocument: (...args: Parameters<ReadDocument>) =>
    ipcRenderer.invoke("read-document", ...args),
  writeDocument: (...args: Parameters<WriteDocument>) =>
    ipcRenderer.invoke("write-document", ...args),
  createDocument: (...args: Parameters<CreateDocument>) =>
    ipcRenderer.invoke("create-document", ...args),
  deleteDocument: (...args: Parameters<DeleteDocument>) =>
    ipcRenderer.invoke("delete-document", ...args),
});
