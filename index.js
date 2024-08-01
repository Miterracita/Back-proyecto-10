require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const { connectCloudinary } = require("./src/config/cloudinary");
const userRoutes = require("./src/api/routes/user");
const eventRoutes = require("./src/api/routes/event");
const attendleRoutes = require("./src/api/routes/attendle");
const cors = require("cors");

const app = express();

connectDB();
connectCloudinary();

//autorizamos a realizar peticiones al back
app.use(cors());

// para que pueda ser capaz de entender el formato .json
app.use(express.json());

app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/asistentes", attendleRoutes);

app.use("*", (req, res, next) => {
    return res.status(404).json("Ruta no encontrada")
})

app.listen(3000, () => {
    console.log("El servidor está funcionando en http://localhost:3000");
})
