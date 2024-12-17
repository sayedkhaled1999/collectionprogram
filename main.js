const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

async function createWindow() {
  try {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        webSecurity: true,
      },
    });

    await win.loadURL(`file://${path.join(__dirname, 'collectionprogram', 'index.html')}`);
    win.webContents.openDevTools();
    win.maximize();
  } catch (error) {
    console.error(error);
  }
}

ipcMain.on('load-page', (event, page) => {
  const win = BrowserWindow.getFocusedWindow();
  win.loadURL(`file://${path.join(__dirname, 'collectionprogram', page)}`);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});