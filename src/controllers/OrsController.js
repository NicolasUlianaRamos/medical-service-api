const OrsService = require("../services/OrsService.js");

module.exports = class OrsController {
  static async create(req, res) {
    const {
      client,
      contact,
      address,
      phone,
      fax,
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
      technicalSign,
      nameTechSign,
      dateDelivery,
      clientSign,
      nameClientSign,
      status,
    } = req.body;

    
    const data = {
      client,
      contact,
      address,
      phone,
      fax,
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
      technicalSign,
      nameTechSign,
      dateDelivery,
      clientSign,
      nameClientSign,
      status,
    };
      try {
        const ors = await OrsService.create(data, req, res);
        res.status(201).json({ message: "ORS criada com sucesso", ors });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  }

  static async getByUserId(req, res) {
    try {
      const ors = await OrsService.getByUserId(req);
      res.status(200).json({ message: "Todas as suas ORS", ors: ors });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar ORS", error: error.message });
    }
  }

  static async getSearch(req, res) {
    try {
        const ors = await OrsService.getSearch(req);
        if (ors.length === 0) {
            return res.status(404).json({ message: "Nenhuma ORS encontrada" });
        }
        res.status(200).json({ message: "Resultados da busca", ors: ors });
    } catch (error) {
        res.status(500).json({ message: "Erro interno ao buscar ORS" });
    }
}

static async getSearchAdmin(req, res) {
  try {
    const ors = await OrsService.getSearchAdmin(req, res);
    if (ors.length === 0) {
      return res.status(404).json({ message: "Nenhuma ORS encontrada" });
  }
    res.status(200).json({ message: "Resultados da busca", ors: ors });
  } catch (error) {
    res.status(500).json({ message: "Erro interno ao buscar ORS" });
  }
}

static async orsByUserId(req, res){
  const { id } = req.params;
  try {
    const ors = await OrsService.orsByUserId(id, req);
    res.status(200).json({ message: "ORS do usuario", ors: ors });
  } catch (error) {
    res.status(500).json({ message: "Erro interno ao buscar ORS do  usuario", error: error.message });
  }
  
}

  static async updateOrs(req, res){
    const { id } = req.params;
    const { status } = req.body;

    try {
        const ors = await OrsService.updateOrs(id, status);
        
        res.status(200).json({ message: "ORS modificada com sucesso", ors: ors.status });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Erro ao modificar ORS", error: error.message });
      }
  }
};
