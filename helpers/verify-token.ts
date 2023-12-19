import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const getToken = require('./get-token');

const verifyToken = async (req: any, res: any, next: any) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Acesso negado (NO AUTH).' });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado.' });
  }

  try {
    const verified = jwt.verify(token, 'nosso-secret');
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Token inválido' });
  }
};

module.exports = verifyToken;
