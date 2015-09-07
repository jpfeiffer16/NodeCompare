/* global __dirname */
module.exports = (function () {

  var processJob = function (sourceUrl, targetUrl, name, description, callback) {
    // process.nextTick(function() {
    var ObjectId = require('mongoose').Schema.ObjectId;
    
    // var sourceImageId;
    // var targetImageId;
    
    saveJobData(name, description, sourceUrl, targetUrl, function(info) {
      var sourceImageId = info.sourceImageId,
          targetImageId = info.targetImageId;
          
      getImage(sourceUrl).then = function(base64) {
        console.log('Starting to get first image');
        saveImageData(base64, sourceImageId);
      };
      getImage(targetUrl).then = function(base64) {
        console.log('Starting to get second image');
        saveImageData(base64, targetImageId);
      };
    });
    
    
    // var targetData = getImage(targetUrl);
    // var sourceImageId = saveImageData(sourceData).then(function(bas) {});
    // var targetImageId = saveImageData(targetData);
    
    
    
    
    // saveJobData(name, description, sourceUrl, targetUrl, sourceImageId, targetImageId, new ObjectId);
    
    if (typeof(callback) == 'function') {
      callback();
    }
    // });

  };
  
  
  var getImage = function(url) {
    var that = this;
    
    var returnObj = {};
    
    var fs = require('fs');
    var phantom = require('phantom');
    var fileName = require('node-uuid').v1();
    console.log(fileName);

    phantom.create(function (ph) {
      ph.createPage(function (page) {
        page.set('viewportSize', { width: 1000, height: 3000});
        page.open(url, function (status) {
          console.log(url + ' opened with status: ' + status.toString());
          
          page.render(__dirname + fileName + '.png', function () {
            fs.readFile(__dirname + fileName + '.png', function (err, data) {
              if (err == null) {
                var base64 = data.toString('base64');
                console.log('Done Rendering');
                // return base64;
                
                if (typeof(returnObj.then) == 'function') {
                  returnObj.then(base64);
                }
                
                
                

                // fs.writeFile(__dirname + fileName + '.txt', base64, function (err) {
                //   if (err == null) {
                //     console.log('Contents written to temp text file');
                //   } else {
                //     throw 'Error writting to temp text file';
                //   }
                // });
								
                fs.unlink(__dirname  + fileName + '.png', function(err) {
                	if (err == null || err == undefined) {
                		console.log('Temp file deleted');
                	} else {
                		throw 'Error deleting the temp file';
                	}
                });
              } else {
                throw 'Error reading temp file';
              }
            });
          });
        });
      });
    }, 
      {
        dnodeOpts: {
        weak: false
      }
    });
    
    
   
    return returnObj;
  }
  
  
  
  
  
  
  
  var saveJobData = function (name, description, sourceUrl, targetUrl, callback) {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;
    var Job = require('../models/job.js');
    var jobId = mongoose.Types.ObjectId();
    
    var sourceImageId = mongoose.Types.ObjectId();
    var targetImageId = mongoose.Types.ObjectId();
    
    // var diffImageId = mongoose.Types.ObjectId();
    var job = new Job({
      _id: jobId,
      name: name,
      description: description,
      sourceUrl: sourceUrl,
      targetUrl: targetUrl,
      sourceImageId: sourceImageId,
      targetImageId: targetImageId,
      // diffImageId: diffImageId
    });
    console.log('Saving...');
    job.save(function (err) {
      if (!err) {
        console.log('Job Saved');
      } else {
        // return err;
        throw err;
        // throw "Job Not saved";
      }
    });
    if (typeof(callback) == 'function') {
      callback({
        sourceImageId: sourceImageId,
        targetImageId: targetImageId
      });
    }
  };
  
  
  
  var saveImageData = function (data, id) {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;
    var Image = require('../models/image.js');
    // var id = new ObjectId;
    // var id = mongoose.Types.ObjectId();

    var image = new Image({ _id: id, data: data.toString() });

    image.save(function (err) {
      if (!err) {
        console.log('Image Saved');
      } else {
        // return err;
        // console.dir(err);
        throw err;
        // throw 'Image not saved.'
      }
    });
    return id;
  };







  return {
    processJob: processJob
  };
})();