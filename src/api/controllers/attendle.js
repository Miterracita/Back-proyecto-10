const Attendle = require("../models/Attendle");
const User = require("../models/User");

//consultar todos los asistentes registrados
const getAttendle = async (req, res, next) => {
    try {
        const attendlees = await Attendle.find().populate('user').populate('events'); // Populando los campos 'user' y 'events'
        return res.status(200).json(attendlees);
    } catch (error) {
        return res.status(400).json({ error: "Error, No es posible mostrar todos los asistentes", details: error });
    }
}


// consultar listado de asistentes de un evento con determinado id

const getAttendleById = async (req, res, next) => {
    try {
        // const { eventId } = req.body;
        const { eventId } = req.params;
    
        if (!eventId) {
          return res.status(400).json({ error: 'ID de evento inválido.' });
        }
    
        const asistentes = await User.find({ 'asistente': eventId }).select('userName email');
    
        if (!asistentes.length) {
          return res.status(404).json({ error: 'No se encontraron asistentes para este evento.' });
        }
    
        res.status(200).json(asistentes);
      } catch (error) {
        console.error('Error al obtener asistentes:', error);
        res.status(500).json({ error: 'Error al obtener asistentes.' });
      }
}

//comprobar si un usuario x ha confirmado asistencia a un evento con id x
const getUserAttendle = async (req, res, next) => {
  try {
      const { eventId } = req.params;
      const userId = req.user.id;

      if (!eventId) {
          return res.status(400).json({ error: 'ID de evento inválido.' });
      }

      const user = await User.findOne({ '_id': userId, 'asistente': eventId });

      if (!user) {
          return res.status(200).json({ asistenciaConfirmada: false });
      }

      res.status(200).json({ asistenciaConfirmada: true });
  } catch (error) {
      console.error('Error al verificar asistencia del usuario:', error);
      res.status(500).json({ error: 'Error al verificar asistencia del usuario.' });
  }
}

// const getAttendleById = async (req, res, next) => {
//     const id = req.params.id;
//     try {
//         const attendle = await Attendle.findOne({ user: id }).populate('user').populate('events'); 
//         // Buscar por el ID de usuario y populando los campos 'user' y 'events'
//         if (attendle) {
//             return res.status(200).json(attendle);
//         } else {
//             return res.status(404).json({ error: 'No se ha encontrado ningún asistente con este ID de usuario' });
//         }
//     } catch (err) {
//         return res.status(500).json({ error: "Error al consultar el asistente", details: err });
//     }
// }

module.exports = {
    getAttendle,
    getAttendleById,
    getUserAttendle,
}