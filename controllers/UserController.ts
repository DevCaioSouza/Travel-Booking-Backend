const User = require('../models/User');
import { Request } from 'express';
import { Response } from 'express';

module.exports = class UserController {
  static async register(req: Request, res: Response) {
    const { name, email, phone, password, confirmpassword } = req.body;

    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório' });
      return;
    }

    if (!email) {
      res.status(422).json({ message: 'O email é obrigatório' });
      return;
    }

    if (!phone) {
      res.status(422).json({ message: 'O phone é obrigatório' });
      return;
    }

    if (!password) {
      res.status(422).json({ message: 'O password é obrigatório' });
      return;
    }

    if (!confirmpassword) {
      res.status(422).json({ message: 'A confirmação de senha é obrigatória' });
      return;
    }

    if (password !== confirmpassword) {
      res
        .status(422)
        .json({ message: 'A confirmação de senha está incorreta.' });
    }

    //check if user exists

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(422).json({ message: 'Email já cadastrado' });
    }

    return res.json("Tudo certo.")
  }
};
