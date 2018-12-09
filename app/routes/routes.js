var rs = require("../appmodule/util/resp.js");
var globals = require("../globals.js");
var fs = require('fs');

var login = require("../appmodule/login.js");
var usertype = require("../appmodule/usertype.js");
var user = require("../appmodule/user.js");
var order = require("../appmodule/orderdetails.js");
var locationtype = require("../appmodule/locationtype.js");
var location = require("../appmodule/location.js");
var feedback = require("../appmodule/feedback.js");
var donation = require("../appmodule/donation.js");

var multer = require('multer');
var upload = multer({
    limits: {
        fieldNameSize: 999999999,
        fieldSize: 999999999
    },
    dest: 'www/uploads/'
});

var appRouter = function(app) {
    //##################################### API Details / ###################################################

    var APIInfo = {
        ver: "1.0",
        type: "REST API",
        requestdata: "JSON",
        responsedata: "JSON",
    }

    app.post(globals.globvar.rootAPI + "/", function(req, res, done) {
        rs.resp(res, 200, APIInfo);
    });

    //##################################### API Details / ###################################################

    //##################################### Login ###########################################################

    app.post(globals.globvar.rootAPI + "/getLogin", login.getLogin);
    app.post(globals.globvar.rootAPI + "/getLogout", login.getLogout);

    //##################################### User Type ###########################################################
    app.get(globals.globvar.rootAPI + "/getusertype/:id", usertype.getSingleUserType);
    app.get(globals.globvar.rootAPI + "/getusertypes", usertype.getAllUseTypes);
    app.post(globals.globvar.rootAPI + "/addusertype", usertype.createUserType);
    app.put(globals.globvar.rootAPI + "/updateusertype/:id", usertype.updateUserType);

    //##################################### User ###########################################################
    app.get(globals.globvar.rootAPI + "/getuser/:id", user.getSingleUser);
    app.get(globals.globvar.rootAPI + "/getusers", user.getAllUsers);
    app.post(globals.globvar.rootAPI + "/adduser", user.createUser);
    app.put(globals.globvar.rootAPI + "/updateuser/:id", user.updateUser);

    //##################################### Order ###########################################################
    app.get(globals.globvar.rootAPI + "/getorder/:id", order.getSingleorder);
    app.get(globals.globvar.rootAPI + "/getorders", order.getAllorders);
    app.post(globals.globvar.rootAPI + "/addorder", order.createorder);
    app.put(globals.globvar.rootAPI + "/updateorder/:id", order.updateorder);

    //##################################### Location Type ###########################################################
    app.get(globals.globvar.rootAPI + "/getlocationtype/:id", locationtype.getSinglelocationtype);
    app.get(globals.globvar.rootAPI + "/getlocationtypes", locationtype.getAllLocationTypes);
    app.post(globals.globvar.rootAPI + "/addlocationtype", locationtype.createlocationtype);
    app.put(globals.globvar.rootAPI + "/updatelocationtype/:id", locationtype.updatelocationtype);

    app.post('/addlocationtype', (req, res) => {
        locationtype.createlocationtype(req,res)
    });
    // app.post(globals.globvar.rootAPI + "/addlocationtype", function(req, res, done) {
    //     rs.resp(res, 200, locationtype.createlocationtype);
    // });

    //##################################### Location ###########################################################
    app.get(globals.globvar.rootAPI + "/getlocation/:id", location.getSinglelocation);
    app.get(globals.globvar.rootAPI + "/getlocations", location.getAlllocations);
    app.post(globals.globvar.rootAPI + "/addlocation", location.createlocation);
    app.put(globals.globvar.rootAPI + "/updatelocation/:id", location.updatelocation);

    //##################################### Feedback ###########################################################
    app.get(globals.globvar.rootAPI + "/getfeedback/:id", feedback.getSinglefeedback);
    app.get(globals.globvar.rootAPI + "/getfeedbacks", feedback.getAllfeedbacks);
    app.post(globals.globvar.rootAPI + "/addfeedback", feedback.createfeedback);
    app.put(globals.globvar.rootAPI + "/updatefeedback/:id", feedback.updatefeedback);

    //##################################### Donation ###########################################################
    app.get(globals.globvar.rootAPI + "/getdonation/:id", donation.getSingledonation);
    app.get(globals.globvar.rootAPI + "/getdonations", donation.getAlldonations);
    app.post(globals.globvar.rootAPI + "/adddonation", donation.createdonation);
    app.put(globals.globvar.rootAPI + "/updatedonation/:id",donation.updatedonation);

    //##################################### File Upload #####################################################

    // app.post(globals.globvar.rootAPI + "/uploads", fileupload.uploadFile);
    // app.get(globals.globvar.rootAPI + "/getFilePath", fileupload.getFilePath);

    //##################################### File Upload #####################################################

    //##################################### File Uploads #####################################################

    app.post(globals.globvar.rootAPI + "/uploads", upload.any(), function(req, res) {
        var tmp_path = req.files[0].path;
        var target_path = 'www/uploads/' + req.files[0].originalname;
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        fs.unlink(req.files[0].path, function(err) {
            if (err) return console.log(err);
        });

        src.on('end', function() {
            rs.resp(res, 200, req.body.id);
        });

        src.on('error', function(err) {
            res.send({ error: "upload failed" });
        });
    });

    //##################################### File Uploads #####################################################

    //##################################### PRATIK ###########################################################
}

module.exports = appRouter;