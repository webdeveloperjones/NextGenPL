const fs = require('fs')
var util = require('util')

const info = data => {
    let date = new Date()
    const currTime = `[${date.toLocaleDateString()} | ${date.toLocaleTimeString()}] `
    if (typeof (data) === 'object') {
        fs.appendFileSync('../pl_node/.log', `\n${currTime}${util.inspect(data)}`, 'utf8')
    }
    else {
        fs.appendFileSync('../pl_node/.log', `\n${currTime}${data}`, 'utf8')
    }
}
const error = data => {
    let date = new Date()
    const currTime = `[${date.toLocaleDateString()} | ${date.toLocaleTimeString()}] `
    fs.appendFileSync('../pl_node/.log', `\n${currTime}!!ERROR!! ${data}`, 'utf8')
}

module.exports = {
    info,
    error
}