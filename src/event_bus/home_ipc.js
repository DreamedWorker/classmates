const { ipcMain, nativeTheme, dialog, app, BrowserWindow } = require("electron");
const { readFileSync } = require("node:fs");
const modifyIpcs = require("./modify_ipc");
const path = require("node:path");
const paperIpcs = require("./paper_bus");
const questionIpcs = require("./question_ipc");

function readClassSheet() {
    return readFileSync(`${app.getPath("userData")}/sheet.json`, "utf-8")
}

function showFileManager() {
    const managerWindow = new BrowserWindow({
        width: 1280,
        height: 768,
        webPreferences: {
            sandbox: false,
            preload: path.join(__dirname, "../preload/pre_paper.js")
        }
    })
    managerWindow.loadFile(path.join(__dirname, "../html/paper_manager.html"))
}

function showQuestionManager() {
    const managerWindow = new BrowserWindow({
        width: 1280,
        height: 768,
        webPreferences: {
            sandbox: false,
            preload: path.join(__dirname, "../preload/pre_question.js")
        }
    })
    managerWindow.loadFile(path.join(__dirname, "../html/question_helper.html"))
}

function homeIpcs() {
    ipcMain.on("home-change-color", () => {
        if (nativeTheme.shouldUseDarkColors){
            nativeTheme.themeSource = "light"
        } else {
            nativeTheme.themeSource = "dark"
        }
    })
    ipcMain.on("tester-aa", () => {
        dialog.showMessageBoxSync({
            message: "测试单元格点按"
        })
    })
    ipcMain.handle("read-sheets", readClassSheet)
    ipcMain.on("show-class-detail", (event, arg) => {
        labelList = arg.name.split("@")
        dialog.showMessageBoxSync({
            title: labelList[0],
            message: labelList[0],
            detail: `备注信息：${arg.note}`,
            buttons: [ "了解" ]
        })
    })
    ipcMain.on("show-home-help", () => {
        dialog.showMessageBoxSync({
            message: "点击有内容的课表格子可以查看课程信息和自己添加的备注。修改课表之后需要点击旁边的刷新按钮才能更新。如果在原先没有的时间段上增加"
                + "了新课程，需要重启（杀进程后再启动）才能在目标时间段弹出提示。",
            buttons: [ "了解" ]
        })
    })
    ipcMain.on("notification-sheet-change", () => {
        dialog.showMessageBox({
            message: "我们需要你手动重新启动以更新课表。",
            buttons: [ "重启", "取消" ],
            defaultId: 0
        }).then((index) => {
            if (index.response == 0){
                app.exit(0)
            }
        })
    })
    ipcMain.on("go-paper", () => {
        showFileManager()
    })
    ipcMain.on("go-question", () => {
        showQuestionManager()
    })
    modifyIpcs.modifySheetIpc()
    paperIpcs.paperIpc()
    questionIpcs.questionIpc()
}

const allIpcs = {
    homeIpcs
}

module.exports = allIpcs