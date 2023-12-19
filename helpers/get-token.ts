import { Request } from 'express';

//essa função recebe a requisição como parâmetro e extrai o token nela contido
const getToken = (req: Request) => {
  const authHeader = req.headers.authorization;

  //técnica pra pegar somente o que vem depois do Bearer (Bearer uyd98sb5djk...)
  const token = authHeader?.split(' ')[1];

  return token;
};

module.exports = getToken;
