const RegisterService = require("../services/RegisterService.js");
const LoginService = require("../services/LoginService.js");
const GetAllUsers = require("../services/GetAllUsersService.js");
const CheckOrsUser = require("../services/CheckOrsUser.js")

module.exports = class UserController {
  static async register(req, res) {
    const { name, cpfCnpj, password, city, position } = req.body;

    try {
      const response = await RegisterService.register(
        name,
        cpfCnpj,
        password,
        city,
        position,
        req,
        res
      );

      res.status(200).json(response)
    } catch (err) {
      res.status(400).json({ message: "Nao foi possivel criar conta", err: err.message });
    }
  }

  static async login(req, res) {
    const { cpfCnpj, password } = req.body;
    try {
      // O LoginService já envia a resposta, então não precisa de um novo res.status(200)
      await LoginService.login(cpfCnpj, password, req, res);
    } catch (err) {
      // Somente lida com o erro, caso o LoginService falhe
      res.status(400).json({ message: "Erro ao logar", err: err.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await GetAllUsers.getAllUsers(req);
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: "Erro ao buscar", err: error.message });
    }
  }
  
  

  static async checkUser(req, res) {
    try {
      const response = await RegisterService.checkUser(req, res);

      res.status(200).json({ response });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Erro ao visualizar a pagina", err: err.message });
    }
  }

  static async checkUserAdmin(req, res){
    try{
      const response = await RegisterService.checkUserAdmin(req, res);

      res.status(200).json({ response });
    } catch(err){
      res.status(400).json({ message: "Erro ao visualizar a pagina", err: err.message })
    }
  }

  static async checkOrsUser(req, res, next) {
    try{
      const response = await CheckOrsUser.checkOrsUser(req, res, next);
      res.status(200).json({ response });

    } catch(err){
      res.status(400).json({ message: "Erro ao visualizar a pagina", err: err.message })
    }
  }
};
