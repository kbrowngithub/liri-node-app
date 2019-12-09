require("dotenv").config();

var keys = require("./keys.js");
console.log(keys);
var spotify = new Spotify(keys.spotify);
console.log(spotify);

function runQuery() {
    console.log(`Processing ${process.argv[2]} ${process.argv[3]} ...`);
}

runQuery();
