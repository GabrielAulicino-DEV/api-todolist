const User = require('../models/userModel')
const passworMiddaler = require('../middweare/passwordMiddawre')
const jwt = require('jsonwebtoken')
const constant= require("../constant/constant")

const CreateUser= async (name,email,password)=>{
    try{
        if(!name || !email || !password){
            return Promise.reject({error:"name passwor or emails is required",status:400})
        }
        const hash = await passworMiddaler.genHash(password)

         const user= await User.create({email:email,name:name,password:hash})

        return Promise.resolve({data:{name:user.name, email:user.email},message:"sucess create user",status:200})
    }catch(error){
        return Promise.reject({error:error.toString(),status:400})
    }
   
}

const LoginUser = async (email,password)=>{
    try{
        if(!email || !password){
            return Promise.reject({error:"Email and Passwrod is required", status: 400})
        }
        const user = await User.findOne({
            email:email
        })
        const compare = await passworMiddaler.comapreHash(password, user.password)

        if(compare == false){
            return Promise.reject({error:"Invalid Password", status:401})
        }
        
        const token = jwt.sign({name:user.name,email:user.email,_id:user._id},constant.jwtSecret)
        console.log("Usuario logado")
        return Promise.resolve({data:{token:token,message:"sucess to login"},status:200})
    }catch(error){
        return Promise.reject({error:error.toString(),status:400})
    }
}

const DeleteUser = async (id)=>{
    try{
        const deleteUser = await User.deleteOne({_id:id})
       return Promise.resolve({data:deleteUser,message:"usuario deletado",status:200})
    }catch{
        return Promise.reject({error:error.toString(),status:400})
    }
}

const getUsers = async ()=>{
    try{
        const getUsers = await User.find({})
        return Promise.resolve({data:getUsers, message:"Aqui está todos os usuarios", status:200})
    }catch(error){
        return Promise.reject({error:error.toString(), status: 400})
    }
}

const getUserEmail = async(email)=>{
    try{
        const getUserEmail = await User.find({email:email}, {name:1})
        return Promise.resolve({data:getUserEmail, message:"Este é o usuario do email", status:200})
    }catch(error){
        return Promise.reject({error:error.toString(), status:400})
    }
}


module.exports = {
    create: CreateUser,
    login: LoginUser,
    delete: DeleteUser,
    getUsers: getUsers,
    getUserEmail:getUserEmail
}