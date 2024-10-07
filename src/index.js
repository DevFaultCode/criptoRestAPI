import express  from "express";
import pricesRoutes from "./routes/prices.routes.js";
import converterRoutes from "./routes/converter.routes.js";

// Base de datos
import db from "./db.js"

// Testeo DB
try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const app = express()
const PORT = process.env.PORT | 3000

// Middleware
app.use(express.json());

app.use(pricesRoutes);

app.use(converterRoutes);

app.listen(PORT, console.log(`El servidor esta corriendo en el puerto: ${PORT}`));