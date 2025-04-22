import Todo from "../models/Todo.js"
import { successHandler, errorHandler } from "../utils/responseHandlers.js"

export const addTodo = async (req, res) => {
    const { todoMessage, creatorEmail } = req.body;

    if(!todoMessage || !creatorEmail){
        return errorHandler(res, 400, "Missing Fields")
    }

    try{
        await Todo.create({
            todoMessage,
            creatorEmail
        })

        return successHandler(res, 200, "Todo create successfully")
    }catch(error){
        console.log(error)
        return errorHandler(res, 400, "Todo not added", error.message)
    }
}

export const getTodos = async (req, res) => {
    
    const { email }  = req.query

    if(!email){
        return errorHandler(res, 400, "User Email required")
    }


    try{
        const allTodos = await Todo.find({creatorEmail: email})
        return successHandler(res, 200, "All Todos get successfully", allTodos)
    }catch(error){
        return errorHandler(res, 400, "Failed to get todos", error.message)
    }

}

