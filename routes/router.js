import express from "express";
import { signUp, login, getUser } from '../controller/userController.js'

const router = express.Router();

router.post("/register", signUp);
router.post("/login", login);
router.post("/getuser", getUser);
export default router;
