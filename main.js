const { app, BrowserWindow } = require('electron');
const path = require('path');

function isDev() {
  return process.env['NODE_ENV'] === 'development';
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 640,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (isDev()) {
    win.loadURL('http://localhost:3000');
  } else {
    win.loadFile('dist/index.html');
  }
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
