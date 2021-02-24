export default {
  secret: process.env.JWT_SECRET || 'teste',
  expiresIn: '7d',
};
