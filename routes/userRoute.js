import express from "express"
import { blockUser, createUser, getUserById, getUsers, loginUser } from "../controllers/userController.js";

const userRouter =  express.Router();

userRouter.post("/",createUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/blockuser/:id", blockUser);

export default userRouter;