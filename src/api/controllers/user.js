const { generateSing } = require("../../utils/jwt");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//postUser - create - CREAR UN NUEVO USUARIO, POR DEFECTO SERÁ CON ROL USER, SI TIENE QUE SER ADMIN CAMBIAR POR BBDD
const registro = async (req, res, next) => {
  try {

    const newUser = new User(req.body);

    //al crear un usuario asignaremos por defecto el rol user
    newUser.rol = "user";

    //comprobamos si un nombre de usuario ya existe
    const userDuplicated = await User.findOne ({
      userName: req.body.userName,
      email: req.body.email
    });

    //si un usuario ya existe nos salta un mensaje de aviso y no crea el nuevo usuario
    if (userDuplicated) {
      return res.status(400).json("El nombre de usuario o email ya existe");
    }
    
    const userSaved = await newUser.save();

    return res.status(200).json(userSaved);

  } catch (error) {
    return res.status(400).json(error);
  }
}

//IDENTIFICARTE CORRECTAMENTE, COMPROBARNDO QUE EL USUARIO EXISTE Y LA IDENTIFICACIÓN ES CORRECTA
const login = async (req, res, next) => {

  try {
    
    const user = await User.findOne({ userName: req.body.userName });
    
    if (!user){
      return res.status(400).json("Este nombre de usuario no existe");   
    }    
    //comparamos el password introducido con el usuario, en el caso de que el usuario exista
    if(bcrypt.compareSync(req.body.password, user.password)){
      
      //lo que pasa cuando te logueas con jsonwebtoken
      const token = generateSing(user._id);

      // return res.status(200).json(`Te has logueado como usuario ${user.userName} rol: ${user.rol} y token: ${token}`);
      return res.status(200).json({ token, user })
    
    } else {       
      return res.status(400).json("La contraseña es incorrecta");
    }

  } catch (error) {
    return res.status(400).json(error);
  }
}

//ver todos los usuarios
const getUsers = async (req, res, next) => {

  try {
    const users = await User.find();
    return res.status(200).json(users);

  } catch (error){
    return res.status(400).json(error);
  }
}

//consultar usuario por ID - NO ES NECESARIO
const getUserById = async (req, res, next) => {
	const id = req.params.id;
	try {
		const user = await User.findById(id);
		if (user) {
			return res.status(200).json(user);
		} else {
			return res.status(404).json('No se ha encontrado ningún usuario con este id');
		}
	} catch (err) {
		return res.status(500).json(err);
	}
}


module.exports = { 
  registro,
  login,
  getUsers,
  getUserById,
};