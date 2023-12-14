const User = require('../models/User');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/create-user-token');

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
      res.status(409).json({ message: 'Email já cadastrado' });
      return;
    }

    //criar senha hasheada
    const salt = await bcrypt.genSalt(12); //gerar salt de 12 chars adicionais p/ dificultar +
    const passwordHash = await bcrypt.hash(password, salt);

    //  ## CRIAR USER!!
    //quando o nome da variável é igual ao da propriedade, não precisa atribuir valor
    //ex: {name: name} = {name}
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);

      // res.status(201).json({
      //   message: 'Usuário criado.',
      //   newUser,
      // });
    } catch (err) {
      // res.status(500).json({ message: err });
      console.log(err);
    }

    // return res.json("Tudo certo.")
  }
};
