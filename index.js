import "dotenv/config";
import express from "express";
import indexRoutes from "./routes/index.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use(usersRoutes);

const port = 5000;

app.listen(port,console.log("http://localhost:"+port));