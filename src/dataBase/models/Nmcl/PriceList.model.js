const Sequelize = require("sequelize");
const { sequelize } = require("../../dbSync");
const Nomenclature = require("./Nomenclature.model");
const PriseListItem = require("./PriseListItem.model");

class PriseList extends Sequelize.Model {}

PriseList.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING(25),
      allowNull: false,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "prise_list" }
);

PriseList.hasMany(PriseListItem)
PriseListItem.belongsTo(PriseList)




module.exports = PriseList;
