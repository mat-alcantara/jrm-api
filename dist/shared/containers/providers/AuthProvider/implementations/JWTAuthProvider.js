"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _authConfig = _interopRequireDefault(require("../../../../../config/authConfig"));

var _AppError = _interopRequireDefault(require("../../../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class JWTAuthProvider {
  async generateToken(id) {
    // Create a new valid token with id and userType as payloads
    const token = (0, _jsonwebtoken.sign)({
      id
    }, _authConfig.default.secret, {
      expiresIn: _authConfig.default.expiresIn
    });
    return token;
  }

  verifyToken(token) {
    try {
      // Verify is the token if valid
      const decoded = (0, _jsonwebtoken.verify)(token, _authConfig.default.secret); // Return the response from jwt.verify forcing the format as ITokenPayload

      return decoded;
    } catch {
      // Throw a new AppError if jwt.verify returns error
      throw new _AppError.default('Token does not match', 401);
    }
  }

}

exports.default = JWTAuthProvider;