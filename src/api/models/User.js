const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    userName: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    rol: { type: String, enum: ["admin", "user"], required: false},
    asistente: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events', required: false }]
  },
  {
    timestamps: true,
    collection: "users"
  }
);

//encriptamos la contraseña
userSchema.pre("save", function() {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model('users', userSchema, 'users');
module.exports = User;