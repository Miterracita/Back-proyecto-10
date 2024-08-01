const mongoose = require('mongoose');

const attendleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    events: [{ type: mongoose.Types.ObjectId, ref: "events", required: false }],
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "users", required: false }]
  },
  {
    timestamps: true,
    collection: "attendles"
  }
);

const Attendle = mongoose.model('attendles', attendleSchema, 'attendles');
module.exports = Attendle;
