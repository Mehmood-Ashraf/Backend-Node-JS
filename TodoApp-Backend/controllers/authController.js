import { errorHandler, successHandler } from "../utils/responseHandlers.js";
import Users from "../models/Users.js";



const registerController = async (req, res) => {
    console.log(req.body)
    const { userName, email, password, age, firstName, lastName, isAdmin } = req.body

    if(!userName || !email || !password || !firstName || !lastName){
        return errorHandler(res, 404, "Missing Fields")
    }

    const isExist = await Users.findOne({ $or: [{ email: email }, { userName: userName}] })

    console.log(isExist)

    if(isExist){
        return errorHandler(res, 404, "Username or Email address already Exist")
    }

    if(password.length < 8){
        return errorHandler(res, 404, "Password length should be 8 characters long")
    }

    try{
        await Users.create({
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email
        })
        return successHandler(res, 200, "User registered Successfully")

    }catch(error){
        console.log(error)
        return errorHandler(res, 404, "User not registered", error.message)
    }
}



const loginController = async (req, res) => {
    const {email, password} = req.body;

    if(password.length < 8){
        return errorHandler(res, 400, "Password length should be minimun 8 characters long")
    }

    const isExist = await Users.findOne({email: email})
    console.log(isExist, "==> User Exist" )

    if(!isExist){
        return errorHandler(res, 400, "No user exist with given email. Please try to create account first")
    }

    if(isExist.password == password){
        // successHandler(res, 200, "User logged in Successfully!")
        return res.status(200).json({
            message: "User loggedin Successfully",
            user: {
                email: isExist.email,
                userName: isExist.userName
            }
        })
    }else{
        errorHandler(res, 400, "Invalid credentilas")
    }
}


const forgotPasswordController = async (req, res) => {
    const { email } = req.body

    if(!email){
        return errorHandler(res, 400, "Email is reqquired")
    }

    try{

    const user = await Users.findOne({email})
        if(!user){
            return errorHandler(res, 404, "User with porvided email not found")
        }
        return successHandler(res, 200, "User Found!")
    }catch(error){
        console.log(error)
        return errorHandler(res, 400, "Something went wrong", error.message)
    }
}

const getAllUsers = async (req, res) => {

    try{
        const allUsers = await Users.find({}, "-password")
        return successHandler(res, 200, "All users data", allUsers)
    }catch(error){
        console.log(error)
        return errorHandler(res, 400, "No users Found")
    }
}


const getSingleUser = async (req, res) => {
    const {email} = req.params

    try{
        const user = await Users.findOne({email})

        if(!user){
            return errorHandler(res, 400, "No user found wuth provided email")
        }
        return successHandler(res, 200, "User Found", user)
    }catch(error){
        console.log(error)
        return errorHandler(res, 400, "Server Error")
    }
}




// const changePassword = async (req, res) => {
//     const {email, password, newPassword} = req.body

//     if(!email){
//         return errorHandler(res, 400, "Email Required")
//     }


// }


export { 
    registerController,
    loginController,
    forgotPasswordController,
    getAllUsers,
    getSingleUser
}