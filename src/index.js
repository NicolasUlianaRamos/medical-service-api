const express = require("express");
const app = express();
const cors = require("cors");

// config json response
app.use(express.json());

// solve cors
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Public folder for images
app.use(express.static("public"));

// Routes
const UserRoutes = require("./routes/UserRoutes.js");
const OrsRoutes = require("./routes/OrsRoutes.js")

app.use("/users", UserRoutes);
app.use("/ors", OrsRoutes)

app.listen(5000);
