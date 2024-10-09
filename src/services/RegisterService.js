const User = require("../models/User");
const jwt = require("jsonwebtoken");
const getToken = require("../helpers/get-token.js");
const bcrypt = require("bcrypt");
const validator = require("validator");

require("dotenv").config();

// helpers
const createUserToken = require("../helpers/create-user-token.js");
const getUserByToken = require("../helpers/get-user-by-token.js");

module.exports = class RegisterService{
  static async register(name, cpfCnpj, password, city, position, req, res) {
    if (!password && !cpfCnpj) {
      throw new Error("CPF/CNPJ e senha obrigatorios");
    }
  
    if (!cpfCnpj) {
      throw new Error("CPF ou Cnpj é obrigatorio");
    }
    
    if (!password) {
      throw new Error("Senha obrigatoria");
    }

    // Verificar se a senha atende aos critérios (por exemplo, mínimo de 6 caracteres)
    if (!validator.isLength(password, { min: 6 })) {
      throw new Error("A senha deve ter no mínimo 6 caracteres");
    }
  
    if (!city) {
      throw new Error("Cidade obrigatoria");
    }

    //check if user is admin
    const token = getToken(req);
    const userById = await getUserByToken(token);

    if (userById.position !== "Admin") {
      throw new Error("Voce nao tem autorizacao para criar uma conta");
    }

    // check if user exists
    const cpfExists = await User.findOne({cpfCnpj: cpfCnpj})

    if(cpfExists){
        res.status(422).json({
            message: "Por favor, escreva outro cpf"
        })
        return
    }

    // encrypt password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
      name: name,
      cpfCnpj: cpfCnpj,
      password: passwordHash,
      city: city,
      position: position,
    });

    const newUser = await user.save();

    return newUser;
  }

  static async checkUser(req, res) {
    let currentUser;
    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }
    return currentUser;
  }

  static async checkUserAdmin(req, res){
    let currentUser;
    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

      currentUser = await User.findById(decoded.id);

      if(currentUser.position !== "Admin"){
        throw new Error("Voce nao pode acessar a pagina de criação de contas! Somente admins podem!");
      }

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }
    return currentUser;
  }
};
