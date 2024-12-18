import { Router } from "express";
import { registerUser, loginUser, getProfile, userLogout, updateProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";


const userRouter = Router();

userRouter.post('/users/register', registerUser);
userRouter.post('/users/login', loginUser);
userRouter.post('/users/logout', userLogout);
userRouter.patch('/users/me/:id', isAuthenticated, updateProfile)
userRouter.get('/users/me', isAuthenticated, getProfile);

//userRouter.get('/users/me/dashboard', isAuthenticated, getUserDashboard);

export default userRouter;