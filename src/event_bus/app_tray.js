const { Tray, Menu, nativeImage } = require("electron");
const path = require("path");

function makeTray() {
    //let tray = new Tray(path.join(__dirname, "../public/save.svg"))
    let tray = new Tray(nativeImage.createFromPath(path.join(__dirname, "../public/save.svg")))
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ])
    tray.setToolTip("课堂助手托盘 - 双击显示主窗口")
    tray.setContextMenu(contextMenu)
    tray.on("click", () => {
        window.show()
    })
}

const AppTray = {
    makeTray
}

module.exports = AppTray