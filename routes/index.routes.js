// index.routes.js

import { Router } from "express"; //aqui importa con llavecitas porque solo es una función, sin ellas llamas a los modulos
import { saludo, ping, polo, hola } from "../controllers/index.controllers.js";

const router = Router();

//todos los controladores tienen por lo menos dos parametros
//en rest no pueden existir dos métodos get en la misma dirección
//para no tener que estar deteniendo el servidor cada que hay cambios instalas npm i nodemon
router.get("/", saludo);
router.get("/ping", ping);
router.get("/marco", polo);
router.get("/Hola", hola)

export default router;