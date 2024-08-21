const { deleteFile } = require("../../utils/deleteFiles");
const Event = require("../models/Event");
const Attendle = require("../models/Attendle");
const User = require("../models/User");

//consultar todos los eventos
const getEvents = async (req, res, next) => {
    try {
        const eventos = await Event.find();
        return res.status(200).json(eventos);
    } catch (error){
        return res.estatus(400).json("No es posible consultar todos los eventos");
    }
}

// consultar un evento con determinado id
const getEventById = async (req, res, next) => {
	const id = req.params.id;
	try {
		const evento = await Event.findById(id);
		if (evento) {
			return res.status(200).json(evento);
		} else {
			return res.status(404).json('No se ha encontrado ningún evento con este id');
		}
	} catch (err) {
		return res.status(500).json(err);
	}
}

// consultar un evento por su nombre
const getEventByName = async (req, res, next) => {
	const { name } = req.query;

	if (!name) {
        return res.status(400).json({ message: 'El parámetro "name" es requerido' });
    }

	try {
		// Dividir la cadena de búsqueda en palabras individuales
		const words = name.split(' ').filter(word => word);
		// Buscar todas las palabras en cualquier orden
		const todas = new RegExp(words.map(word => `(?=.*${word})`).join(''), 'i');
		// Buscar eventos que coincidan con todas las palabras
		const eventsByName = await Event.find({ name: todas });        

        // Si no se encuentra ningún evento
        if (eventsByName.length === 0) {
            return res.status(404).json({ message: 'No se encontraron eventos que coincidan con la búsqueda' });
        }

        // Si se encuentra el evento, devolverlo
        return res.status(200).json(eventsByName);
    } catch (err) {
		console.error('Error al obtener el evento:', err);
        return res.status(500).json({ message: 'Error interno del servidor', error: err.message });
    }
}

//publicar un evento X USUARIOS REGISTRADOS
const postEvents = async (req, res, next) => {
    try {
    //     const newEvent = new Event(req.body);

	// 	if (req.file) {//para publicar una sóla imagen
    //         newEvent.img = req.file?.path
    //     }

    //     const EventGuardado = await newEvent.save();
    //     return res.status(201).json(EventGuardado);

	const { name, description, date, time, location } = req.body;

	const newEvent = new Event({
		name,
		description,
		date,
		time,
		location,
		img: req.file ? req.file.path : null // Guardar la URL de la imagen si existe
	});

	const EventGuardado = await newEvent.save();
	return res.status(201).json(EventGuardado);

	} catch (error) {

	console.error("Error al publicar el evento:", error);
	return res.status(500).json({ message: "Error al publicar el evento", error: error.message });
	}
}

const postEventsConfirmation = async (req, res, next) => {
	try {
	  const { eventId } = req.params;
	  const userId = req.user._id;
  
	  // Validar que eventId y userId sean válidos
	  if (!eventId || !userId) {
		return res.status(400).json({ error: 'ID de evento o ID de usuario inválidos.' });
	  }
  
	  // Buscar el evento por su ID
	  const event = await Event.findById(eventId);

	  if (!event) {
		return res.status(404).json({ error: 'Evento no encontrado.' });
	  }
  
	  // Comprobar si el usuario ya está en la lista de asistentes
	  const isUserAttending = event.asistentes.some(attendee => attendee.toString() === userId.toString());
  
	  if (isUserAttending) {
		return res.status(200).json({ message: 'Ya has confirmado tu asistencia a este evento.' });
	  }
  
	  // Si el usuario no está en la lista, añadirlo
	  event.asistentes.push(userId);
	  await event.save();
  
	  // Crear o actualizar la colección Attendle
	  let attendle = await Attendle.findOne({ user: userId });
	  if (attendle) {
		// Si ya existe, actualizar
		attendle.events.addToSet(eventId);
	  } else {
		// Si no existe, crear uno nuevo
		attendle = new Attendle({
		  user: userId,
		  events: [eventId],
		  name: req.user.userName,
		  email: req.user.email
		});
	  }
	  await attendle.save();
  
	  res.status(200).json({ message: 'Asistencia confirmada correctamente.', attendle: attendle });
  
	} catch (error) {
	  console.error('Error al confirmar asistencia:', error);
	  res.status(500).json({ error: 'Error al confirmar asistencia.' });
	}
  };

  //mostrar los usuarios confirmados a un evento con determinado id
	const getEventAsistentes = async (req, res) => {
		try {
			const { eventId } = req.params; // Obtener el ID del evento desde los parámetros de la URL
		
			if (!eventId) {
				return res.status(400).json({ error: 'ID de evento inválido.' });
			}
		
			// Buscar el evento por su ID y poblar el campo `user` con los detalles de los usuarios
			const event = await Event.findById(eventId).populate('asistentes', 'userName email');
		
			if (!event) {
				return res.status(404).json({ error: 'Evento no encontrado.' });
			}
		
			// Devolver la lista de usuarios confirmados
			res.status(200).json(event.asistentes);

		} catch (error) {
			console.error('Error al obtener asistentes:', error);
			res.status(500).json({ error: 'Error al obtener asistentes.' });
		}
	};

//borrar un evento
const deleteEvent = async (req, res, next) => {
    try {
        // const { id } = req.params;
		const { eventId } = req.params
        const eventDelete = await Event.findByIdAndDelete(eventId);

		if (!eventDelete) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }

        // Eliminar el archivo asociado al evento
        deleteFile(eventDelete.img);
        return res.status(200).json({ message: "Evento eliminado correctamente", event: eventDelete });

    } catch (error) {
        console.error("Error al eliminar el evento:", error);
        return res.status(500).json({ message: "Error al eliminar el evento", error: error.message });
    }
}

module.exports = {
    getEvents,
    getEventById,
	getEventByName,
	getEventAsistentes,
    postEvents,
	postEventsConfirmation,
	deleteEvent,
}