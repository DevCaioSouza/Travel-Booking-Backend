const jwt = require('jsonwebtoken');

const createUserToken = async (user: any, req: any, res: any) => {
  //criando o token
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    'nosso-secret'
  );

  //retornando token
  res.status(200).json({
    message: 'Autenticação feita com sucesso.',
    token: token,
    userId: user._id,
  });
};

export {};

module.exports = createUserToken;
