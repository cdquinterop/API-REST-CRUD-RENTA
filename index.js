//Packages
const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");

//milddlewears
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//routes

app.use(require("./routers/index"));

//execution server web
app.get("/", (req, res) => {
  res.status(200).send("Bienvenidos al Api Rest de Renta").end();
});
app.listen(process.env.PORT || 4000);
console.log("server running in http://localhost:4000");
