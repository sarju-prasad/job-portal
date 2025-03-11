import express from 'express';
import { register,login,logout,updateProfile } from '../conrollers/users.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';


const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateProfile").post(isAuthenticated,updateProfile);

export default router;