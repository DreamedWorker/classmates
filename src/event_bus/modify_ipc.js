const { ipcMain, BrowserWindow, dialog, app, Notification, shell } = require("electron")
const { writeFile } = require("fs/promises")
const path = require("path")

function createModifyWindow() {
    const modifyWindow = new BrowserWindow({
        width: 1280,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, "../preload/pre_modify.js")
        }
    })
    modifyWindow.loadFile(path.join(__dirname, "../html/modify_sheet.html"))
}

function modifySheetIpc() {
    ipcMain.on("go-class-change", () => {
        //createModifyWindow()
        dialog.showMessageBox({
            message: "你希望如何修改课表？（代码模式需要你对 JSON 的写法有一定的了解，并且我们会以系统默认的打开方式打开课表）",
            buttons: [ "GUI 模式", "Code 模式"]
        }).then((index) => {
            if (index.response == 0) {
                createModifyWindow()
            } else if (index.response == 1){
                shell.openPath(`${app.getPath("userData")}/sheet.json`)
            }
        })
    })
    ipcMain.on("show-modify-help", () => {
        dialog.showMessageBoxSync({
            message: "本页面为你提供图形化的课表编辑。请严格按照给出的格式和要求填写，否则会导致程序无法加载任何内容！"
                + "如需要留空，请务必填写英文字母 n 作为占位。",
            buttons: [ "了解" ]
        })
    })
    ipcMain.on("change-sheet", (event, arg) => {
        dialog.showMessageBox({
            message: "要保存所做的更改吗？",
            buttons: [ "取消", "确定" ],
            defaultId: 0
        }).then((index) => {
            if (index.response == 1){
                let json = JSON.stringify(arg)
                writeFile(`${app.getPath("userData")}/sheet.json`, json)
                let note = new Notification({
                    title: "课表修改提示",
                    body: "课表修改完成，请重启本软件或返回刷新课表以使修改生效。"
                })
                note.show()
            }
        })
    })
}

const modifyIpcs = {
    modifySheetIpc
}

module.exports = modifyIpcs