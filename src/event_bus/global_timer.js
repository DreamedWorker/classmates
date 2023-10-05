const { Notification } = require("electron")

function globalTimer() {
    setInterval(() => {
        let test = new Notification({
            title: "测试",
            body: "五秒一次"
        })
        test.show()
    }, 5000)
}

const mTimer = {
    globalTimer
}

module.exports = mTimer