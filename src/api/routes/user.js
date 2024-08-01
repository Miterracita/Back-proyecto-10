// const { isAuth } = require("../../middlewares/auth");
const { registro, login, getUsers, getUserById } = require("../controllers/user");
const userRoutes = require("express").Router();

userRoutes.post("/registro", registro);
userRoutes.post("/login", login);
userRoutes.get("/allUsers", getUsers);
userRoutes.get("/:id", getUserById);

// userRoutes.post("/confirmarAsistencia", [isAuth], postEventsConfirmation);


module.exports = userRoutes;