const { ipcMain, app, BrowserWindow, Notification, dialog, shell } = require("electron")
const { readdirSync, readFileSync, existsSync, writeFileSync } = require("original-fs")
const path = require("node:path")

function listQuestions(providedPath){
    return readdirSync(providedPath, "utf-8")
}

function showAddWindow(){
    const managerWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            sandbox: false,
            preload: path.join(__dirname, "../preload/pre_window_qa.js")
        }
    })
    managerWindow.loadFile(path.join(__dirname, "../html/window_new_qa.html"))
}

function questionIpc() {
    ipcMain.handle("question-root", () => {
        return `${app.getPath("userData")}/q2a`
    })
    ipcMain.handle("question-get", () => {
        return listQuestions(`${app.getPath("userData")}/q2a`)
    })
    ipcMain.handle("question-load", (event, mPath) => {
        return readFileSync(mPath, "utf-8")
    })
    ipcMain.on("question-modify", () => {
        showAddWindow()
    })
    ipcMain.handle("question-delete", (event, mPath) => {
        let opCode = dialog.showMessageBoxSync({
            message: "要删除（移动到废纸篓或回收站）这个问题提示吗？",
            buttons: [ "确认", "取消" ],
            defaultId: 1
        })
        if (opCode == 0){
            shell.trashItem(mPath)
            let successfulNote = new Notification({
                title: "问题删除提示",
                body: "已经删除了此提示，如果未能及时更新 UI，请关闭本窗口，然后重新进入。"
            })
            successfulNote.show()
            return "y"
        } else {
            return "n"
        }
    })
    ipcMain.on("question-new", (event, title, tip, detail, root) => {
        let simulation = {
            question_label: title,
            tips: tip,
            details: detail
        }
        let jsonData = JSON.stringify(simulation)
        if(!existsSync(`${root}/${title}.json`)){
            writeFileSync(`${root}/${title}.json`, jsonData)
            let successfulNote = new Notification({
                title: "问题保存提示",
                body: "新问题提示创建成功，你可以关闭此窗口然后返回刷新了！"
            })
            successfulNote.show()
        } else {
            let successfulNote = new Notification({
                title: "问题保存提示",
                body: "新问题提示创建失败，原因：存在相同标题的问题，我们不允许覆盖写入！"
            })
            successfulNote.show()
        }
    })
}

const questionIpcs = {
    questionIpc
}

module.exports = questionIpcs