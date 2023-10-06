const { ipcRenderer } = require("electron")

let rootPath = ""
let rootList = []

window.addEventListener("DOMContentLoaded", async () => {
    let listView = document.getElementById("question-list")
    let addBtn = document.getElementById("question-add")
    let refreshBtn = document.getElementById("question-refresh")

    rootPath = await ipcRenderer.invoke("question-root")
    rootList = await ipcRenderer.invoke("question-get")
    showData(listView, rootList)

    addBtn.addEventListener("click", () => {
        ipcRenderer.send("question-modify")
    })

    refreshBtn.addEventListener("click", async () => {
        rootList = []
        rootList = await ipcRenderer.invoke("question-get")
        showData(listView, rootList)
    })
})

function showData(list, files){
    list.innerHTML = ""
    for (let single of files){
        let itemOuter = document.createElement("li")
        let itemIcon = document.createElement("i")
        let itemMore = document.createElement("i")
        let itemLabel = document.createElement("div")
        itemOuter.classList.add("mdui-list-item", "mdui-ripple")
        itemIcon.classList.add("mdui-list-item-icon", "mdui-icon", "material-icons")
        itemIcon.innerHTML = "question_answer"
        itemMore.classList.add("mdui-list-item-icon", "mdui-icon", "material-icons")
        itemMore.innerHTML = "more_horiz"
        itemLabel.classList.add("mdui-list-item-content")
        itemLabel.innerHTML = single
        itemOuter.appendChild(itemIcon)
        itemOuter.appendChild(itemLabel)
        itemOuter.appendChild(itemMore)
        itemOuter.addEventListener("dblclick", async () => {
            if (single != ".DS_Store"){
                let fileContext = await ipcRenderer.invoke("question-load", `${rootPath}/${single}`)
                let jsonInfo = JSON.parse(fileContext)
                document.getElementById("question-tips").innerHTML = jsonInfo.tips
                document.getElementById("question-details").innerHTML = jsonInfo.details
                document.getElementById("question-title").innerHTML = jsonInfo.question_label
            } else {
                ipcRenderer.send("paper-mac-only-file")
            }
        })
        itemMore.addEventListener("click", async () => {
            if (single != ".DS_Store"){
                let opCode = await ipcRenderer.invoke("question-delete", `${rootPath}/${single}`)
                if (opCode == "y"){
                    rootList = []
                    rootList = await ipcRenderer.invoke("question-get")
                    showData(document.getElementById("question-list"), rootList)
                }
            } else {
                ipcRenderer.send("paper-mac-only-file")
            }
        })
        list.appendChild(itemOuter)
    }
}