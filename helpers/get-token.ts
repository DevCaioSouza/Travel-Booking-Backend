import { Request } from 'express';

const getToken = (req: Request) => {
  const authHeader = req.headers.authorization;

  //técnica pra pegar somente o que vem depois do Bearer (Bearer uyd98sb5djk...)
  const token = authHeader?.split(' ')[1];

  return token;
};

module.exports = getToken;
