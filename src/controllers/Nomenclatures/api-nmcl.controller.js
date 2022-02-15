const { Router } = require("express");
const { asyncHandler } = require("../../middlewares/middlewares");
const {NmclType} = require("../../dataBase/models/Nmcl/NmclType.model");
const Nomenclature = require("../../dataBase/models/Nmcl/Nomenclature.model");
const PriseList = require("../../dataBase/models/Nmcl/PriceList.model");
const PriseListItem = require("../../dataBase/models/Nmcl/PriseListItem.model");
const ErrorResponse = require("../../classes/error-response");

const router = Router();

function initRoutes() {
  //Nomenclature
  router.post("/", asyncHandler(createNomenclature));
  router.get("/", asyncHandler(getNomenclature));
  router.delete("/:id", asyncHandler(deleteNomenclature));
  router.patch("/:id", asyncHandler(updateNomenclatureById));
  router.post("/isService", asyncHandler(getNomenclatureIsService));
}

async function createNomenclature(req, res) {
  let nomenclature

  const nmclType = await NmclType.findOne({
    where: {
      type_name: req.body.type_name,
    }
  })

  if (nmclType){
    nomenclature = await Nomenclature.create(
      {
        name: req.body.name,
        is_service: req.body.is_service,
        nmclTypeId: nmclType.id,
      },
    );
  } else {
    nomenclature = await Nomenclature.create(
      {
        name: req.body.name,
        is_service: req.body.is_service,
        nmcl_type: {
          type_name: req.body.type_name,
        },
      },
      { include: [NmclType] }
    );
  }
  res.json(nomenclature.toJSON());
  
  
}

async function getPriceList(req, res) {
  const nmcl = await PriseList.findAll();
  res.json(nmcl);
}

async function getNomenclature(req, res) {
  const nomenclature = await Nomenclature.findAll({
    order: [['id', 'DESC']],
    include: [NmclType, PriseList, PriseListItem],
  });
  res.json(nomenclature);
}

async function deleteNomenclature(req, res) {
  const nomenclature = await Nomenclature.destroy({
    where: {
      id: req.params.id,
    }
  })
  res.json(nomenclature);
}

async function updateNomenclatureById(req, res) {
  const nomenclature = await Nomenclature.findByPk(req.params.id);
  const nmclType = await NmclType.findOne({
    where: {
      type_name: req.body.type_name,
    }
  })

  
     await nomenclature.update(
      {
        name: req.body.name,
        is_service: req.body.is_service,
        nmclTypeId: nmclType.id,
      },
    );
  
  res.json(nomenclature);
}

async function getNomenclatureIsService(req, res) {
  let nomenclature
  switch (req.body.isService){
    case 'all':
      nomenclature = await Nomenclature.findAll({
        order: [['id', 'DESC']],
        include: [NmclType, PriseList, PriseListItem],
    })
      break
    case 'onlyService':
      nomenclature = await Nomenclature.findAll({
        where:{
          is_service: true
        },
        order: [['id', 'DESC']],
        include: [NmclType, PriseList, PriseListItem],
      });
      break
    case 'onlyNotService':
      nomenclature = await Nomenclature.findAll({
        where:{
          is_service: false
        },
        order: [['id', 'DESC']],
        include: [NmclType, PriseList, PriseListItem],
      });
      break;
  }
  res.json(nomenclature);
}


initRoutes();

module.exports = router;
