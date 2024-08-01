const events = require("../../data/events");
const Event = require("../../api/models/Event");
const mongoose = require("mongoose");

// Conexión a la base de datos
mongoose.connect("mongodb+srv://anadiseny:WSeQv7W2Q2DKhrYV@cluster0.woqwfnh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(async () => {
    try {
      // Buscamos todos los eventos
      const allEvents = await Event.find();

      // Si existen eventos previamente, dropearemos (borraremos) la colección
      if (allEvents.length) {
        await Event.collection.drop(); // La función drop borra la colección events
        console.log("Eventos existentes eliminados de la base de datos.");
      }

      // Insertamos muchos eventos
      await Event.insertMany(events);
      console.log("Eventos insertados correctamente!");
      console.log(events);
    } catch (error) {
      console.error(`Error: ${error}`);
    } finally {
      // Nos desconectamos de la base de datos
      await mongoose.disconnect();
      console.log("Desconectamos de la BBDD");
    }
  })
  .catch((err) => console.error(`Error conectando a la base de datos: ${err}`));