import { app as e, ipcMain as n, BrowserWindow as o } from "electron";
import t, { dirname as m } from "node:path";
import { fileURLToPath as a } from "node:url";
import { createRequire as d } from "node:module";
const s = d(import.meta.url), w = a(import.meta.url), l = m(w);
s("electron-squirrel-startup") && e.quit();
const r = () => {
  new o({
    width: 1400,
    height: 850,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: t.join(l, "preload.js"),
      sandbox: !0,
      contextIsolation: !0
    }
  }).loadFile(
    t.join(
      import.meta.url,
      "../renderer/main_window/index.html"
    )
  );
};
e.on("ready", r);
n.on("minimize-window", () => {
  const i = o.getFocusedWindow();
  i && i.minimize();
});
n.on("maximize-window", () => {
  const i = o.getFocusedWindow();
  i && (i.isMaximized() ? i.unmaximize() : i.maximize());
});
n.on("close-window", () => {
  const i = o.getFocusedWindow();
  i && i.close();
});
e.on("window-all-closed", () => {
  process.platform !== "darwin" && e.quit();
});
e.on("activate", () => {
  o.getAllWindows().length === 0 && r();
});
