const { ipcRenderer } = require("electron")

let rootPath = ""

window.addEventListener("DOMContentLoaded", async () => {
    rootPath = await ipcRenderer.invoke("question-root")
    document.getElementById("q-cancel").addEventListener("click", () => {
        window.close()
    })
    document.getElementById("q-save").addEventListener("click", () => {
        let title = document.getElementById("q-a").value
        let tips = document.getElementById("q-b").value
        let details = document.getElementById("q-c").value
        ipcRenderer.send("question-new", title, tips, details, rootPath)
    })
})