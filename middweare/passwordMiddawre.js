const cript = require("bcrypt")


const genHash = async (passwor) => {
    const salt= await genSalt()
    console.log(salt)
    const hash= new Promise((resolve,reject)=>{
        cript.hash(passwor,salt,(error,data)=>{
            if(error){
               return reject(error)
            }
            return resolve(data)

        })
    })

    return hash
}

const genSalt = async() => {
    
    return new Promise((resolve,reject)=>{
        cript.genSalt(5,(error,data)=>{
            if(error){
                return reject(error)
            }
            return resolve(data)
        })
    })
}

const comapreHash = (passwor,hash)=>{
    return new Promise((resolve,reject)=>{
        cript.compare(passwor,hash,(error,data)=>{
            if(error){
                return reject(error)
            }
            return resolve(data)
        })
    })
    

    
    
}

let email1 = "bieelpop18@gmail.com"

const compareString = (email) =>{
    for(var i = email.lenght-1; i--;i < 0 ){
        if(email.charAt(i) == "m" && email.charAt(i-1) == "o" && email.charAt(i-2)=="c"){
             console.log(email)
        }
    }
}

module.exports={
    genHash,
    comapreHash
}