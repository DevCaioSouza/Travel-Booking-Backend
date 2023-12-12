const User = require('../models/User');

module.exports = class UserController {
  static async register(req: any, res: any) {
    res.json('Olá Travel Booking');
  }
};
