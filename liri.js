// ******************************
// NPM packages - require section
// ******************************
require("dotenv").config(); // For local environment settings
var moment = require('moment');
var inquirer = require("inquirer"); // For user input
var axios = require("axios"); // For API queries
var fs = require("fs");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify); // Spotify Object

var command;
var param;
var sepStr = "\n===================";
var bandResults = "log.txt";
var spotifyResults = "log.txt";
var omdbResults = "log.txt";


// ******************************
// logData() - appends data to log file
// ******************************
function logData(fileName, text) {
    var timeStamp = moment().format("MMM Do YYYY, h:mm:ss a");
    var logText = `\n#####\n## Time: ${timeStamp}\n## Command: ${command} \'${param}\'\n####\nReturned: \n${text}\n####\n`;
    fs.appendFile(fileName, logText, function (err) {
        if (err) {
            return console.log(`logData() error: ${err}`);
        } else {
            // console.log("Content successfully logged");
        }
    });
}

// ******************************
// displayData() - appends data to log file
// ******************************
function displayData(text) {
    console.log("\n===================");
    console.log(`${text}${sepStr}`);
}

function URLify(string) {
    // trims leading/trailing spaces, replaces all spaces (\s) with %20 globally (g) in the string
    return string.trim().replace(/\s/g, '%20');
}

// ******************************
// Inquirer Section for handling user input
// ******************************

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
    inquirer.prompt([
        {
            name: "artist",
            message: "Which group or artist would you like to search for?"
        }
    ]).then(function (answer) {
        param = answer.artist;
        getBandsInTown(answer.artist);
    }).catch(function (err) {
        console.log(`concertThis(): error: ${err}`);
    });
}

