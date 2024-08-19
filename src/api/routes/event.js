const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require('../../middlewares/file')
const { getEvents, getEventById, getEventByName, postEvents, postEventsConfirmation, getEventAsistentes, deleteEvent } = require("../controllers/event");
const eventRoutes = require("express").Router();

eventRoutes.get("/events", getEvents);
eventRoutes.get("/:id", getEventById);
eventRoutes.get("/eventList/:name", getEventByName);
eventRoutes.get("/:eventId/asistentes", [isAuth], getEventAsistentes);

eventRoutes.post("/nuevoEvento", [isAuth], upload.single('img'), postEvents);
eventRoutes.post("/:eventId/confirmarAsistencia", [isAuth], postEventsConfirmation);

eventRoutes.get("/:eventId/borrar", [isAdmin], deleteEvent);

module.exports = eventRoutes;