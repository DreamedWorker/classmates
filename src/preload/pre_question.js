const { ipcRenderer } = require("electron")

let rootPath = ""

window.addEventListener("DOMContentLoaded", async () => {
    rootPath = await ipcRenderer.invoke("question-root")
    console.log(rootPath)
})