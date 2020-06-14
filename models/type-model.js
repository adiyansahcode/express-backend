'use strict';

const moment = require('moment');

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
      field: 'created_at',
      get () {
        const createdAt = this.getDataValue('createdAt');
        return createdAt ? moment(createdAt).utc().format('YYYY-MM-DD HH:mm:ss') : null;
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'updated_at',
      get () {
        const updatedAt = this.getDataValue('updatedAt');
        return updatedAt ? moment(updatedAt).utc().format('YYYY-MM-DD HH:mm:ss') : null;
      }
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
    isActive: {
      type: DataTypes.ENUM('yes', 'no'),
      allowNull: true,
      defaultValue: 'yes',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'is_active'
    }
  };
  const options = {
    tableName: 'type',
    comment: '',
    indexes: []
  };
  const TypeModel = sequelize.define('typeModel', attributes, options);
  return TypeModel;
};
