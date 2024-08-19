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

module.exports = {
    getAttendle,
    getAttendleById,
}