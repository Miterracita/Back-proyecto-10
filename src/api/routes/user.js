const { isAuth, isAdmin } = require("../../middlewares/auth");
const { registro, login, getUsers, getUserById } = require("../controllers/user");
const userRoutes = require("express").Router();

userRoutes.post("/registro", registro);
userRoutes.post("/login", login);
userRoutes.get("/allUsers", [isAdmin], getUsers);
userRoutes.get("/:id", [isAuth], getUserById);

module.exports = userRoutes;