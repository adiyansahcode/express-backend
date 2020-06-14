const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'created_at'
    },
    robotId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'robot_id',
      references: {
        key: 'id',
        model: 'robotModel'
      }
    },
    partId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'part_id',
      references: {
        key: 'id',
        model: 'partModel'
      }
    }
  };
  const options = {
    tableName: 'robot_part',
    comment: '',
    indexes: [{
      name: 'robots_id',
      unique: false,
      type: 'BTREE',
      fields: ['robot_id']
    }, {
      name: 'parts_id',
      unique: false,
      type: 'BTREE',
      fields: ['part_id']
    }]
  };
  const RobotPartModel = sequelize.define('robotPartModel', attributes, options);
  return RobotPartModel;
};
