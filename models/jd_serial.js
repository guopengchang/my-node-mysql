/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('serial', {
    serial_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
     serial_title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
     serial_author: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    serial_status: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
   submission_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'serial'
  });
};
