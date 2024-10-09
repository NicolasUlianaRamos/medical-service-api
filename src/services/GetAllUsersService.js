const User = require("../models/User");
const getToken = require("../helpers/get-token.js");
const getUserByToken = require("../helpers/get-user-by-token.js");


module.exports = class getAllUsersService {
  static async getAllUsers(req){
    //check if user is admin
    const token = getToken(req);
    const userById = await getUserByToken(token);

    if (userById.position !== "Admin") {
      throw new Error("Voce nao tem autorizacao ver os usuarios");
    }

    const users = await User.find().select('-password')

    return users
  }
};
