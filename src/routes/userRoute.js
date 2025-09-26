import express from 'express'
import { userLogin, userRegister } from '../controllers/userController.js';


const userRoute=express()


userRoute.post('/register',userRegister)

userRoute.post('/login',userLogin)




export default userRoute;