const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen("3000",function(req,res){
  console.log("Server is running on port 3000.");
});

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  const cnty = req.body.country;
  const id = "f47ecb857aca64d6722f68a196b2bcb1";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cnty + "&appid=" + id + "&units=" + units;

  https.get(url,function(response){
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      result = "<h1>The temperature in " + cnty + " is " + temp + " " + units + " with a forcast of " + desc;
      res.send(result);
    });
  });
});
