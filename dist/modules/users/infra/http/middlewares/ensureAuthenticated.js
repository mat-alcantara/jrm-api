"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthentication;

var _JWTAuthProvider = _interopRequireDefault(require("../../../../../shared/containers/providers/AuthProvider/implementations/JWTAuthProvider"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authProvider = new _JWTAuthProvider.default();

function ensureAuthentication(req, res, next) {
  // Take the bearer token from headers.authorization
  const authHeader = req.headers.authorization; // If there's no token, throw a new error

  if (!authHeader) {
    throw new _AppError.default('JWT token is missing', 401);
  } // Split the token from the format 'bearer token' and take the token itself


  const [, token] = authHeader.split(' '); // Verify if the token is valid

  const decoded = authProvider.verifyToken(token); // Take the user id from the token

  const {
    sub
  } = decoded; // Store the user id that is logged in req.user.id

  req.user = {
    id: sub
  };
  return next();
}