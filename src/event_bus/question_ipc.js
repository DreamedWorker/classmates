const { ipcMain, app } = require("electron")

function listQuestions(providedPath){}

function questionIpc() {
    ipcMain.handle("question-root", () => {
        return `${app.getPath("userData")}/q2a`
    })
}

const questionIpcs = {
    questionIpc
}

module.exports = questionIpcs