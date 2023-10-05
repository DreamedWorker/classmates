const { ipcRenderer, contextBridge } = require("electron")

contextBridge.exposeInMainWorld("modifyEvt", {
    showModifyHelpDialog: () => ipcRenderer.send("show-modify-help")
})

window.addEventListener("DOMContentLoaded", () => {
    let saveOp = document.getElementById("modify-save")

    ipcRenderer.invoke("read-sheets").then((results) => {
        let data = JSON.parse(results)
        parseData2View(data)
    })

    saveOp.addEventListener("click", () => {
        ipcRenderer.send("change-sheet", getAllData())
    })
})

function getAllData(){
    let simulationData = {
        a1: {
            name: document.getElementById("a1").value.toString(),
            note: document.getElementById("a1n").value.toString()
        },
        a2: {
            name: document.getElementById("a2").value.toString(),
            note: document.getElementById("a2n").value.toString()
        },
        a3: {
            name: document.getElementById("a3").value.toString(),
            note: document.getElementById("a3n").value.toString()
        },
        a4: {
            name: document.getElementById("a4").value.toString(),
            note: document.getElementById("a4n").value.toString()
        },
        a5: {
            name: document.getElementById("a5").value.toString(),
            note: document.getElementById("a5n").value.toString()
        },
        b1: {
            name: document.getElementById("b1").value.toString(),
            note: document.getElementById("b1n").value.toString()
        },
        b2: {
            name: document.getElementById("b2").value.toString(),
            note: document.getElementById("b2n").value.toString()
        },
        b3: {
            name: document.getElementById("b3").value.toString(),
            note: document.getElementById("b3n").value.toString()
        },
        b4: {
            name: document.getElementById("b4").value.toString(),
            note: document.getElementById("b4n").value.toString()
        },
        b5: {
            name: document.getElementById("b5").value.toString(),
            note: document.getElementById("b5n").value.toString()
        },
        c1: {
            name: document.getElementById("c1").value.toString(),
            note: document.getElementById("c1n").value.toString()
        },
        c2: {
            name: document.getElementById("c2").value.toString(),
            note: document.getElementById("c2n").value.toString()
        },
        c3: {
            name: document.getElementById("c3").value.toString(),
            note: document.getElementById("c3n").value.toString()
        },
        c4: {
            name: document.getElementById("c4").value.toString(),
            note: document.getElementById("c4n").value.toString()
        },
        c5: {
            name: document.getElementById("c5").value.toString(),
            note: document.getElementById("c5n").value.toString()
        },
        d1: {
            name: document.getElementById("d1").value.toString(),
            note: document.getElementById("d1n").value.toString()
        },
        d2: {
            name: document.getElementById("d2").value.toString(),
            note: document.getElementById("d2n").value.toString()
        },
        d3: {
            name: document.getElementById("d3").value.toString(),
            note: document.getElementById("d3n").value.toString()
        },
        d4: {
            name: document.getElementById("d4").value.toString(),
            note: document.getElementById("d4n").value.toString()
        },
        d5: {
            name: document.getElementById("d5").value.toString(),
            note: document.getElementById("d5n").value.toString()
        },
        e1: {
            name: document.getElementById("e1").value.toString(),
            note: document.getElementById("e1n").value.toString()
        },
        e2: {
            name: document.getElementById("e2").value.toString(),
            note: document.getElementById("e2n").value.toString()
        },
        e3: {
            name: document.getElementById("e3").value.toString(),
            note: document.getElementById("e3n").value.toString()
        },
        e4: {
            name: document.getElementById("e4").value.toString(),
            note: document.getElementById("e4n").value.toString()
        },
        e5: {
            name: document.getElementById("e5").value.toString(),
            note: document.getElementById("e5n").value.toString()
        },
        f1: {
            name: document.getElementById("f1").value.toString(),
            note: document.getElementById("f1n").value.toString()
        },
        f2: {
            name: document.getElementById("f2").value.toString(),
            note: document.getElementById("f2n").value.toString()
        },
        f3: {
            name: document.getElementById("f3").value.toString(),
            note: document.getElementById("f3n").value.toString()
        },
        f4: {
            name: document.getElementById("f4").value.toString(),
            note: document.getElementById("f4n").value.toString()
        },
        f5: {
            name: document.getElementById("f5").value.toString(),
            note: document.getElementById("f5n").value.toString()
        },
        g1: {
            name: document.getElementById("g1").value.toString(),
            note: document.getElementById("g1n").value.toString()
        },
        g2: {
            name: document.getElementById("g2").value.toString(),
            note: document.getElementById("g2n").value.toString()
        },
        g3: {
            name: document.getElementById("g3").value.toString(),
            note: document.getElementById("g3n").value.toString()
        },
        g4: {
            name: document.getElementById("g4").value.toString(),
            note: document.getElementById("g4n").value.toString()
        },
        g5: {
            name: document.getElementById("g5").value.toString(),
            note: document.getElementById("g5n").value.toString()
        }
    }
    return simulationData
}

