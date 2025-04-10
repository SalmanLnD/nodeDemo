const data={
    employees : require('../models/employees.json'),
    setEmployees : function(data){this.employees = data}
}

const getAllEmployees = (req,res)=>{
    res.json(data.employees)
}

const createNewEmployee = (req,res)=>{
    const newEmployee = {
        _id : data.employees[data.employees.length-1]._id+1 || 1,
        firstname:req.body.firstname,
        lastname:req.body.lastname      
    }
    if(!newEmployee.firstname || !newEmployee.lastname)
        return res.status(400).json({message:"First and last name required"})
    data.setEmployees([...data.employees,newEmployee])
    res.status(201).json(data.employees)
}   

const updateEmployee = (req,res)=>{
    const employee = data.employees.find(emp=>emp._id===parseInt(req.body._id))
    if(!employee)
        res.status(400).json({message:'Employee not found'})
    if(req.body.firstname) employee.firstname = req.body.firstname
    if(req.body.lastname) employee.firstname = req.body.lastname
    const filteredArray = data.employees.filter(
        emp=>emp._id !==parseInt(req.body._id)
    )
    const unsortedArray = [...filteredArray,employee]
    data.setEmployees(unsortedArray.sort((a,b)=>a._id>b._id?1:0))
    res.json(data.employees)
}

const deleteEmployee = (req,res)=>{
    const employee = data.employees.find(emp=>emp._id===parseInt(req.body._id))
    if(!employee)
        res.status(400).json({message:'Employee not found'})
    const filteredArray = data.employees.filter(
        emp=>emp._id !==parseInt(req.body._id)
    )
    data.setEmployees(...filteredArray)
    res.json(data.employees)
}

const getEmployee = (req,res)=>{
    const employee = data.employees.find(emp=>emp._id===parseInt(req.params.id))
    if(!employee)
        res.status(400).json({message:'Employee not found'})
    res.json(employee)
}

module.exports = {getAllEmployees,createNewEmployee,updateEmployee,deleteEmployee,getEmployee}