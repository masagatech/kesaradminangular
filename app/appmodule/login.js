var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var login = module.exports = {};
const pool = require('../db/dbservicepool.js');
//const pool = require('./dbservicepool.js');


login.getLogin = function getLogin(req, res, done) {
    var _data = req.body; //getUserData(req);

    db.callProcedure("select " + globals.schema("funget_login") + "($1,$2::json);", ['login', _data], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}
login.getusers = function getusers(req, res, done) {
    var _data = req.body; //getUserData(req);

    db.callProcedure("select " + globals.schema("funget_users") + "($1,$2::json);", ['login', _data], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

function getUserData(req) {
    var data = req.body;

    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var other = data.otherdetails;
    other.IP = ip;

    data.other = other;
    return data;
}


login.getLogout = function getLogout(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_logout") + "($1,$2::json);", ['logout', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}