import express from "express";
//Se encarga de las reglas de conexión como Postman, Angular, React o Veujs(conexión del back con los front)
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";

//Segunda parte
import role from "./routes/role.js";

//Ejecuta esta linea y detecta el archivo .env para usar las variables de entorno
dotenv.config();

const app = express();
//Nuestra aplicación solo va enviar o recibir archivos Json
app.use(express.json());
app.use(cors());
//Segunda parte
app.use("/api/role", role);
//Listen nos sirve para conectarnos a los puertos de Express
//Para colococar un mensaje que no sea una variable tenemos que colococar esto () => console.log("")
app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: " + process.env.PORT)
);
//Conexión a nuestra base de datos en Mongo
db.dbConnection();
