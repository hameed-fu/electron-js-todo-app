const { app, BrowserWindow, Menu, ipcMain } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");

  ipcMain.on("message", (event, arg) => {
    console.log("Received from renderer:", arg);
    event.reply("reply", "Main process received your task.");
  });

  const menu = Menu.buildFromTemplate([
    {
      label: "Developer",
      submenu: [
        {
          label: "Toggle DevTools",
          accelerator: process.platform === "darwin" ? "Cmd+Alt+I" : "Ctrl+Shift+I",
          click: () => win.webContents.toggleDevTools(),
        },
        { role: "reload" },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
