import { Router } from "express"; 
import { getUsers, postUsers, putUsers, getUser, deleteUser, login } from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", getUsers );
router.get("/users/:id", getUser);
router.post("/users", postUsers);
router.put("/users/:id", putUsers);
router.delete("/users/:id", deleteUser);
router.post("/login", login);


export default router;

