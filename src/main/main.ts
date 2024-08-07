import { app, BrowserWindow, ipcMain, safeStorage } from "electron";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import {
  getCurrentSession,
  getTodos,
  signOut,
  signUp,
} from "./amplify/index.js";
import fs from "node:fs";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import {
  createDocument,
  deleteDocument,
  getDocuments,
  readDocument,
  writeDocument,
} from "./documents/index.js";
import {
  CreateDocument,
  DeleteDocument,
  GetDocuments,
  ReadDocument,
  WriteDocument,
} from "@shared/types.js";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (require("electron-squirrel-startup")) app.quit();

Amplify.configure(outputs);

let mainWindow: BrowserWindow | null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 850,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: true,
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) mainWindow.webContents.openDevTools();
};

app.on("ready", () => {
  ipcMain.handle("get-documents", (_, ...args: Parameters<GetDocuments>) =>
    getDocuments(...args),
  );
  ipcMain.handle("read-document", (_, ...args: Parameters<ReadDocument>) =>
    readDocument(...args),
  );
  ipcMain.handle("write-document", (_, ...args: Parameters<WriteDocument>) =>
    writeDocument(...args),
  );
  ipcMain.handle("create-document", (_, ...args: Parameters<CreateDocument>) =>
    createDocument(...args),
  );
  ipcMain.handle("delete-document", (_, ...args: Parameters<DeleteDocument>) =>
    deleteDocument(...args),
  );
  createWindow();
});

ipcMain.on("minimize-window", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.minimize();
});

ipcMain.on("maximize-window", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
});

ipcMain.on("close-window", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.close();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Function to securely save session data
function saveSessionData(data: string) {
  const encryptedData = safeStorage.encryptString(data);
  fs.writeFileSync(
    path.join(app.getPath("userData"), "session.dat"),
    encryptedData,
  );
}

// Function to securely load session data
function loadSessionData(): string | null {
  const sessionPath = path.join(app.getPath("userData"), "session.dat");
  if (fs.existsSync(sessionPath)) {
    const encryptedData = fs.readFileSync(sessionPath);
    return safeStorage.decryptString(encryptedData);
  }
  return null;
}

// Amplify

// Handle sign-up
ipcMain.handle("sign-up", async (event, { name, password, email }) => {
  const result = await signUp(name, password, email);
  if (result.success) {
    // Store session information
    const session = await getCurrentSession();
    if (session) {
      saveSessionData(JSON.stringify(session));
    }
  }
  return result;
});

// Handle get session
ipcMain.handle("get-session", async () => {
  // const sessionData = loadSessionData();
  // console.log(sessionData);
  // return sessionData;
  const todos = await getTodos();
  console.log(todos);
});

// Handle sign-out
ipcMain.handle("sign-out", async () => {
  const result = await signOut();
  if (result.success) {
    // Clear stored session data
    const sessionPath = path.join(app.getPath("userData"), "session.dat");
    if (fs.existsSync(sessionPath)) {
      fs.unlinkSync(sessionPath);
    }
  }
  return result;
});
