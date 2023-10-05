const { BrowserWindow, app, nativeTheme, Menu } = require("electron")
const path = require("path")
const allIpcs = require("./event_bus/home_ipc")
const mTimer = require("./event_bus/global_timer")
const AppTray = require("./event_bus/app_tray")
const appInit = require("./event_bus/init_bus")
const globalMenu = require("./event_bus/app_menu")

try {
    require("electron-reloader")(module)
} catch(_) {}

const createMainWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 768,
        webPreferences: {
            sandbox: false,
            preload: path.join(__dirname, "/preload/pre_home.js")
        }
    })
    win.webContents.openDevTools()
    win.loadFile(path.join(__dirname, "/html/home.html"))
}

app.whenReady().then(() => {
    allIpcs.homeIpcs() //将所有的进程间通信内容在这里注册
    nativeTheme.themeSource = "system"
    appInit.initFs() //初始化工作目录
    AppTray.makeTray()
    Menu.setApplicationMenu(globalMenu.menu)
    //mTimer.globalTimer()
    createMainWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0){
            createMainWindow()
        }
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})
