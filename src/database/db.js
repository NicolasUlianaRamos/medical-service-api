const mongoose = require("mongoose");
require("dotenv").config();

async function main(){
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.d0zmh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    console.log("conectou ao mongoose")
}

main().catch((err) => console.error(err))

module.exports = mongoose

