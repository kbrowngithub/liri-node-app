// ******************************
// NPM packages - require section
// ******************************
require("dotenv").config(); // For local environment settings
var inquirer = require("inquirer"); // For user input
var axios = require("axios"); // For API queries
var fs = require("fs");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify); // Spotify Object

// ******************************
// Data logger - appends data to log.txt
// ******************************
var logFileName = "log.txt";  // Should pull this from a config
function DataLogger(logFileName) {
    this.logFileName = logFileName,
        this.log = function (text) {
            console.log(`Text = ***${text}***`);
            text += "\n";
            console.log(`Text now = ***${text}***`);
            fs.appendFile(this.logFileName, text, function (err) {
                if (err) {
                    return console.log(`DataLogger: ${err}`);
                } else {
                    console.log("Content successfully logged");
                }
            });
        },
        this.print = function () {
            fs.readFile(this.logFileName, "utf8", function (error, data) {
                if (error) {
                    return console.log(error);
                }
                console.log(data);
            });
        }
}

var dl = DataLogger(logFileName);


// ******************************
// Inquirer Section for handling user input
// ******************************
function inquire() {


    inquirer.prompt([
        {
            type: "list",
            name: "command",
            message: "What would you like to do?",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
        },

        {
            // type: "checkbox",
            type: "list",
            name: "carryingWhat",
            message: "What are you carrying in your hands??",
            choices: ["TV", "Slice of Toast", "Butter Knife"]
        },

        {
            type: "confirm",
            name: "canLeave",
            message: "Can you leave now?"
        },

        {
            type: "password",
            name: "myPassword",
            message: "Okay fine. You can stay. But only if you say the magic password."
        }

    ]).then(function (user) {
        // dl.log(command.name);
        console.log(user);
        // If the user guesses the password...
        if (user.myPassword === "myHouse") {

            console.log("==============================================");
            console.log("");
            console.log("Well a deal's a deal " + user.name);
            console.log("You can stay as long as you like.");
            console.log("Doing what = " + user.doingWhat + ".");
            console.log("Just put down the " + user.carryingWhat + ". It's kind of freaking me out.");
            console.log("");
            console.log("==============================================");
        }


        // If the user doesn't guess the password...
        else {

            console.log("==============================================");
            console.log("");
            console.log("Sorry " + user.name);
            console.log("I'm calling the cops!");
            console.log("");
            console.log("==============================================");

        }
    });
}

// ******************************
// Functions to handle the CLI commands
// ******************************

// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
//  *Name of the venue
//  *Venue location
//  *Date of the Event (use moment to format this as "MM/DD/YYYY")

// Important: There is no need to sign up for a Bands in Town api_id key. Use the codingbootcamp as your app_id. For example, the URL used to search for "Celine Dion" would look like the following:

// https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp
function concertThis() {

    dl.log(data);
}

// This will show the following information about the song in your terminal/bash window
//  *Artist(s)
//  *The song's name
//  *A preview link of the song from Spotify
//  *The album that the song is from

// If no song is provided then your program will default to "The Sign" by Ace of Base.
// You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.
// The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
// Step One: Visit https://developer.spotify.com/my-applications/#!/

// Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
// Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

// Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.
function spotifyThisSong() {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
    // dl.log(data);
}

// This will output the following information to your terminal/bash window:
//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
function movieThis() {

    dl.log(data);
}

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of
// LIRI's commands.
//  - It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//  - Edit the text in random.txt to test out the feature for movie-this and concert-this.
function doWhatItSays() {

    dl.log(data);
}

// ******************************
// API calls for query data
// ******************************

// axios call to OMDB API
function getMovie() {
    axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("OMDB returned: " + JSON.stringify(response.data));
        }
    );
}

// axios call to Bands In Town API
function getBandsInTown(artist) {
    console.log("Artist: " + artist);
    var currArtist = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    console.log("URL: " + currArtist);
    axios.get("https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp").then(
        function (response) {
            // console.log("Bands in Town returned artist: " + JSON.stringify(response.data, null, 2));

            if (response.data !== undefined && response.data.upcoming_event_count !== 0) {
                axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
                    function (response) {
                        // console.log("For " + artist + " Bands in Town returned: " + JSON.stringify(response.data, null, 2));
                    }
                    ).catch(function (error) {
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an object that comes back with details pertaining to the error that occurred.
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log("Error", error.message);
                        }
                        console.log(error.config);
                    });
            } else {
                console.log(`Sorry. No upcoming events found for ${artist}`);
            }
        }
    ).catch(function (error) {
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an object that comes back with details pertaining to the error that occurred.
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log("Error", error.message);
                        }
                        console.log(error.config);
                    });
}


// axios call to Spotify API
function getSpotify() {
    spotify.search({ type: 'track', query: 'All the Small Things' })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (err) {
            console.log(err);
        });
}

// ******************************
// Main function
// ******************************
function runQuery() {
    console.log(`Processing ${process.argv[2]} ${process.argv[3]} ...`);
}

//getMovie();
var artist = "celine+dion";
getBandsInTown(artist);
// getSpotify();
// runQuery();
