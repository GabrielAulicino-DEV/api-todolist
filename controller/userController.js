const UserService = require('../service/user.service')
const jwt = require('../middweare/getToken')

const createUserController = async (req, res) => {
    try {
        const createService = await UserService.create(req.body.name, req.body.email, req.body.password)
        res.send({ data: createService.data, message: createService.message }).status(createService.status)
    } catch (error) {
        console.log("ERROR")
        res.status(400).send(error.error)
    }

}

const loginUserController = async (req, res) => {
    try {
        const loginService = await UserService.login(req.body.email, req.body.password)
        res.send({ data: loginService.data, message: loginService.message }).status(loginService.stauts)
    } catch (error) {
        res.status(400).send(error.error)
    }
}

const deleteUserController = async (req, res) => {
    try {
        
        
        const deleteUser = await UserService.delete(req.params.id)
        res.send({ data: deleteUser.data, message: deleteUser.message }).status(deleteUser.status)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.error)
    }
}

const getUsers = async (req, res) => {
    try {
        const getUsers = await UserService.getUsers()
        res.send({ data: getUsers.data, message: getUsers.message }).status(getUsers.status)
    } catch (error) {
        return Promise.reject({ error: error.toString(), status: 400 })
    }
}

const getUserEmailController = async (req, res) => {
    try {
        const getUserEmailController = await UserService.getUserEmail(req.params.email)
        res.send({ data: getUserEmailController.data, message: getUserEmailController.message }).status(getUserEmailController)
    } catch (error) {
        return Promise.reject({ error: error.toString(), status: 400 })
    }
}

module.exports = {
    createUserController,
    loginUserController,
    deleteUserController,
    getUsers,
    getUserEmailController
}