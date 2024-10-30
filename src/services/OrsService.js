const OrsModel = require("../models/OrsModel");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class OrsService {
  static async create(data, req, res) {
    if (!data.client) {
      throw new Error("Nome do cliente é obrigatório");
    }
    if (!data.address) {
      throw new Error("Endereco é obrigatória");
    }
    if (!data.equipment) {
      throw new Error("Equipamento é obrigatório");
    }
    if (!data.brand) {
      throw new Error("Marca é obrigatória");
    }
    if (!data.model) {
      throw new Error("Modelo é obrigatório");
    }
    if (!data.inventoryNumber) {
      throw new Error("Número de inventário é obrigatório");
    }
    if (!data.accessories) {
      throw new Error("Acessórios são obrigatórios");
    }
    if (!data.observations) {
      throw new Error("Observação é obrigatória");
    }
    if (!data.realizedServices) {
      throw new Error("Serviços realizados são obrigatórios");
    }
    if (!data.technicalSign) {
      throw new Error("Assinatura técnica é obrigatória");
    }
    if (!data.dateDelivery) {
      throw new Error("Data de entrega é obrigatória");
    }
    if (!data.clientSign) {
      throw new Error("Assinatura do cliente é obrigatória");
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    const ors = new OrsModel({
      userCpfCnpj: user.cpfCnpj,
      idUser: user._id,
      client: data.client,
      contact: data.contact,
      address: data.address,
      phone: data.phone,
      cnpj: data.cnpj,
      email: data.email,
      dateCall: data.dateCall,
      duration: data.duration,
      equipment: data.equipment,
      brand: data.brand,
      model: data.model,
      serial: data.serial,
      inventoryNumber: data.inventoryNumber,
      accessories: data.accessories,
      problem: data.problem,
      observations: data.observations,
      realizedServices: data.realizedServices,
      quantity: data.quantity,
      descriptionOfParts: data.descriptionOfParts,
      technicalSign: data.technicalSign,
      nameTechSign: data.nameTechSign,
      dateDelivery: data.dateDelivery,
      clientSign: data.clientSign,
      nameClientSign: data.nameClientSign,
      status: data.status,
    });

    const newOrs = await ors.save();

    return newOrs;
  }

  static async getByUserId(req) {
    //  Number of items per page (can also be dynamic)
    const pageLimit = parseInt(req.query.limit) || 5;
    const pageActual = parseInt(req.query.page) || 1;

    const token = getToken(req);
    const user = await getUserByToken(token);

    const ors = await OrsModel.find({ idUser: user._id });

    const orsInvert = ors.reverse();

    // Calculate the offset (initial position of the items on the page).
    const offset = (pageActual - 1) * pageLimit;

    // Slice to get only the publications from the current page
    const orsPageds = orsInvert.slice(offset, offset + pageLimit);

    // Calculate the total of pages
    const totalPages = Math.ceil(orsInvert.length / pageLimit);

    const newOrs = {
      page: pageActual,
      limit: pageLimit,
      totalPages: totalPages,
      ors: orsPageds,
    };

    return newOrs;
  }

  static async getSearch(req) {
    // Captura o parâmetro de busca da query string
    const { client, status, searchAddress, startDate } = req.query;

    // Captura o token do usuário e busca o usuário correspondente
    const token = getToken(req);
    const user = await getUserByToken(token);

    const filters = {
      idUser: user._id, // Sempre incluir o filtro do usuário
      client: { $regex: new RegExp(client, "i") }, // Filtro de cliente usando regex
    };

    // Verifica se um status foi fornecido e o adiciona ao filtro
    if (status) {
      filters.status = status; // Adiciona o filtro de status se estiver definido
    }

    // Verifica se um endereço foi fornecido e o adiciona ao filtro
    if (searchAddress) {
      filters.address = { $regex: new RegExp(searchAddress, "i") }; // Adiciona filtro para endereço usando regex
    }

    // Verifica se as datas de entrega foram fornecidas e as adiciona ao filtro
    if (startDate) {
      filters.dateDelivery = startDate; // Filtro para startDate
    }

    // Realiza a busca com os filtros construídos dinamicamente
    const ors = await OrsModel.find(filters);

    return ors;
  }

  static async getSearchAdmin(req) {
    // Captura o parâmetro de busca da query string
    const { client, status, searchAddress, startDate, idUser } = req.query;

    // Captura o token do usuário e busca o usuário correspondente
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (user.position !== "Admin") {
      throw new Error("Voce nao tem autorizacao ver os usuarios");
    }

    const filters = {
      idUser: idUser, // Sempre incluir o filtro do usuário
      client: { $regex: new RegExp(client, "i") }, // Filtro de cliente usando regex
    };

    // Verifica se um status foi fornecido e o adiciona ao filtro
    if (status) {
      filters.status = status; // Adiciona o filtro de status se estiver definido
    }

    // Verifica se um endereço foi fornecido e o adiciona ao filtro
    if (searchAddress) {
      filters.address = { $regex: new RegExp(searchAddress, "i") }; // Adiciona filtro para endereço usando regex
    }

    // Verifica se as datas de entrega foram fornecidas e as adiciona ao filtro
    if (startDate) {
      filters.dateDelivery = startDate; // Filtro para startDate
    }

    // Realiza a busca com os filtros construídos dinamicamente
    const ors = await OrsModel.find(filters);

    return ors;
  }

  static async orsByUserId(id, req) {
    //  Number of items per page (can also be dynamic)
    const pageLimit = parseInt(req.query.limit) || 5;
    const pageActual = parseInt(req.query.page) || 1;

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (user.position !== "Admin") {
      throw new Error("Voce nao tem autorizacao ver os usuarios");
    }

    const ors = await OrsModel.find({ idUser: id });

    const orsInvert = ors.reverse();

    // Calculate the offset (initial position of the items on the page).
    const offset = (pageActual - 1) * pageLimit;

    // Slice to get only the publications from the current page
    const orsPageds = orsInvert.slice(offset, offset + pageLimit);

    // Calculate the total of pages
    const totalPages = Math.ceil(orsInvert.length / pageLimit);

    const newOrs = {
      page: pageActual,
      limit: pageLimit,
      totalPages: totalPages,
      ors: orsPageds,
    };

    return newOrs;
  }

  static async orsGet(req, res){
    const { id } = req.params;


    // check if ors exists
    const ors = await OrsModel.findOne({_id: id})

    if(!ors){
        throw new Error("ORS não encontrada")
    }

     // check if logged in user registered the pet
    const token = getToken(req)
    const user = await getUserByToken(token)

    if(ors.idUser.toString() !== user._id.toString()){
      throw new Error("Você não tem permissão para editar essa ORS")
    }

    return ors
  }

  static async updateOrs(req, res) {
    const { id } = req.params;

    const {
      client,
      contact,
      address,
      phone,
      cnpj,
      email,
      dateCall,
      duration,
      equipment,
      brand,
      model,
      serial,
      inventoryNumber,
      accessories,
      problem,
      observations,
      realizedServices,
      quantity,
      descriptionOfParts,
      dateDelivery,
      status,
    } = req.body;

    
    const data = {
      client,
      contact,
      address,
      phone,
      cnpj,
      email,
      dateCall,
      duration,
      equipment,
      brand,
      model,
      serial,
      inventoryNumber,
      accessories,
      problem,
      observations,
      realizedServices,
      quantity,
      descriptionOfParts,
      dateDelivery,
      status,
    };
    
    const updatedData = {}
    
    // check if ors exists
    const ors = await OrsModel.findOne({_id: id})

    if(!ors){
        throw new Error("ORS não encontrada")
    }

     // check if logged in user registered the pet
    const token = getToken(req)
    const user = await getUserByToken(token)

    if(ors.idUser.toString() !== user._id.toString()){
      throw new Error("Você não tem permissão para editar essa ORS")
    }

    await OrsModel.findByIdAndUpdate(id, data)

    return updatedData
  }
};
