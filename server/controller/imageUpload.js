var express = require('express');
router = express.Router();
var multer = require('multer');
var multiparty = require('multiparty');

var fs = require('fs');
var db = require('../database/db');
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './fileUpload/');
  },
  filename: function (req, file, callback) {
	callback(null, file.originalname );
  }
});
var upload = multer({ storage : storage}).single('file');
router.post('/', function(req, res) {
upload(req,res,function(err) {
		if(err) {
        
		  console.log("Error uploading file.");
		}
		console.log("File is uploaded successfully!");

      });

    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        var data = fields;
        var name = data.key;
        var fname=files.file[0].originalFilename;
        var fsize=files.file[0].size;
       console.log('fields',name,'files',files,fname,fsize);


       //stroing image to data base
       var img=new db.Image();
       var imgPath='./fileUpload/'+fname;
  console.log(imgPath);
        // store an img in binary in mongo
       img.image=fs.readFileSync(imgPath);
      img. projectKey=name;

       db.Image.findOne({image:fs.readFileSync(imgPath)},function(err,result){
           if(result){
               res.send("Prasent");
               console.log('Prasent',result);
           }
           else
           {
               img.save(function(err,result){
                   if(err){
                       res.send(err)
                       console.log('err',err);
                   }
                   else{
                       
                       console.log('sus',j);
                       fs.unlink('./fileUpload/' + fname, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.log("File deleted successfully!");
   }
  
});
                   }
               })
           }
       })
       
    }); //end of form.parse()
}); //end of post




module.exports = router;
