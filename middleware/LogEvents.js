// dep modules
const {format} = require('date-fns')
const {v4:uuid} = require('uuid')
// common core modules
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async(message,logName)=>{
    const dateTime = `${format(new Date(),'ddMMyyyy\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    //
    try {
        if(!fs.existsSync(path.join(__dirname,'..','logs')))
            await fsPromises.mkdir(path.join((__dirname,'..','logs')))
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logName),logItem)
    } catch (error) {
        console.log(error)
    }
}

const logger = (req,res,next)=>{
  logEvents(`${req.method} ${req.url} ${req.headers.origin}`,'reqLog.txt')
  console.log(`${req.url} ${req.method}`)
  next()
}

module.exports = {logger,logEvents}


