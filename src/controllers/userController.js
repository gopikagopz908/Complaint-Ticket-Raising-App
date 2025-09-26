import asyncHandler from "../middleWare/asyncHandler.js";
import { loginService, registerService } from "../services/userService.js";
import CustomError from "../utils/customError.js";
import { generateToken } from "../utils/generateToken.js";

export const userRegister=asyncHandler(async(req,res)=>{
    const data=req.body;


    const createuser=await registerService(data)

   return res.status(200).json({

        // status:status.SUCCESS,
        message:"user registred successfully",
        createuser

    })

})






export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("Email and password are required", 404);
  }

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const adminUser = {
      _id: "admin-id", // you can put any unique string
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      role: "Admin",
    };

    const token = generateToken(adminUser);

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        path: "/",
      })
      .status(200)
      .json({
        message: "Admin logged in successfully",
        user: adminUser,
        token,
        role: adminUser.role,
      });
  }

  const user = await loginService({ email, password });

  const token = generateToken(user);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      path: "/",
    })
    .status(200)
    .json({
      message: "User logged in successfully",
      user,
      token,
      role: user.role,
    });
});