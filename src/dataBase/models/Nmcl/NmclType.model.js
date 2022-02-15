const Sequelize = require("sequelize");
const { sequelize } = require("../../dbSync");
const Nomenclature = require("./Nomenclature.model");

class NmclType extends Sequelize.Model {}

NmclType.init(
  {
    id: {
      type: Sequelize.DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    type_name: {
      type: Sequelize.DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      defaultValue: "Общее",
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "nmcl_type" }
);
NmclType.hasMany(Nomenclature);
Nomenclature.belongsTo(NmclType);

module.exports = {
  NmclType,
};
