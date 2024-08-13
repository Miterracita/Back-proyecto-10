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
        // Realizará la búsqueda tanto si lo ponemos en mayúsculas como minúsculas
		// busca la palabra en cualquier parte del nombre
		// const eventByName = await Event.find({ name: new RegExp(name, 'i') });

		// Dividir la cadena de búsqueda en palabras individuales
		const words = name.split(' ').filter(word => word);

		console.log(words);
		
		// Buscar todas las palabras en cualquier orden
		const todas = new RegExp(words.map(word => `(?=.*${word})`).join(''), 'i');

		console.log(todas);

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

//consultar todos los eventos ordenados por fecha ascendente
const getEventByDate = async (req, res, next) => {

	try {
		// fecha actual
        const currentDate = new Date();

        // Buscar y ordenar los eventos por fecha de manera ascendente
        const events = await Event.find({ date: { $gte: currentDate } }).sort({ date: 1 });

        // Si no hay eventos futuros
        if (events.length === 0) {
            return res.status(404).json({ message: 'No se encontraron eventos futuros' });
        }

        return res.status(200).json(events);
    } catch (err) {
        console.error('Error al obtener eventos:', err);
        return res.status(500).json({ message: 'Error interno del servidor', error: err.message });
    }
};

//publicar un evento X USUARIOS REGISTRADOS
const postEvents = async (req, res, next) => {
    try {
        const newEvent = new Event(req.body);

		if (req.file) {//para publicar una sóla imagen
            newEvent.img = req.file?.path
        }

        const EventGuardado = await newEvent.save();
        return res.status(201).json(EventGuardado);
    } catch (error){
        return res.status(400).json("Error al publicar el evento");
    }
}

// confirmar asistencia a un evento
const postEventsConfirmation = async (req, res, next) => {
	try {
	  const { eventId } = req.params;
	  const userId = req.user._id;

		// Validar que eventId y userId sean válidos
		if (!eventId || !userId) {
			return res.status(400).json({ error: 'ID de evento o ID de usuario inválidos.' });
		}

	  // Buscar al usuario por su ID y actualizar el campo 'asistente' con el ID del evento
	  const user = await User.findByIdAndUpdate(
		userId,
		{ $addToSet: { asistente: eventId } },
		{ new: true }
	  );
  
	  if (!user) {
		return res.status(404).json({ error: 'Usuario no encontrado.' });
	  }
  
	  // Añadir el usuario al evento
		const event = await Event.findByIdAndUpdate(
			eventId,
			{ $addToSet: { user: userId } },
			{ new: true }
		);
	  
		if (!event) {
			return res.status(404).json({ error: 'Evento no encontrado.' });
		}
		  
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
		  name: user.userName,
		  email: user.email
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
			const event = await Event.findById(eventId).populate('user', 'userName email');
		
			if (!event) {
				return res.status(404).json({ error: 'Evento no encontrado.' });
			}
		
			// Devolver la lista de usuarios confirmados
			res.status(200).json(event.user);

		} catch (error) {
			console.error('Error al obtener asistentes:', error);
			res.status(500).json({ error: 'Error al obtener asistentes.' });
		}
	};

//actualizar un evento (por ID) - NO ES NECESARIO
// const updateEvents = async (req, res, next) => {
//     try {
//         const { id } = req.params;  
//         const newEvent = new Event(req.body);
//         newEvent._id = id;

			// if(req.file){ //actualizar nueva imagen y eliminar vieja
			// 	newEvent.img = req.file.path;            
			// 	const oldEvent = await Event.findById(id);
			// 	deleteFile(oldEvent.img); 
			// }

//         const eventActualizado = await Event.findByIdAndUpdate(id, newEvent, { new: true, });
//         return res.status(201).json(eventActualizado);
//     } catch (error){
//         return res.status(400).json("error");
//     }
// }

//borrar un evento - NO ES NECESARIO
// const deleteEvents = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const eventDelete = await Event.findByIdAndDelete(id);

			// deleteFile(eventDelete.img);

//         return res.status(200).json(eventDelete);
//     } catch (error){
//         return res.status(400).json("error");
//     }
// }

module.exports = {
    getEvents,
    getEventById,
	getEventByName,
	getEventByDate,
	getEventAsistentes,
    postEvents,
	postEventsConfirmation
}