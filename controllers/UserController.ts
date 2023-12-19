const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');

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
    } catch (err) {
      console.log(err);
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: 'O email é obrigatório' });
      return;
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória' });
      return;
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(409).json({ message: 'Usuário não encontrado no sistema.' });
      return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(409).json({ message: 'Password incorreto.' });
      return;
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req: Request, res: Response) {
    let currentUser;

    console.log(req.headers.authorization);

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, 'nosso-secret');

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined; //para remover a senha do retorno
      console.log(decoded);
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }

  static async getUserById(req: Request, res: Response) {
    const id: string = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado no sistema.' });
      return;
    }

    res.status(200).json({ user });
  }
};
