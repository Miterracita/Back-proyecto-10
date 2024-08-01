const { isAuth } = require("../../middlewares/auth");
const { getEvents, getEventById, postEvents, postEventsConfirmation, getEventAsistentes } = require("../controllers/event");
const eventRoutes = require("express").Router();

eventRoutes.get("/events", getEvents);
eventRoutes.get("/:id", getEventById);
eventRoutes.post("/nuevoEvento", [isAuth], upload.single('img'), postEvents);

eventRoutes.post("/:eventId/confirmarAsistencia", [isAuth], postEventsConfirmation);
eventRoutes.get("/:eventId/asistentes", [isAuth], getEventAsistentes);

module.exports = eventRoutes;