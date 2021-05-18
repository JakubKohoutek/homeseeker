/**
 * The main script for Electron application that runs the Main process and controls the
 * lifecycle of the application, displays GU, performs native OS interactions, and creates
 * renderer processes withing web pages. Electron app can have only one Main process.
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow } = require('electron');
/* eslint-enable @typescript-eslint/no-var-requires */

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('build/index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
