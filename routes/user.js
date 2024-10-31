import { Router } from "express";
import { registerUser, loginUser, userLogout } from "../controllers/user.js";

const userRouter = Router();

userRouter.post('/users/register', registerUser);
userRouter.post('/users/login', loginUser);
userRouter.post('/users/logout', loginUser);

// userRouter.get('/users/profile', isAuthenticated, getProfile);

//userRouter.get('/users/me/products', isAuthenticated, getUserProducts);

export default userRouter;