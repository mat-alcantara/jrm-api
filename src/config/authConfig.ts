export default {
  secret: process.env.JWT_SECRET || 'default',
  expiresIn: '30d',
};
