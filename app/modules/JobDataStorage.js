/* global __dirname */
module.exports = (function () {
  var processJob = function (sourceUrl, targetUrl, name, description) {
    var ObjectId = require('mongoose').Schema.ObjectId;
		var sourceData = getImage(sourceUrl);
    var targetData = getImage(targetUrl);
    var sourceImageId = saveImageData(sourceData);
    var targetImageId = saveImageData(targetData);
    
    
    
    
    saveJobData(name, description, sourceUrl, targetUrl, sourceImageId, targetImageId, new ObjectId);
  };
  
  
  var getImage = function(url) {
    
    
    var fs = require('fs');
    var phantom = require('phantom');
    var fileName = require('node-uuid').v1();
    console.log(fileName);

    phantom.create(function (ph) {
      ph.createPage(function (page) {
        page.set('viewportSize', { width: 1000, height: 3000 });
        page.open(url, function (status) {
          console.log(url + ' opened with status: ' + status.toString());
          
          page.render(__dirname + fileName + '.png', function () {
            fs.readFile(__dirname + fileName + '.png', function (err, data) {
              if (err == null) {
                var base64 = data.toString('base64');

                fs.writeFile(__dirname + fileName + '.txt', base64, function (err) {
                  if (err == null) {
                    console.log('Contents written to temp text file');
                  } else {
                    throw 'Error writting to temp text file';
                  }
                });
								
                // fs.unlink(__dirname + 'temp.png', function(err) {
                // 	if (err == null || err == undefined) {
                // 		console.log('Temp file deleted');
                // 	} else {
                // 		throw 'Error deleting the temp file';
                // 	}
                // });
              } else {
                throw 'Error reading temp file';
              }
            });
            console.log('Done Rendering');
          });
        });
      });
    }, 
      {
        dnodeOpts: {
        weak: false
      }
    });
    
    
    
    
    
  }
  
  
  
  
  
  
  
  var saveJobData = function (name, description, sourceUrl, targetUrl, sourceImageId, targetImageId, diffImageId) {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;
    var Job = require('../models/job.js');
    var jobId = new ObjectId;
    var job = new Job({
      _id: jobId,
      name: name,
      description: description,
      sourceUrl: sourceUrl,
      targetUrl: targetUrl,
      sourceImageId: sourceImageId,
      targetImageId: targetImageId,
      diffImageId: diffImageId
    });
    job.save(function (err) {
      if (!err) {
        console.log('Job Saved');
      } else {
        return err;
      }
    });
  };
  
  
  
  var saveImageData = function (data) {
    var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;
    var Image = require('../models/image.js');
    var id = new ObjectId;

    var image = new Image({ _id: id, data: data });

    image.save(function (err) {
      if (!err) {
        console.log('Image Saved');
      } else {
        return err;
      }
    });
    return id;
  };







  return {
    processJob: processJob
  };
})();