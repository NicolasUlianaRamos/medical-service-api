const router = require("express").Router();

// controller
const OrsController = require("../controllers/OrsController");

// middleware
const verifyToken = require("../helpers/verify-token.js")


router.get("/search", verifyToken, OrsController.getSearch)
router.get("/searchadmin", verifyToken, OrsController.getSearchAdmin)
router.get("/myors", verifyToken, OrsController.getByUserId)
router.post("/add", verifyToken, OrsController.create)

router.get("/:id", verifyToken, OrsController.orsByUserId)
router.get("/edit/:id", verifyToken, OrsController.orsGet)
router.patch("/edit/:id", verifyToken, OrsController.updateOrs)

module.exports = router;