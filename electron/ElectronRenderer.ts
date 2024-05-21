var api = (window as any).api;
// 等待页面元素加载完毕后执行渲染进程
document.addEventListener('DOMContentLoaded', () => {
    if(api) {
        init();
    }
});

async function init() {
    if(api !== undefined) {
        // 获取最小化按钮
        const minimizeBtn = document.getElementById('minimize');
        // 获取最大化按钮
        const maximizeBtn = document.getElementById('maximize');
        // 获取关闭按钮
        const closeBtn = document.getElementById('close');
        // 获取标题位
        const title = document.getElementById('title');

        // 获取最大化状态
        await getMaximizeState(maximizeBtn);
        
        // 点击最小化按钮
        minimizeBtn.addEventListener('click', () => {
            api.minimize();
        });

        // 点击关闭按钮
        closeBtn.addEventListener('click', () => {
            api.close();
        });

        // 点击最大化按钮
        maximizeBtn.addEventListener('click', () => {
            changeMaxIcon(maximizeBtn);
        });

        // 双击标题栏
        title.addEventListener('dblclick',async (e) => {
            if(HTMLElementIsSameNode(e.currentTarget as HTMLElement, e.target as HTMLElement)) {
                await getMaximizeState(maximizeBtn);
            }
        });
    }
}

/**
 * 判断两个元素是否是同一个节点
 * @param {*} element 
 * @param {*} element2 
 * @returns 
 */
function HTMLElementIsSameNode(element:HTMLElement, element2:HTMLElement) {
    return element && element2 && element.isSameNode(element2);
}
// 更改icon状态
async function changeMaxIcon(node:HTMLElement) {
    node.firstElementChild.innerHTML = await api.maximize();
}

async function getMaximizeState(node:HTMLElement) {
    node.firstElementChild.innerHTML = await api.getMaximizeState();
}