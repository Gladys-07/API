// index.js

const express = require("express");
const routes = require("./routes/index.routes");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);

// Carpeta pública
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
