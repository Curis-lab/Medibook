import express, { Router } from "express";
import { register, login, auth } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get('/auth', auth);

export default router;
