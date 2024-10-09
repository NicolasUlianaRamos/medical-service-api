const User = require("../models/User");
const jwt = require("jsonwebtoken");
const getToken = require("../helpers/get-token.js");
const bcrypt = require("bcrypt");
const validator = require("validator");

require("dotenv").config();

// helpers
const createUserToken = require("../helpers/create-user-token.js");

module.exports = class LoginService{
  static async login(cpfCnpj, password, req, res) {
    if (!password && !cpfCnpj) {
      return res
        .status(422)
        .json({ message: "Cpf ou Cnpj e senha obrigatorios" });
    }

    if (!cpfCnpj) {
      return res.status(422).json({ message: "Cpf ou Cnpj é obrigatorio" });
    }
    if (!password) {
      return res.status(422).json({ message: "Senha obrigatoria" });
    }

    // check if user exists
    const user = await User.findOne({ cpfCnpj: cpfCnpj });

    if (!user) {
      return res.status(422).json({
        message: "Usuario ou senha invalidos",
      });
    }

    // check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({
        message: "Usuario ou senha invalidos",
      });
    }

    await createUserToken(user, req, res);
    return;
  }
};
