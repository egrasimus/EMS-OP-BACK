const Sequelize = require("sequelize");
const { sequelize } = require("../../dbSync");
const PriseList = require("./PriceList.model");
const PriseListItem = require("./PriseListItem.model");

class Nomenclature extends Sequelize.Model {}

Nomenclature.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name:{
      type: Sequelize.DataTypes.STRING(150),
      allowNull: false,
    },
    is_service: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: Sequelize.DataTypes.STRING(250),
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "nomenclature" }
);

Nomenclature.hasMany(PriseListItem)
PriseListItem.belongsTo(Nomenclature)

Nomenclature.belongsToMany(PriseList, {through : "prise_list_item" })
PriseList.belongsToMany(Nomenclature, {through : "prise_list_item" })




module.exports = Nomenclature;
