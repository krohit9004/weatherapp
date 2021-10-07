const express = require('express');
const request = require("request");
const app = express();
require("dotenv").config();

const apiKey = `${process.env.API_KEY}`;

app.get("/:lat/:long", function (req, res) {
  const lat = req.params.lat;
  const long = req.params.long;
  let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=hourly,daily,minutely&appid=${apiKey}`;
  request(url,function(err,req,body){
    if(err){
      console.log("Something Went Wrong!",err);
      res.send(err);
    }else{

      const feel = (temp)=>{
        let result;
        if (temp > 35){
          result = 'Hot';
        }else if(temp > 12 && temp < 36){
          result = 'Moderate';
        }
        else if(temp < 12){
          result = 'Cold';
        }
        return result;
      }
      const toDisplayModel= (obj)=>{
        return {
          "Temperature": obj.temp ,
          "Weather": obj.weather[0].description,
          "Feel" : feel(parseInt(obj.temp))
        }
      };
      let weather = JSON.parse(body);
      if (weather.cod){
        res.send(weather);
      }else{
        let returnObj = toDisplayModel(weather.current);
        if(weather.alerts){
          returnObj.Alerts = weather.alerts[0].event
        }
        res.send(returnObj);
      }
    }
  })
});

let server= app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

module.exports = server;