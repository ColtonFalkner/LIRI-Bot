require("dotenv").config();

var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var defaultMovie= "Mr. Nobody";

var action = process.argv[2];
var value = process.argv.slice(3).join(" ");

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

function getSongs(songName) {
  if (songName === ""){
    songName = "I Saw the Sign";
  }

  spotify.search({type: 'track', query: songName}, function (err, data){
    if (err){
      return console.log("Error occurred " + err);
    }
    
    console.log("Artist(s): ", data.tracks.items[0].album.artists[0].name);
    console.log("Song: ", process.argv.slice(3).join(" "));
    console.log("Preview Link: ", data.tracks.items[0].preview_url);
    console.log("Album Name: ", data.tracks.items[0].album.name);
  });
}

function getMovies(movieName){
  axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movieName)
    .then(function(data){
      var results= `
      Title of the Movie: ${data.data.Title}
      Year Released: ${data.data.Year}
      IMDB Rating: ${data.data.Rated}
      Rotten Tomatoes Score: ${data.data.Ratings[1].Value}
      Country: ${data.data.Country}
      Language: ${data.data.Language}
      Plot Summary: ${data.data.Plot}
      Cast: ${data.data.Actors}
      `;
      console.log(results);
    })
    .catch(function (error){
      console.log(error);
    })
    if (movieName === ""){
      movieName = "Mr. Nobody"
    }
}