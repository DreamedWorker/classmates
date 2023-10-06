const { Notification, app } = require("electron");
//const { readFileSync } = require("original-fs");
const sd = require("silly-datetime")

function globalTimer() {
    setInterval(() => {
        let times = sd.format(new Date(), 'HH:mm')
        let day = new Date().getDay()
        if (times == "07:45" || times == "09:40" || times == "13:15" || times == "15:10"){
            let notice = new Notification({
                title: "课程提示",
                body: "下节课就要开始了"
            })
            notice.show()
        }
    }, 30000)
}

// function getClassSheet(){
//     let data = readFileSync(`${app.getPath("userData")}/sheet.json`, "utf-8")
//     return JSON.parse(data)
// }

const mTimer = {
    globalTimer
}

module.exports = mTimer