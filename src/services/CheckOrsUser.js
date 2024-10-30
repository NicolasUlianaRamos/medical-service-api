const User = require('../models/User');
const OrsModel = require("../models/OrsModel");
const getToken = require("../helpers/get-token.js");
const getUserByToken = require("../helpers/get-user-by-token.js");
const jwt = require("jsonwebtoken");


module.exports =  class CheckOrsUser {
  async checkOrsUser(req, res, next) {
    const { id } = req.params;

    let currentOrs;
    if (req.headers.authorization) {
      const token = getToken(req);
      const user = await getUserByToken(token);
      
      const ors = await OrsModel.find({ _id: id, idUser: user._id })

      if(!ors){
        throw new Error("Voce nao pode acessar a pagina de edição dessa ORS! Você só pode editar as suas ORS.");
      }

      currentOrs = ors;
    }
    return currentOrs;
    next();
  }
}