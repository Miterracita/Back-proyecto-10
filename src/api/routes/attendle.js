const { isAuth, isAdmin } = require("../../middlewares/auth");
const { getAttendle, getAttendleById, getUserAttendle } = require("../controllers/attendle");
const attendleRoutes = require("express").Router();

attendleRoutes.get("/listadoAsistentes", [isAdmin], getAttendle);
attendleRoutes.get("/:id", [isAuth], getAttendleById);
// attendleRoutes.get("/:id/checkAsistencia", [isAuth], getUserAttendle);
attendleRoutes.get("events/:eventId/checkAsistencia", [isAuth], getUserAttendle);


module.exports = attendleRoutes;