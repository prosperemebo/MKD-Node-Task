/*Powered By: Manaknightdigital Inc. https://manaknightdigital.com/ Year: 2021*/
/**
 * Terminate_Configuration Model
 * @copyright 2021 Manaknightdigital Inc.
 * @link https://manaknightdigital.com
 * @license Proprietary Software licensing
 * @author Ryan Wong
 *
 */
const { intersection } = require('lodash');
const coreModel = require('../core/models');

module.exports = (sequelize, DataTypes) => {
  const Terminate_Configuration = sequelize.define(
    'terminate_configuration',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message: DataTypes.STRING,
      counter: DataTypes.INTEGER,
      created_at: DataTypes.DATEONLY,
      updated_at: DataTypes.DATE,
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: 'terminate_configuration',
    },
    {
      underscoredAll: false,
      underscored: false,
    }
  );

  coreModel.call(this, Terminate_Configuration);

  Terminate_Configuration._preCreateProcessing = function (data) {
    return data;
  };
  Terminate_Configuration._postCreateProcessing = function (data) {
    return data;
  };
  Terminate_Configuration._customCountingConditions = function (data) {
    return data;
  };

  Terminate_Configuration._filterAllowKeys = function (data) {
    let cleanData = {};
    let allowedFields = Terminate_Configuration.allowFields();
    allowedFields.push(Terminate_Configuration._primaryKey());

    for (const key in data) {
      if (allowedFields.includes(key)) {
        cleanData[key] = data[key];
      }
    }
    return cleanData;
  };

  Terminate_Configuration.timeDefaultMapping = function () {
    let results = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j++) {
        let hour = i < 10 ? '0'.i : i;
        let min = j < 10 ? '0'.j : j;
        results[i * 60 + j] = `${hour}:${min}`;
      }
    }
    return results;
  };

  Terminate_Configuration.allowFields = function () {
    return ['id', 'message', 'counter'];
  };

  Terminate_Configuration.labels = function () {
    return ['ID', 'Message', 'Counter'];
  };

  Terminate_Configuration.validationRules = function () {
    return [
      ['id', 'ID', ''],
      ['message', 'Message', 'required'],
      ['counter', 'Counter', 'required|integer'],
    ];
  };

  Terminate_Configuration.validationEditRules = function () {
    return [
      ['id', 'ID', ''],
      ['message', 'Message', 'required'],
      ['counter', 'Counter', 'required|integer'],
    ];
  };

  // ex
  Terminate_Configuration.intersection = function (fields) {
    if (fields) {
      return intersection(
        ['id', 'message', 'counter', 'created_at', 'updated_at'],
        Object.keys(fields)
      );
    } else return [];
  };

  return Terminate_Configuration;
};
