import express from "express"
import { addTodo, getTodos } from "../controllers/todoController.js";

const todoRoutes = express.Router();

todoRoutes.post("/addTodo", addTodo)
todoRoutes.get("/getTodos", getTodos)


export {todoRoutes}