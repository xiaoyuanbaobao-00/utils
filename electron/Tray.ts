import { app, BrowserWindow, Tray, Menu, nativeImage } from 'electron';
import path from 'path';

let win: BrowserWindow;

// 托盘菜单
const contextMenu = Menu.buildFromTemplate([
    { label: '显示主界面', click: () => { win.show() } },
    { label: '退出应用', click: () => { app.quit() } }
])
// 创建系统托盘
function createTray(w: BrowserWindow) {
    win = w;
    // 创建图标
    const icon = nativeImage.createFromPath(path.join(__dirname, 'static', 'electron.png'));
    // 系统托盘
    const concrete = new Tray(icon);
    concrete.setContextMenu(contextMenu);
    concrete.setToolTip('工具组');
    // 点击托盘图标显示主窗口
    concrete.on('click', () => {
        win.show();
    });
    return concrete;
}

export default createTray;