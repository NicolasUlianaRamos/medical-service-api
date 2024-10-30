const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrsModel = mongoose.model(
  "OrsModels",
  new Schema(
    {
      userCpfCnpj: {
        type: String,
        required: true
      },
      idUser: {
        type: String,
        required: true
      },
      client: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      contact: {
        type: String,
      },
      phone: {
        type: String,
      },
      cnpj: {
        type: String,
      },
      email: {
        type: String,
      },
      dateCall: {
        type: String,
      },
      duration: {
        type: String,
      },
      equipment: {
        type: String,
      },
      local: {
        type: String
      },
      brand: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
      serial: {
        type: String,
      },
      inventoryNumber: {
        type: String,
        required: true,
      },    
      accessories: {
        type: String
      },
      problem: {
        type: String,
      },
      observations: {
        type: String,
      },
      realizedServices: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
      },
      descriptionOfParts: {
        type: String,
      },
      technicalSign: {
        type: String,
        required: true,
      },
      nameTechSign: {
        type: String,
        required: true,
      },
      dateDelivery: {
        type: String,
        required: true,
      },
      clientSign: {
        type: String,
        required: true,
      },
      nameClientSign: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: "Em andamento",
        required: true
      }
    },
    { timestamps: true }
  )
);

module.exports = OrsModel;