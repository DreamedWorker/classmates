const { existsSync, copyFileSync, mkdirSync } = require("fs")
const { app } = require("electron")
const path = require("path")

const writeDefaultSheet = () => {
    //将默认的课表（我所在学院本学期课表）写入工作目录用做缺省值
    const containsSheet = existsSync(`${app.getPath("userData")}/sheet.json`)
    if (!containsSheet){
        copyFileSync(
            path.join(__dirname, "../public/prepared/class_sheet.json"),
            `${app.getPath("userData")}/sheet.json`
        )
    }
}

const writeDefaultAddress = () => {
    //将默认的地址栏写入文件系统
    const containsSheet = existsSync(`${app.getPath("userData")}/address.json`)
    if (!containsSheet){
        copyFileSync(
            path.join(__dirname, "../public/prepared/address.json"),
            `${app.getPath("userData")}/address.json`
        )
    }
}

const writeDefaultQuestion = () => {
    //将默认的提问提示写入文件系统
    const containsSheet = existsSync(`${app.getPath("userData")}/q2a/question_example.json`)
    if (!containsSheet){
        mkdirSync(`${app.getPath("userData")}/q2a`)
        copyFileSync(
            path.join(__dirname, "../public/prepared/question_example.json"),
            `${app.getPath("userData")}/q2a/question_example.json`
        )
    }
}

function initFs() {
    writeDefaultSheet()
    writeDefaultAddress()
    writeDefaultQuestion()
}

const appInit = {
    initFs
}

module.exports = appInit