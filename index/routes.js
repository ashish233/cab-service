var express = require('express');
var router = express.Router();
var _ = require('lodash');

var cabs = [{
  id: 'cabid_1',
  driverName: "driver 1",
  driverNumber: "1",
  location: {
    lattitude: 0,
    longitude: 0
  },
  isBooked: false
}, {
  id: 'cabid_2',
  driverName: "driver 2",
  driverNumber: "0000000002",
  location: {
    lattitude: 10,
    longitude: 10
  },
  isBooked: false
}, {
  id: 'cabid_3',
  driverName: "driver 3",
  driverNumber: "3",
  location: {
    lattitude: 10,
    longitude: 20
  },
  isBooked: false
}, {
  id: 'cabid_4',
  driverName: "driver 4",
  driverNumber: "4",
  location: {
    lattitude: 20,
    longitude: 10
  },
  isBooked: false
}, {
  id: 'cabid_5',
  driverName: "driver 5",
  driverNumber: "5",
  location: {
    lattitude: 20,
    longitude: 20
  },
  isBooked: false
}];

var user = [{
  id: 'uid_1',
  userName: "user 1",
  rideStatus: false,
  location: {
    lattitude: 10,
    longitude: 10
  }
},
{
  id: 'uid_2',
  userName: "user 2",
  rideStatus: false,
  location: {
    lattitude: 5,
    longitude: 10
  }
}
]

var userHistory =[{
      uid:'uid_2',
      cabId:'cabid_5'
      }]

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send("Testing node app")
});


router.get('/userHistory', (req, res, next) => {
  if(req.query.id){
     var userInfo = _.find(user,{id:req.query.id});
     var userHistoryData =_.filter(userHistory,{uid:req.query.id})
     userHistoryData.forEach(info=>{
        delete info.uid;
       info =Object.assign(info,userInfo)
     })
     res.json({data:userHistoryData})
  }
  else{
    res.json({message:"invalid user id"})
  }
});

router.get('/bookCab', (req, res, next) => {
  if (req.query.uid) {

    let userInfo = _.find(user,{'id':req.query.uid})
 
   if(userInfo && userInfo.rideStatus){
     return res.json({
      message: "Your current rid is not finished yet or invalid user"
    })  
   }
  var lattitude =req.query.lattitude ? parseInt(req.query.lattitude):parseInt(userInfo.location.lattitude);

  var longitude = req.query.longitude ? parseInt(req.query.longitude) : parseInt(userInfo.location.longitude);
  
   var userLocation = {
    lattitude: lattitude,
    longitude: longitude
  };
  var cab = getNearestCab(userLocation);
  if (cab) {
    cab.isBooked = true;
        _.find(user, { 'id': req.query.uid }).rideStatus=true;

    userHistory.push({
      uid:userInfo.id,
      cabId:cab.id,
      rideStatus:true
    })  
    res.json({
      userName: userInfo.userName,
      message: "Cab booked!",
      cabID: cab.id,
      driverName: cab.driverName,
      driverNumber: cab.driverNumber,
      location: cab.location
    });
  } else {
    res.json({
      message: "No cabs available!"
    });
  }
  } else {
    res.json({
      message: "Invalid parameters (user id ) missing"
    });
  }
});


router.get('/completeRide', (req, res, next) => {
  if (req.query.id && !isNaN(req.query.id) && req.query.lattitude && req.query.longitude && !isNaN(req.query.lattitude) && !isNaN(req.query.longitude)) {
    var lattitude = parseInt(req.query.lattitude);
    var longitude = parseInt(req.query.longitude);
    var location = {
      lattitude: lattitude,
      longitude: longitude
    };

    var rideHistory = _.find(userHistory,{cabId:req.query.id});

    var userInfo =  _.find(userHistory,{id:rideHistory.uid});

    var cabInfo =  _.find(userHistory,{id:rideHistory.cabId});


    if (rideHistory) {
      if (userCab.isBooked) {

        cabInfo.isBooked = false;
        userInfo.rideStatus =false;
        rideHistory.rideStatus=false;

        var distance = findDistance(cabInfo.location, location);
        // user and cab location
        cabInfo.location = location;
        userInfo.location = location
        
        res.json({
          message: "Ride completed!",
          distance: distance
        })
      } else {
        res.json({
          message: "Can't complete ride for a cab which is not booked!"
        });
      }
    } else {
      res.json({
        message: "Could not find cab with id " + cabID
      });
    }
  } else {
    res.json({
      message: "Invalid/Missing parameters"
    });
  }
});

router.get('/user', (req, res, next) => {
  res.json({
    user:user 
  });
})


var findDistance = (location1, location2) => {
  var lattitude = location1.lattitude - location2.lattitude;
  var longitude = location1.longitude - location2.longitude;
  var result = Math.sqrt(lattitude * lattitude + longitude * longitude);
  return result;
}

var getNearestCab = location => {
  var closest = null;
  var closestDistance = Infinity;
  cabs.forEach((cab) => {
    if (!cab.isBooked) {
      var distance = findDistance(cab.location, location);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = cab;
      }
    }
  });
  return closest;
}

module.exports = router;