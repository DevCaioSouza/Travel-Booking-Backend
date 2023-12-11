const mongoose = require('../db/conn');

const { Schema } = mongoose;

const User = mongoose.model(
  'User',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

// Aqui é para sair o bug das consts duplicadas
export {};

module.exports = User;
