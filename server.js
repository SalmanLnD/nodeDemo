const express = require('express');
const path = require('path');
const {logger} = require('./middleware/LogEvents')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const errorHandler = require('./middleware/errHandler')
const {verifyJWT} = require('./middleware/verifyJWT')
const cookieparser = require('cookie-parser')
const credentials = require('./middleware/credentials.js')

const app = express();
const port = process.env.PORT||3000;

// built-in
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieparser())   
app.use('/',express.static(path.join(__dirname,'/public')))

//custom middleware
app.use(logger)
app.use(credentials)

// routes
app.use('/',require('./routes/root'))
app.use('/register',require('./routes/register'))
app.use('/auth',require('./routes/auth'))
app.use('/employees',verifyJWT,require('./routes/api/employees'))
app.use('/refresh',require('./routes/refresh'))
app.use('/logout',require('./routes/logout'))

//3rd-party middleware
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
