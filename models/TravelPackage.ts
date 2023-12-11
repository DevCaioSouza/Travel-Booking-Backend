import { boolean } from 'webidl-conversions';

const mongoose = require('../db/conn');

const { Schema } = mongoose;

const User = mongoose.model(
  'TravelPackage',
  new Schema(
    {
      destination: {
        type: String,
        required: true,
      },
      included: {
        type: Array,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      available: {
        type: Boolean,
      },
      user: Object,
      buyer: Object,
    },
    { timestamps: true }
  )
);

// Aqui é para sair o bug das consts duplicadas
export {};
