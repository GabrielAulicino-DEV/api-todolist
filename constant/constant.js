module.exports={
    mongoUrl: process.env.MONGO_URL?process.env.MONGO_URL:"mongodb://localhost/new-api",
    jwtSecret: process.env.JWT_SECRET? process.env.JWT_SECRET:"430ujioe325u09jpeir3ho" 
}