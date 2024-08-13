const { isAuth } = require("../../middlewares/auth");
const upload = require('../../middlewares/file')
const { getEvents, getEventById, getEventByName, postEvents, postEventsConfirmation, getEventAsistentes } = require("../controllers/event");
const eventRoutes = require("express").Router();

eventRoutes.get("/events", getEvents);
eventRoutes.get("/:id", getEventById);
eventRoutes.get("/eventList/:name", getEventByName);

eventRoutes.post("/nuevoEvento", [isAuth], upload.single('img'), postEvents);

eventRoutes.post("/:eventId/confirmarAsistencia", [isAuth], postEventsConfirmation);
eventRoutes.get("/:eventId/asistentes", [isAuth], getEventAsistentes);

module.exports = eventRoutes;