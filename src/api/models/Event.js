const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    date: { type: String, trim: true, required: true },
    time: {type: String, trim: true, requiered: false },
    img: { type: String, required: false },
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
