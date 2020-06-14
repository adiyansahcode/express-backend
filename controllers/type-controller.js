'use strict';

const express = require('express');
const router = express.Router();
const model = require('../models');
var linkName = '/type/';

// * get all data from table
router.get('/', async function (req, res, next) {
  try {
    var resData = {};
    var param = {};
    if (Object.keys(req.query).length > 0 && req.query.constructor === Object) {
      if (req.query.field) {
        param.attributes = req.query.field.split(',');
      }
      if (req.query.sort) {
        if (req.query.sort.indexOf('-') !== -1) {
          param.order = [
            [req.query.sort.replace('-', ''), 'DESC']
          ];
        } else {
          param.order = [
            [req.query.sort, 'ASC']
          ];
        }
      }
      if (req.query.page) {
        if (req.query.page.size) {
          param.limit = parseInt(req.query.page.size);

          if (req.query.page.number) {
            param.offset = (parseInt(req.query.page.number) - 1) * parseInt(req.query.page.size);
          }
        }
      }
    }

    const dataDbs = await model.typeModel.findAll(param);
    const dataTotal = dataDbs.length;
    if (dataTotal !== 0) {
      resData.type = [];
      dataDbs.forEach(dataDb => {
        resData.type.push({
          links: {
            self: linkName + dataDb.id
          },
          id: dataDb.id,
          createdAt: dataDb.createdAt,
          updatedAt: dataDb.updatedAt,
          name: dataDb.name,
          description: dataDb.description,
          isActive: dataDb.isActive
        });
      });
    }
    res.status(200);
    res.set('Content-Type', 'application/json; charset=UTF-8');
    res.set('Connection', 'keep-alive');
    res.set('Allow', 'GET,POST,DELETE,OPTIONS,HEAD');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Headers', 'Accept, Authorization, Origin, Content-Disposition, Content-Range, Content-Type, X-Requested-With');
    res.set('Access-Control-Allow-Headers', 'GET,POST,DELETE,OPTIONS,HEAD');
    res.json({
      status: 'success',
      links: {
        self: linkName
      },
      page: null,
      data: resData
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      status: 'error',
      errors: {
        code: err.status,
        title: 'error',
        detail: err.stack
      }
    });
  }
});

// * get data with id from table
router.get('/:id', async function (req, res, next) {
  console.log(req.params.id);

  // let resData = [];
  // var param = {};
  // const users = await model.typeModel.findAll(param);
  // if (users.length !== 0) {
  //   resData = users;
  // }

  res.status(200);
  res.set('Allow', 'GET,PUT,PATCH,DELETE,OPTIONS,HEAD');
  res.json({
    status: 'success',
    links: null,
    data: null
  });
});

// * create new data
router.post('/', function (req, res) {
  res.status(201);
  res.set('Allow', 'GET,POST,DELETE,OPTIONS,HEAD');
  res.json({
    status: 'success',
    data: null
  });
});

// * update data with id
router.put('/:id', function (req, res) {
  res.status(200);
  res.set('Allow', 'GET,PUT,PATCH,DELETE,OPTIONS,HEAD');
  res.json({
    status: 'success',
    data: null
  });
});

// * update data with id
router.patch('/:id', function (req, res) {
  res.status(200);
  res.set('Allow', 'GET,PUT,PATCH,DELETE,OPTIONS,HEAD');
  res.json({
    status: 'success',
    data: null
  });
});

// * delete data with id
router.delete('/', function (req, res) {
  res.status(200);
  res.set('Allow', 'GET,POST,DELETE,OPTIONS,HEAD');
  res.json({
    status: 'success',
    data: null
  });
});

// * delete data with id
router.delete('/:id', function (req, res) {
  res.status(200);
  res.set('Allow', 'GET,PUT,PATCH,DELETE,OPTIONS,HEAD');
  res.json({
    status: 'success',
    data: null
  });
});

module.exports = router;