function parseData2View(classSheet){
    document.getElementById("a1").value=classSheet.a1.name
    document.getElementById("a2").value=classSheet.a2.name
    document.getElementById("a3").value=classSheet.a3.name
    document.getElementById("a4").value=classSheet.a4.name
    document.getElementById("a5").value=classSheet.a5.name
    document.getElementById("b1").value=classSheet.b1.name
    document.getElementById("b2").value=classSheet.b2.name
    document.getElementById("b3").value=classSheet.b3.name
    document.getElementById("b4").value=classSheet.b4.name
    document.getElementById("b5").value=classSheet.b5.name
    document.getElementById("c1").value=classSheet.c1.name
    document.getElementById("c2").value=classSheet.c2.name
    document.getElementById("c3").value=classSheet.c3.name
    document.getElementById("c4").value=classSheet.c4.name
    document.getElementById("c5").value=classSheet.c5.name
    document.getElementById("d1").value=classSheet.d1.name
    document.getElementById("d2").value=classSheet.d2.name
    document.getElementById("d3").value=classSheet.d3.name
    document.getElementById("d4").value=classSheet.d4.name
    document.getElementById("d5").value=classSheet.d5.name
    document.getElementById("e1").value=classSheet.e1.name
    document.getElementById("e2").value=classSheet.e2.name
    document.getElementById("e3").value=classSheet.e3.name
    document.getElementById("e4").value=classSheet.e4.name
    document.getElementById("e5").value=classSheet.e5.name
    document.getElementById("f1").value=classSheet.f1.name
    document.getElementById("f2").value=classSheet.f2.name
    document.getElementById("f3").value=classSheet.f3.name
    document.getElementById("f4").value=classSheet.f4.name
    document.getElementById("f5").value=classSheet.f5.name
    document.getElementById("g1").value=classSheet.g1.name
    document.getElementById("g2").value=classSheet.g2.name
    document.getElementById("g3").value=classSheet.g3.name
    document.getElementById("g4").value=classSheet.g4.name
    document.getElementById("g5").value=classSheet.g5.name

    document.getElementById("a1n").value=classSheet.a1.note
    document.getElementById("a2n").value=classSheet.a2.note
    document.getElementById("a3n").value=classSheet.a3.note
    document.getElementById("a4n").value=classSheet.a4.note
    document.getElementById("a5n").value=classSheet.a5.note
    document.getElementById("b1n").value=classSheet.b1.note
    document.getElementById("b2n").value=classSheet.b2.note
    document.getElementById("b3n").value=classSheet.b3.note
    document.getElementById("b4n").value=classSheet.b4.note
    document.getElementById("b5n").value=classSheet.b5.note
    document.getElementById("c1n").value=classSheet.c1.note
    document.getElementById("c2n").value=classSheet.c2.note
    document.getElementById("c3n").value=classSheet.c3.note
    document.getElementById("c4n").value=classSheet.c4.note
    document.getElementById("c5n").value=classSheet.c5.note
    document.getElementById("d1n").value=classSheet.d1.note
    document.getElementById("d2n").value=classSheet.d2.note
    document.getElementById("d3n").value=classSheet.d3.note
    document.getElementById("d4n").value=classSheet.d4.note
    document.getElementById("d5n").value=classSheet.d5.note
    document.getElementById("e1n").value=classSheet.e1.note
    document.getElementById("e2n").value=classSheet.e2.note
    document.getElementById("e3n").value=classSheet.e3.note
    document.getElementById("e4n").value=classSheet.e4.note
    document.getElementById("e5n").value=classSheet.e5.note
    document.getElementById("f1n").value=classSheet.f1.note
    document.getElementById("f2n").value=classSheet.f2.note
    document.getElementById("f3n").value=classSheet.f3.note
    document.getElementById("f4n").value=classSheet.f4.note
    document.getElementById("f5n").value=classSheet.f5.note
    document.getElementById("g1n").value=classSheet.g1.note
    document.getElementById("g2n").value=classSheet.g2.note
    document.getElementById("g3n").value=classSheet.g3.note
    document.getElementById("g4n").value=classSheet.g4.note
    document.getElementById("g5n").value=classSheet.g5.note
}