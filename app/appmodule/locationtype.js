var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var locationtype = module.exports = {};
const pool = require('../db/dbservicepool.js');

// add query functions
locationtype.getAllLocationTypes =  function getAllLocationTypes(req, res, next) {
    var _data = req.body; //getUserData(req);

    db.callProcedure("select " + globals.schema("funget_locationtype") + "($1,$2::json);", ['users', _data], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
  }
  
  locationtype.getSinglelocationtype = function getSinglelocationtype(req, res, next) {
      var UserID = parseInt(req.params.id);
      db.one('select * from LocationTypeMaster where LocTypeID = $1', UserID)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE LocationType'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  locationtype.createlocationtype = function createlocationtype(req, res, next) {
    console.log(req.body);
    
    db.callProcedure("select " + globals.schema("funsave_locationtype") + "($1,$2,$3,$4,$5,$6,$7::json);", [req.body.LocType,req.body.LocTypeDesc,req.body.IsActive,req.body.CreatedOn,req.body.CreatedBy,req.body.UpdatedOn,req.body.UpdatedBy,], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
    
    // db.query('insert into LocationTypeMaster(LocType, LocTypeDesc, IsActive,CreatedOn,CreatedBy,UpdatedOn,UpdatedBy) values (${locationType}, ${locationTypeDesc}, ${isActive},${createdOn},${createdBy},${updatedOn},${updatedBy})', req.data)
    //   .then(function () {
    //     res.status(200)
    //       .json({
    //         status: 'success',
    //         message: 'Inserted one LocationType'
    //       });
    //   })
    //   .catch(function (err) {
    //     return next(err);
    //   });

  }
  
  locationtype.updatelocationtype = function updatelocationtype(req, res, next) {
    console.log(req.query);
    db.none('update LocationTypeMaster set LocType=$1, LocTypeDesc=$2, IsActive=$3 where LocTypeID=$4',
      [req.data.locationType, req.data.locationTypeDesc, req.data.isActive, parseInt(req.data.locTypeID)])
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated LocationTypeMaster'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  locationtype.deletelocationtype = function deletelocationtype(req, res, next) {
    var UserId = parseInt(req.params.id);
    db.result('delete from LocationTypeMaster where LocTypeID = $1', UserId)
      .then(function (result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} LocationTypeMaster`
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