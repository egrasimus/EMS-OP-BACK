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

  //Nomenclature Type
  router.post("/NmclType", asyncHandler(createNmclType));
  router.get("/NmclType", asyncHandler(getNmclType));

  //Prise list
  router.post("/priсe", asyncHandler(createNmclType));
  router.get("/price", asyncHandler(getPriceList));

  //Prise list item
  router.post("/priselistitem", asyncHandler(createNmclType));
  router.get("/priselistitem", asyncHandler(getNmclType));

  //     router.patch('/:id', asyncHandler(requireToken), asyncHandler(updateTodo));
  //     router.delete('/:id', asyncHandler(requireToken), asyncHandler(deleteToDoByID));
  //     router.delete('/', asyncHandler(requireToken), asyncHandler(deleteToDo));
}