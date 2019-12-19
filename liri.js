require("dotenv").config();

var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var defaultMovie= "Mr. Nobody";

var action = process.argv[2];
var value = process.argv[3];

switch (action){
    case "concert-this":
        getBands(value)
        break;
    case "spotify-this-song":
        getSongs(value)
        break;
    case "movie-this":
        if (value == "0"){
            value = defaultMovie;
        }
        getMovies(value)
        break;
    case "do-what-it-says":
      doWhatItSays()
      break;
      default:
      break;
}

function getBands(artist){
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function(response){
      console.log("Name of Venue: " , response.data[0].venue.name);
      console.log("Venue location: ", response.data[0].venue.city);
      var eventDate = moment(response.data[0].datetime).format("MM/DD/YYYY");
      console.log("Date of Event: ", eventDate);
    })
    .catch(function (error){
      console.log(error);
    });
}