import { app, BrowserWindow, Tray } from 'electron';
import path from 'path';
import ipceventmount from '../electron/Ipcevent'
import createTray from '../electron/Tray'

// 窗体对象
let win: BrowserWindow;
// 系统托盘
let concrete: Tray;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  win = new BrowserWindow({
    autoHideMenuBar: true,
    frame: false,
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
}

app.whenReady().then(() => {
  createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
            ipceventmount(win);
        }
    })
    if (require('electron-squirrel-startup')) app.quit();
    ipceventmount(win);
}).then(() => {
  concrete = createTray(win);
})

// 全部窗口关闭时，退出应用
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

