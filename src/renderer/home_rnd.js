let helpBtn = document.getElementById("home-help")
let m_1 = document.getElementById("settings")
let goModify = document.getElementById("home-go-edit")
let goPaper = document.getElementById("home-go-paper")

helpBtn.addEventListener("click", () => {
    window.homeEvt.showHelper()
})

goModify.addEventListener("click", () => {
    window.homeEvt.goChangeSheet()
})

m_1.addEventListener("click", () => {
    window.homeEvt.tester()
})

goPaper.addEventListener("click", () => {
    window.homeEvt.goPaperWin()
})