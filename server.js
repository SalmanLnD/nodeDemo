const express = require('express');
const path = require('path');
const {logger} = require('./middleware/LogEvents')
const cors = require('cors')
const errorHandler = require('./middleware/errHandler')

const app = express();
const port = process.env.PORT||3000;

// built-in
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/',express.static(path.join(__dirname,'/public')))
app.use('/subdir',express.static(path.join(__dirname,'/public')))

//custom middleware
app.use(logger)

// routes
app.use('/',require('./routes/root'))
app.use('/subdir',require('./routes/subdir'))

//3rd-party middleware
const whiteList = ['www.salex.com','https://www.google.com'] 

const corsOptions = {
  origin:(origin,callback)=>{
    if(whiteList.indexOf(origin)!==-1 || !origin){
      callback(null,true)
    }
    else{
      callback(new Error('Not Allowed By CORS'))
    }
  },
  optionsSuccessStatus:200
}

app.use(cors(corsOptions))



app.use(errorHandler)

app.all(/\/*/,(req,res)=>{
  res.status(404)
  if(req.accepts('html'))
    res.sendFile(path.join(__dirname,'views','404.html'))
  else if(req.accepts('json'))
    res.send({error:"404 Not Found"})
  else
    res.type('txt').send("404 Not Found")
}) 


app.listen(port, () => console.log(`server running on http://localhost:${port}`));

/**
 * Router
 *  - Sub app
 *  - mini express app for managing specific sets of routes and middleware
 */