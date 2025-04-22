import express from 'express';
import { registerController, loginController, forgotPasswordController, getAllUsers, getSingleUser } from '../controllers/authController.js';


const authRoutes = express.Router();

console.log('Some one comes till authRoutes!');

authRoutes.post("/register", registerController)
authRoutes.post("/login", loginController)
authRoutes.post("/forgotPassword", forgotPasswordController)
authRoutes.get("/UsersData", getAllUsers)
authRoutes.get("/user/:email", getSingleUser)

export {authRoutes}