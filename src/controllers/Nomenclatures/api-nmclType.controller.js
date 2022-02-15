const { Router } = require("express");
const { asyncHandler } = require("../../middlewares/middlewares");
const {NmclType} = require("../../dataBase/models/Nmcl/NmclType.model");
const Nomenclature = require("../../dataBase/models/Nmcl/Nomenclature.model");
const PriseList = require("../../dataBase/models/Nmcl/PriceList.model");
const PriseListItem = require("../../dataBase/models/Nmcl/PriseListItem.model");
const ErrorResponse = require("../../classes/error-response");

const router = Router();

function initRoutes() {
  //Nomenclature Type
  router.post("/", asyncHandler(createNmclType));
  router.get("/", asyncHandler(getNmclType));
}

async function createNmclType(req, res) {
    const nmcl = await NmclType.create({ 
      type_name: req.body.type_name
     });
    res.json(nmcl.toJSON());
  }

  async function getNmclType(req, res) {
    const nmcl = await NmclType.findAll({
      include: [Nomenclature],
    });
    res.json(nmcl);
  }

  initRoutes();

module.exports = router;