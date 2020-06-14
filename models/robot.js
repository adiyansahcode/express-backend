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
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'updated_at'
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'name'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'description'
    },
    year: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'year'
    },
    isActive: {
      type: DataTypes.ENUM('yes', 'no'),
      allowNull: true,
      defaultValue: 'yes',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'is_active'
    },
    typeId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'type_id',
      references: {
        key: 'id',
        model: 'typeModel'
      }
    }
  };
  const options = {
    tableName: 'robot',
    comment: '',
    indexes: [{
      name: 'fk_type_id_01_idx',
      unique: false,
      type: 'BTREE',
      fields: ['type_id']
    }]
  };
  const RobotModel = sequelize.define('robotModel', attributes, options);
  return RobotModel;
};
