
import { BrowserWindow, ipcMain } from 'electron';
// 最大化状态管理
const maximizeState = {
    maximized: '&#xe916;',
    unmaximized: '&#xe60c;',
    current: '&#xe916;'
}

function ipceventmount(win: BrowserWindow) {
    // 获取窗口状态
    ipcMain.handle('getMaximizeState', () => {
        return maximizeState.current;
    })

    // 最大化
    ipcMain.handle('maximize', () => {
        if (maximizeState.current === maximizeState.maximized) {
            // win.setFullScreen(true);
            win.maximize();
            maximizeState.current = maximizeState.unmaximized;
        } else {
            // win.setFullScreen(false);
            win.restore();
            maximizeState.current = maximizeState.maximized;
        }
        return maximizeState.current;
    })

    // 最小化
    ipcMain.on('minimize', () => {
        win.minimize();
    })

    // 隐藏窗口
    ipcMain.on('hide', () => {
        win.hide();
    })
}

export default ipceventmount;