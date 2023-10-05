const { ipcRenderer } = require("electron")
const path = require("path")

let addressConfig = null
let currentPwd = ""
let changedPwd = ""

window.addEventListener("DOMContentLoaded", () => {
    let back2Home = document.getElementById("paper-back")
    let openInBtn = document.getElementById("paper-open-in")
    let clearAddress = document.getElementById("paper-address-reset")
    let refreshView = document.getElementById("paper-refresh-it")
    let importFile = document.getElementById("paper-import-file")

    ipcRenderer.invoke("paper-read-all").then((results) => {
        addressConfig = JSON.parse(results)
        let addressRow = document.getElementById("paper-address-part")
        setEvt2Chips(addressRow, results)
    })

    importFile.addEventListener("click", () => {
        if (changedPwd != ""){
            ipcRenderer.invoke("paper-import-file").then((filePath) => {
                if (filePath != "n"){
                    ipcRenderer.invoke("paper-copy-now", changedPwd, filePath).then((opCode) => {
                        if (opCode == "y"){
                            ipcRenderer.invoke("paper-change-pwd", changedPwd).then((res) => {
                                setLists(res)
                            })
                        }
                    })
                }
            })
        }
    })

    back2Home.addEventListener("click", () => {
        changedPwd = currentPwd
        ipcRenderer.invoke("paper-change-pwd", changedPwd).then((res) => {
            setLists(res)
        })
    })

    openInBtn.addEventListener("click", () => {
        ipcRenderer.send("paper-open-required", changedPwd)
    })

    clearAddress.addEventListener("click", () => {
        ipcRenderer.invoke("paper-do-clear").then((opCode) => {
            if (opCode == 0){
                ipcRenderer.send("paper-delete-reset")
                let container = document.getElementById("file-list")
                container.innerHTML = ""
                ipcRenderer.invoke("paper-read-all").then((results) => {
                    addressConfig = null
                    addressConfig = JSON.parse(results)
                    let addressRow = document.getElementById("paper-address-part")
                    setEvt2Chips(addressRow, results)
                })
            }
        })
    })

    refreshView.addEventListener("click", () => {
        ipcRenderer.invoke("paper-change-pwd", changedPwd).then((res) => {
            setLists(res)
        })
    })
})

function setEvt2Chips(addr, resultData) {
    let addInfo = JSON.parse(resultData)
    if (addr.childElementCount != 0) {
        //addr.removeChild()
        addr.innerHTML = ""
    }
    for (let single of addInfo.address) {
        let labelOuter = document.createElement("div")
        let labelInner = document.createElement("span")
        if (single == "下载目录") {
            labelInner.innerHTML = single
        } else {
            labelInner.innerHTML = single.split("@")[0]
        }
        labelInner.classList.add("mdui-chip-title")
        labelOuter.classList.add("mdui-chip")
        labelOuter.style.marginRight = "4px"
        labelOuter.appendChild(labelInner)
        labelOuter.addEventListener("click", () => {
            if (labelInner.innerHTML != "下载目录") {
                ipcRenderer.invoke("paper-change-pwd", single.split("@")[1]).then((res) => {
                    currentPwd = single.split("@")[1]
                    changedPwd = currentPwd
                    setLists(res)
                })
            }
        })
        addr.appendChild(labelOuter)
    }
    let labelOuter = document.createElement("div")
    let labelInner = document.createElement("span")
    labelInner.innerHTML = "添加源"
    labelInner.classList.add("mdui-chip-title")
    labelOuter.classList.add("mdui-chip")
    labelOuter.appendChild(labelInner)
    labelOuter.addEventListener("click", () => {
        ipcRenderer.invoke("paper-select-folder").then((result) => {
            if (result != "n") {
                let pathNameList = result.split(path.sep)
                let pathName = pathNameList[pathNameList.length - 1]
                addressConfig.address.push(`${pathName}@${result}`)
                ipcRenderer.send("paper-modify-address", JSON.stringify(addressConfig))
                ipcRenderer.invoke("paper-read-all").then((results) => {
                    addressConfig = JSON.parse(results)
                    let addressRow = document.getElementById("paper-address-part")
                    setEvt2Chips(addressRow, results)
                })
            }
        })
    })
    addr.appendChild(labelOuter)
}

function setLists(sources) {
    let container = document.getElementById("file-list")
    container.innerHTML = ""
    for (let singleItem of sources) {
        let itemOuter = document.createElement("li")
        itemOuter.classList.add("mdui-list-item", "mdui-ripple")
        let itemIcon = document.createElement("i")
        let itemLabel = document.createElement("div")
        let labelMore = document.createElement("i")
        itemIcon.classList.add("mdui-list-item-icon", "mdui-icon", "material-icons")
        //尝试在这里对文件夹和文件使用不同的图标进行区分
        ipcRenderer.invoke("paper-check-type", `${changedPwd}/${singleItem}`).then((checkResult) => {
            if (checkResult) {
                itemIcon.innerHTML = "folder"
            } else {
                itemIcon.innerHTML = "insert_drive_file"
            }
        })
        itemLabel.classList.add("mdui-list-item-content")
        itemLabel.innerHTML = singleItem
        labelMore.classList.add("mdui-list-item-icon", "mdui-icon", "material-icons")
        labelMore.innerHTML = "more_horiz"
        labelMore.addEventListener("click", () => {
            if (singleItem == ".DS_Store") {
                ipcRenderer.send("paper-mac-only-file")
            } else {
                ipcRenderer.invoke("paper-remove-file", `${changedPwd}/${singleItem}`).then((opStatus) => {
                    if (opStatus == "y"){
                        ipcRenderer.invoke("paper-change-pwd", changedPwd).then((res) => {
                            setLists(res)
                        })
                    }
                })
            }
        })
        itemOuter.appendChild(itemIcon)
        itemOuter.appendChild(itemLabel)
        itemOuter.appendChild(labelMore)
        itemOuter.addEventListener("dblclick", () => {
            if (singleItem == ".DS_Store") {
                ipcRenderer.send("paper-mac-only-file")
            } else {
                if (itemIcon.innerHTML == "folder") {
                    changedPwd = `${changedPwd}/${singleItem}`
                    ipcRenderer.invoke("paper-change-pwd", changedPwd).then((res) => {
                        setLists(res)
                    })
                }
                ipcRenderer.send("paper-open-required", `${changedPwd}/${singleItem}`)
            }
        })
        container.appendChild(itemOuter)
    }
}