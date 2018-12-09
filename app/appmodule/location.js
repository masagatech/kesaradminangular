var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var location = module.exports = {};
const pool = require('../db/dbservicepool.js');

// add query functions
location.getAlllocations =  function getAlllocations(req, res, next) {
    var _data = req.body; //getUserData(req);

    db.callProcedure("select " + globals.schema("funget_locationmaster") + "($1,$2::json);", ['users', _data], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
  }
  
  location.getSinglelocation = function getSinglelocation(req, res, next) {
      var UserID = parseInt(req.params.id);
      db.one('select * from location where id = $1', UserID)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE location'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  location.createlocation = function createlocation(req, res, next) {
    console.log(req.query);
    db.none('insert into location(name, surname, dob) values (${name}, ${surname}, ${dob})', req.query)
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one location'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  location.updatelocation = function updatelocation(req, res, next) {
    console.log(req.query);
    db.none('update location set name=$1, surname=$2, dob=$3 where id=$4',
      [req.query.name, req.query.surname, req.query.dob, parseInt(req.params.id)])
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated location'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  location.deletelocation = function deletelocation(req, res, next) {
    var UserId = parseInt(req.params.id);
    db.result('delete from location where id = $1', UserId)
      .then(function (result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} location`
          });
        /* jshint ignore:end */
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
//   module.exports = {
//     getAllUsers: getAllUsers,
//     getSingleUser: getSingleUser,
//     createUser: createUser,
//     updateUser: updateUser,
//     deleteUser: deleteUser
//   };