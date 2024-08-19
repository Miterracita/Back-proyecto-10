const { isAuth, isAdmin } = require("../../middlewares/auth");
const { getAttendle, getAttendleById } = require("../controllers/attendle");
const attendleRoutes = require("express").Router();

attendleRoutes.get("/listadoAsistentes", [isAdmin], getAttendle);
attendleRoutes.get("/:id", [isAuth], getAttendleById);

module.exports = attendleRoutes;