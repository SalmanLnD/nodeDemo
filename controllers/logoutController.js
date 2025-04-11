const usersDB = {
    users:require('../models/users.json'),
    setUsers: function(data){this.users=data}
}

const fsPromises = require('fs').promises
const path = require('path')

const handleLogout = async(req,res)=>{
    const cookies = req.cookies
    if(!cookies?.jwt) 
        return res.sendStatus(204)
    const refreshToken = cookies.jwt
    const foundUser = usersDB.users.find(person=>person.refreshToken===refreshToken)
    if(!foundUser){
        res.clearCookie('jwt',{samesite:'none',secure:true,httpOnly:true,maxAge:24*60*60*1000})
        return res.sendStatus(204)
    }
    const otherUsers = usersDB.users.filter(person=>person.refreshToken!==foundUser.refreshToken)
    const currentUser = {...foundUser,refreshToken:""}
    usersDB.setUsers([...otherUsers,currentUser])
    await fsPromises.writeFile(path.join(__dirname,'..','models','users.json'),JSON.stringify(usersDB.users))
    res.clearCookie('jwt',{samesite:'none',secure:true,httpOnly:true,maxAge:24*60*60*1000})
}

module.exports = {handleLogout}