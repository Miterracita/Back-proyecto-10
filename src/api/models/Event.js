const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    date: { type: Date, trim: true, required: true },
    time: {type: String, trim: true, required: false },
    img: { type: String, required: false, default: "https://res.cloudinary.com/dq2daoeex/image/upload/v1723579439/API-Rest-FILES/imagen_por_defecto_dldpud.jpg" },
    location: { type: String, trim: true, required: false },
    description: { type: String, trim: true, required: false },
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "users", required: false }]
  },
  {
    timestamps: true,
    collection: "events"
  }
);

const Event = mongoose.model('events', eventSchema, 'events');
module.exports = Event;
