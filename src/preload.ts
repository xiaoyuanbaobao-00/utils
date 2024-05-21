/**
 * 预加载
 */
const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    // 获取窗口状态
    async getMaximizeState() {
        return await ipcRenderer.invoke('getMaximizeState');
    },
    // 最小化
    minimize() {
        ipcRenderer.send('minimize');
    },
    // 最大化
    maximize() {
        return ipcRenderer.invoke('maximize');
    },
    // 关闭窗口
    close() {
        ipcRenderer.send('hide');
    }
})
