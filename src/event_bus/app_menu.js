const { Menu } = require("electron")

const isMac = process.platform === 'darwin'

const temple = [
    ...(isMac
        ? [{
            label: '课堂助手',
            submenu: [
                { role: 'about', label: '关于 课堂助手' },
                { role: 'services', label: '服务' },
                { role: 'hide', label: '隐藏 课堂助手' },
                { role: 'hideOthers', label: '隐藏其他程序' },
                { role: 'unhide', label: '显示全部' },
                { role: 'quit', label: '退出 课堂助手' }
            ]
        }]
        : [{}]),
        {
            label: '文件',
            submenu: [
                { label: '开放源代码许可' },
                isMac ? { role: 'close', label: '关闭窗口' } : { role: 'quit', label: '退出程序' },
            ]
        },
        {
            label: '编辑',
            submenu: [
                { role: 'undo', label: '撤销' },
                { role: 'redo', label: '重做' },
                { role: 'copy', label: '复制' },
                { role: 'paste', label: '粘贴' },
                { role: 'cut', label: '剪切' },
                { role: 'selectAll', label: '全选' }
            ]
        },
        {
            label: '窗口',
            submenu: [
                { role: 'reload', label: '重载' },
                { role: 'forceReload', label: '强制重载' },
                { role: 'resetZoom', label: '恢复缩放' },
                { role: 'zoomIn', label: '放大' },
                { role: 'zoomOut', label: '缩小' },
                { role: 'togglefullscreen', label: '全屏' }
            ]
        },
        {
            role: 'help',
            label: '帮助',
            submenu: [
              {
                label: '官网',
                click: async () => {
                  const { shell } = require('electron')
                  await shell.openExternal('https://electronjs.org')
                }
              }
            ]
        }
]

const menu = Menu.buildFromTemplate(temple)

const globalMenu = {
    menu
}

module.exports = globalMenu