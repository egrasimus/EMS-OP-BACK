const Sequelize = require("sequelize");
const { sequelize } = require("../../dbSync");

class PriseListItem extends Sequelize.Model {}

PriseListItem.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    price: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "prise_list_item" }
);



module.exports = PriseListItem;
