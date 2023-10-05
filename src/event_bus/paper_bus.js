const { ipcMain, app, dialog, Notification, shell } = require("electron")
const { readFileSync, writeFileSync, readdirSync, lstatSync, unlinkSync, existsSync, copyFileSync } = require("node:fs")
const path = require("path")

function readAddressFile() {
    return readFileSync(`${app.getPath("userData")}/address.json`, "utf-8")
}

function showChooseWindow() {
    let paths = dialog.showOpenDialogSync({
        defaultPath: app.getPath("home"),
        properties: ["openDirectory", "createDirectory"],
        title: "选择一个文件夹以继续",
        message: "选择一个文件夹以继续"
    })
    if (paths != undefined) {
        return paths[0]
    } else {
        return "n"
    }
}

function showChooseFileWindow() {
    let paths = dialog.showOpenDialogSync({
        defaultPath: app.getPath("home"),
        properties: ["createDirectory", "openFile"],
        title: "选择一个文件以继续",
        message: "选择一个文件以继续"
    })
    if (paths != undefined) {
        return paths[0]
    } else {
        return "n"
    }
}

function clearAddressOp() {
    let opResult = dialog.showMessageBoxSync({
        message: "要清空当前的地址栏并恢复到缺省设置吗？",
        buttons: ["确认", "取消"],
        defaultId: 1
    })
    return opResult
}

function paperIpc() {
    ipcMain.handle("paper-read-all", readAddressFile)
    ipcMain.handle("paper-select-folder", showChooseWindow)
    ipcMain.handle("paper-import-file", showChooseFileWindow)
    ipcMain.handle("paper-do-clear", clearAddressOp)
    ipcMain.on("paper-modify-address", (event, changed) => {
        writeFileSync(`${app.getPath("userData")}/address.json`, changed)
        let okMsg = new Notification({
            title: "地址源添加提示",
            body: "地址添加成功，你可以操作此目录了。"
        })
        okMsg.show()
    })
    ipcMain.handle("paper-copy-now", (event, distDir, srcFile) => {
        let requiredFileNames = srcFile.split(path.sep)
        let fileName = requiredFileNames[requiredFileNames.length - 1]
        let isExistFile = existsSync(`${distDir}/${fileName}`)
        if (!isExistFile){
            copyFileSync(srcFile, `${distDir}/${fileName}`)
            let okMsg = new Notification({
                title: "文件导入提示",
                body: "已成功导入目标文件"
            })
            okMsg.show()
            return "y"
        } else {
            let okMsg = new Notification({
                title: "文件导入提示",
                body: "目标目录以存在此文件，我们终止了文件导入以避免内容覆盖！请手动根据需要导入。"
            })
            okMsg.show()
            return "n"
        }
    })
    ipcMain.handle("paper-change-pwd", (event, mPwd) => {
        return readdirSync(mPwd, "utf-8")
    })
    ipcMain.handle("paper-check-type", (event, mPath) => {
        return lstatSync(mPath).isDirectory()
    })
    ipcMain.on("paper-open-required", (event, mPath) => {
        shell.openPath(mPath)
    })
    ipcMain.on("paper-mac-only-file", () => {
        dialog.showErrorBox("操作不受支持", "此文件是 macOS 的 Finder 软件专属的内容存储介质，你不能操作它。")
    })
    ipcMain.on("paper-delete-reset", () => {
        unlinkSync(`${app.getPath("userData")}/address.json`)
        const containsSheet = existsSync(`${app.getPath("userData")}/address.json`)
        if (!containsSheet) {
            copyFileSync(
                path.join(__dirname, "../public/prepared/address.json"),
                `${app.getPath("userData")}/address.json`
            )
        }
    })
    ipcMain.handle("paper-change-pwd-download", () => {
        return readdirSync(app.getPath("downloads"), "utf-8")
    })
    ipcMain.handle("paper-remove-file", (event, filePath) => {
        let opResult = dialog.showMessageBoxSync({
            message: "确定要将此文件移动到废纸篓或回收站吗？",
            buttons: ["确认", "取消"],
            defaultId: 1
        })
        if (opResult == 0){
            shell.trashItem(filePath)
            let deleteNote = new Notification({
                title: "文件删除提示",
                body: "我们已经删除了此文件，如果列表没能及时刷新，请手动刷新。（刷新按钮在应用栏上）"
            })
            deleteNote.show()
            return "y"
        } else {
            return "n"
        }
    })
}

const paperIpcs = {
    paperIpc
}

module.exports = paperIpcs