// axios call to Bands In Town API
function getBandsInTown(artist) {
    artist = artist.replace(/"/g, "");
    var url = "https://rest.bandsintown.com/artists/" + URLify(artist) + "?app_id=codingbootcamp";
    axios.get(url).then(
        function (response) {
            if (response.data !== undefined && response.data.upcoming_event_count !== 0) {
                axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
                    function (response) {
                        parseBandData(response.data);
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

function parseBandData(data) {
    data.forEach(element => {
        var time = moment(element.datetime).format("MM/DD/YYYY");
        var cityState = element.venue.city;
        if (element.venue.region !== "") {
            cityState = cityState + ", " + element.venue.region;
        }

        var text = `Venue: ${element.venue.name} \nEvent Date: ${time} \nCity: ${cityState} \nCountry: ${element.venue.country}`;
        logData(bandResults, text);
        displayData(text);
    });
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



// This will show the following information about the song in your terminal/bash window
//  *Artist(s)
//  *The song's name
//  *A preview link of the song from Spotify
//  *The album that the song is from
// axios call to Spotify API

function spotifyThisSong() {
    inquirer.prompt([
        {
            name: "song",
            message: "Enter the  name of a song."
        }
    ]).then(function (answer) {
        param = answer.song.trim();
        if (param === "") {
            param = "\"The Sign\"";
        } else {
            param = `\"${param}\"`
        }
        getSpotify(param);
    }).catch(function (err) {
        console.log(`spotifyThisSong(): error: ${err}`);
    });
}

function getSpotify(query) {
    console.log("After: " + query);
    spotify.search({ type: 'track', query: query })
        .then(function (response) {
            parseSpotifyData(response.tracks.items);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function parseSpotifyData(data) {
    // console.log("Spotify returned: " + JSON.stringify(data, null, 2));
    var logText = "";
    var empty = true;
    // if (data !== []) {
        data.forEach(element => {
            var text = "";
            // i++;
            // console.log("param = " + param);
            // console.log("element.name = " + "\""+element.name+"\"");
            if ("\"" + element.name.toLowerCase() + "\"" === param.toLowerCase()) {
                empty = false;
                text += "Artists:";
                element.artists.forEach(item => {
                    // console.log(item.name);
                    text += `\n  ${item.name}`;
                });
                // console.log("Song Name: " + element.name);
                text += `\nSong Name: ${element.name}`;

                // console.log("Preview URL: " + element.preview_url);
                text += `\nPreview URL: ${element.preview_url}`;

                // console.log("Album Name: " + element.album.name);
                text += `\nAlbum Name: ${element.album.name}`;

                displayData(text);
                logText += `\n${text}\n`;
            }
        });
    if(empty) {
        console.log(`Nothing found for ${param}`);
        logText = `Nothing found for ${param}`;
    }
    logData(spotifyResults, logText);
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
    inquirer.prompt([
        {
            name: "movie",
            message: "Enter the name of a movie."
        }
    ]).then(function (answer) {
        // console.log(`movieThis(): Movie = ${answer.movie}`);
        param = answer.movie.trim();
        getMovie(URLify(param));
    }).catch(function (err) {
        console.log(`spotifyThisSong(): error: ${err}`);
    });
}

// axios call to OMDB API
function getMovie(movieName) {
    // console.log(`getMovie(): movieName = ${movieName}`);
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            // console.log("OMDB returned: " + JSON.stringify(response.data, null, 2));
            parseOMDBData(response.data);
        }
    );
}

function parseOMDBData(data) {
    // console.log("OMDB: " + JSON.stringify(data, null, 2));
    if (data.Response !== "False") {
        var rT = "Rotten Tomatoes";
        data.Ratings.forEach(element => {
            if (element.Source === rT) {
                rT = rT + ": " + element.Value;
            }
        });

        var text = (`Title: ${data.Title} \nYear: ${data.Year} \nIMDB Rating: ${data.imdbRating} \n${rT} \nCountry: ${data.Country} \nLanguage: ${data.Language} \nPlot: ${data.Plot} \nActors: ${data.Actors}`);
        logData(omdbResults, text);
        displayData(text);
    } else {
        console.log(`The movie \"${param}\" was not found.`);
    }
}

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of
// LIRI's commands.
//  - It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//  - Edit the text in random.txt to test out the feature for movie-this and concert-this.
function doWhatItSays() {
    // Read random.txt
    fs.readFile("random.txt", "utf8", function (err, data) {
        var item = data.split(',');
        var  randomCommand = Math.floor(Math.random()*3)+1;
        // console.log(`randomCommand = ${randomCommand}`);

        // Switch on the returned commands
        switch (randomCommand) {
            case 1:
                command = item[0].trim();
                param = item[1];
                console.log(`action: ${command}, param: ${param}`);
                logData("log.txt", `"****do-what-it-says returned: ${command} ${param}****\n`);
                getSpotify(param);
                break;
            case 2:
                command = item[2].trim();
                param = item[3];
                console.log(`action: ${command}, param: ${param}`);
                logData("log.txt", `"****do-what-it-says returned: ${command} ${param}****\n`);
                getBandsInTown(param);
                break;
            case 3:
                command = item[4].trim();
                param = item[5];
                console.log(`action: ${command}, param: ${param}`);
                logData("log.txt", `"****do-what-it-says returned: ${command} ${param}****\n`);
                getMovie(URLify(param));
                break;
            default:
                console.log(`Error: Unrecognized command from random.txt: ${command} ${param}`);
        }
    });
}

// ******************************
// Main function - Collects initial command from user and takes appropriate action
// ******************************
function main() {
    inquirer.prompt([
        {
            type: "list",
            name: "command",
            message: "What would you like to do?",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
        }
    ]).then(function (answer) {
        command = answer.command;
        // console.log(`answer.command = ${answer.command}`);

        switch (command) {
            case "concert-this":
                concertThis();
                break;
            case "spotify-this-song":
                spotifyThisSong();
                break;
            case "movie-this":
                movieThis();
                break;
            case "do-what-it-says":
                doWhatItSays();
                break;
            default:
                console.log(`Invalid command: ${command}`);
                break;
        }
    });
}

main();

