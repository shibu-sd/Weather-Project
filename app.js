const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "34f2158c0b60825a19b640b40ae1a43e";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const homeURL = __dirname + "/index.html";

            res.write("<h1>The weather is currently " + "<i>" + description + "</i>" + "</h1>");
            res.write("<h1>The temperature in " + query + " is : " + temp + " degree celsius</h1>");
            res.write("<img src =" + imageURL + ">");
            res.write("<h2><a href=" + "/" + ">Go back to home page</a></h2>");

            res.send();
        })
    })
});



app.listen(process.env.PORT || 3000, function(){
    console.log("Server started at port 3000");
});