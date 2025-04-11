const usersDB = {
    users:require('../models/users.json'),
    setUsers: function(data){this.users=data}
}
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const fsPromises = require('fs').promises
const path = require('path')

const handleLogin = async(req,res)=>{
    const  {username,password} = req.body
    if(!username || !password)
        res.status(400).json({message:"Username and Password are requird"})
    const foundUser = usersDB.users.find(user=>user.username===username)
    if(!foundUser)
        return res.sendStatus(401)
    const match = await bcrypt.compare(password,foundUser.password)
    if(match){
        const accessToken = jwt.sign(
            {'username':foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'60s'}
        )
        const refreshToken = jwt.sign(
            {'username':foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        )
        const otherUsers = usersDB.users.filter(person=>person.username!==username)
        const currentUser = {...foundUser,refreshToken}
        usersDB.setUsers([...otherUsers,currentUser])
        await fsPromises.writeFile(
            path.join(__dirname,'..','models','users.json'),
            JSON.stringify(usersDB.users)
        )
        res.cookie('jwt',refreshToken,{samesite:'none',secure:true,httpOnly:true,maxAge:24*60*60*1000})
        res.json({accessToken})
    }
    else
        res.sendStatus(401)
}

module.exports = {handleLogin}