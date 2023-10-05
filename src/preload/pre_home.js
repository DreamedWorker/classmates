const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("homeEvt", {
    toggleColor: () => ipcRenderer.send("home-change-color"),
    tester: () => ipcRenderer.send("tester-aa"),
    showHelper: () => ipcRenderer.send("show-home-help"),
    goChangeSheet: () => ipcRenderer.send("go-class-change"),
    goPaperWin: () => ipcRenderer.send("go-paper")
})

window.addEventListener("DOMContentLoaded", () => {
    let refreshSheetBtn = document.getElementById("home-refresh")

    ipcRenderer.invoke("read-sheets").then((results) => {
        let data = JSON.parse(results)
        parseData2View(data)
    })

    refreshSheetBtn.addEventListener("click", () => {
        ipcRenderer.send("notification-sheet-change")
    })
})

function parseData2View(classSheet){
    let t1 = document.getElementById("a-1")
    let t2 = document.getElementById("a-2")
    let t3 = document.getElementById("a-3")
    let t4 = document.getElementById("a-4")
    let t5 = document.getElementById("a-5")
    let u1 = document.getElementById("b-1")
    let u2 = document.getElementById("b-2")
    let u3 = document.getElementById("b-3")
    let u4 = document.getElementById("b-4")
    let u5 = document.getElementById("b-5")
    let r1 = document.getElementById("c-1")
    let r2 = document.getElementById("c-2")
    let r3 = document.getElementById("c-3")
    let r4 = document.getElementById("c-4")
    let r5 = document.getElementById("c-5")
    let s1 = document.getElementById("d-1")
    let s2 = document.getElementById("d-2")
    let s3 = document.getElementById("d-3")
    let s4 = document.getElementById("d-4")
    let s5 = document.getElementById("d-5")
    let h1 = document.getElementById("e-1")
    let h2 = document.getElementById("e-2")
    let h3 = document.getElementById("e-3")
    let h4 = document.getElementById("e-4")
    let h5 = document.getElementById("e-5")
    let j1 = document.getElementById("f-1")
    let j2 = document.getElementById("f-2")
    let j3 = document.getElementById("f-3")
    let j4 = document.getElementById("f-4")
    let j5 = document.getElementById("f-5")
    let k1 = document.getElementById("g-1")
    let k2 = document.getElementById("g-2")
    let k3 = document.getElementById("g-3")
    let k4 = document.getElementById("g-4")
    let k5 = document.getElementById("g-5")
    if (classSheet.a1.name != "n"){
        processLabel(t1, classSheet.a1)
    } else processNull(t1)
    if (classSheet.a2.name != "n"){
        processLabel(t2, classSheet.a2)
    } else processNull(t2)
    if (classSheet.a3.name != "n"){
        processLabel(t3, classSheet.a3)
    } else processNull(t3)
    if (classSheet.a4.name != "n"){
        processLabel(t4, classSheet.a4)
    } else processNull(t4)
    if (classSheet.a5.name != "n"){
        processLabel(t5, classSheet.a5)
    } else processNull(t5)
    if (classSheet.b1.name != "n"){
        processLabel(u1, classSheet.b1)
    } else processNull(u1)
    if (classSheet.b2.name != "n"){
        processLabel(u2, classSheet.b2)
    } else processNull(u2)
    if (classSheet.b3.name != "n"){
        processLabel(u3, classSheet.b3)
    } else processNull(u3)
    if (classSheet.b4.name != "n"){
        processLabel(u4, classSheet.b4)
    } else processNull(u4)
    if (classSheet.b5.name != "n"){
        processLabel(u5, classSheet.b5)
    } else processNull(u5)
    if (classSheet.c1.name != "n"){
        processLabel(r1, classSheet.c1)
    } else processNull(r1)
    if (classSheet.c2.name != "n"){
        processLabel(r2, classSheet.c2)
    } else processNull(r2)
    if (classSheet.c3.name != "n"){
        processLabel(r3, classSheet.c3)
    } else processNull(r3)
    if (classSheet.c4.name != "n"){
        processLabel(r4, classSheet.c4)
    } else processNull(r4)
    if (classSheet.c5.name != "n"){
        processLabel(r5, classSheet.c5)
    } else processNull(r5)
    if (classSheet.d1.name != "n"){
        processLabel(s1, classSheet.d1)
    } else processNull(s1)
    if (classSheet.d2.name != "n"){
        processLabel(s2, classSheet.d2)
    } else processNull(s2)
    if (classSheet.d3.name != "n"){
        processLabel(s3, classSheet.d3)
    } else processNull(s3)
    if (classSheet.d4.name != "n"){
        processLabel(s4, classSheet.d4)
    } else processNull(s4)
    if (classSheet.d5.name != "n"){
        processLabel(s5, classSheet.d5)
    } else processNull(s5)
    if (classSheet.e1.name != "n"){
        processLabel(h1, classSheet.e1)
    } else processNull(h1)
    if (classSheet.e2.name != "n"){
        processLabel(h2, classSheet.e2)
    } else processNull(h2)
    if (classSheet.e3.name != "n"){
        processLabel(h3, classSheet.e3)
    } else processNull(h3)
    if (classSheet.e4.name != "n"){
        processLabel(h4, classSheet.e4)
    } else processNull(h4)
    if (classSheet.e5.name != "n"){
        processLabel(h5, classSheet.e5)
    } else processNull(h5)
    if (classSheet.f1.name != "n"){
        processLabel(j1, classSheet.f1)
    } else processNull(j1)
    if (classSheet.f2.name != "n"){
        processLabel(j2, classSheet.f2)
    } else processNull(j2)
    if (classSheet.f3.name != "n"){
        processLabel(j3, classSheet.f3)
    } else processNull(j3)
    if (classSheet.f4.name != "n"){
        processLabel(j4, classSheet.f4)
    } else processNull(j4)
    if (classSheet.f5.name != "n"){
        processLabel(j5, classSheet.f5)
    } else processNull(j5)
    if (classSheet.g1.name != "n"){
        processLabel(k1, classSheet.g1)
    } else processNull(k1)
    if (classSheet.g2.name != "n"){
        processLabel(k2, classSheet.g2)
    } else processNull(k2)
    if (classSheet.g3.name != "n"){
        processLabel(k3, classSheet.g3)
    } else processNull(k3)
    if (classSheet.g4.name != "n"){
        processLabel(k4, classSheet.g4)
    } else processNull(k4)
    if (classSheet.g5.name != "n"){
        processLabel(k5, classSheet.g5)
    } else processNull(k5)
}

function processLabel(htmlElement, classDetail){
    labels = classDetail.name.replace("@", "<br>")
    htmlElement.innerHTML = labels
    htmlElement.addEventListener("click", () => {
        if (htmlElement.innerHTML != ""){
            ipcRenderer.send("show-class-detail", classDetail)
        }
    })
}

function processNull(htmlElement){
    htmlElement.innerHTML = ""
    htmlElement.addEventListener("click", null)
}