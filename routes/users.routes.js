import {Router} from "express";
import {getUsers} from "..//controllers" ;
 
const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUsers);
router.post("/users", postUsers);
router.get("/users", getUsers);

