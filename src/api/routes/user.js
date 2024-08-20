const { isAuth, isAdmin } = require("../../middlewares/auth");
const { registro, login, verifyToken, getUsers, getUserById } = require("../controllers/user");
const userRoutes = require("express").Router();

userRoutes.post("/registro", registro);
userRoutes.post("/login", login);
userRoutes.get("/allUsers", [isAdmin], getUsers);
userRoutes.get("/:id", [isAuth], getUserById);
userRoutes.get("/verify-token", verifyToken);

module.exports = userRoutes;