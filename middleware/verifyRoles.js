const verifyRoles = (...allowedRoles)=>{
    return (req,res,next)=>{
        if(!req?.roles)
            res.sendStatus(401)
        const rolesArray = [...allowedRoles]
        console.log(rolesArray)//admin
        console.log(req.roles)//editor
        const result = req.roles.map(role=>rolesArray.includes(role)).find(val=>val===true)
        if(!result)
            res.sendStatus(401)
        next()
    }
}
module.exports = verifyRoles