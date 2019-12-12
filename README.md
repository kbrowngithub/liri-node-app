# liri-node-app
```
Designed and Developed by: Kevin Brown
```

# Project Overview
```
LIRI is a data search tool. It's like a simple version of iPhone's SIRI. 
However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a 
Language Interpretation and Recognition Interface that takes in parameters from a 
command line and returns data related to music and movie entertainment based on the 
parameters given. LIRI will search "Spotify" for songs, "Bands in Town" for concerts, 
and "OMDB" for movies and then parse and display the data back to the user.

```

# Organizational Overview

### Process Flow
```
    main()
        - concert-this
            - prompt for artist
                - (if no artist is given display message to the user with an example)
                - BandsInTown lookup
                    - Parse, Log, and Display data
                    - exit

        - spotify-this
            - prompt for song
                - (if no song is given default to "The Sign")
                - Spotify lookup
                    - Parse, Log, and Display data
                    - exit

        - movie-this
            - prompt for movie
                - (if no movie is given default to "Mr. Nobody")
                - OMDB lookup
                    - Parse, Log, and Display data
                    - exit

        - do-what-it-says (randomly selects one of the 3 commands listed in random.txt)
            - get a command from random.txt (command will be one of the 3 listed above)
                - run the command in the Liri app (go-to one of the 3 commands above)

```

### Technologies Used in this application

```
Technology Requirements:
    1. Data Sources
        a. Node-Spotify-API
        b. BandsInTown API
        c. OMDB API
    2. Logic
        a. Javascript
        b. Node.js (Inquirer, Axios, Moment, DotEnv)
    
```

### Implementation

```
User Prompts:
  - All user prompts and sub-prompts were implemented using the Node Inquirer package.

Data Sources by command:
  - concert-this: BandsInTown API
  - spotify-this: Spotify API
  - movie-this: OMDB API

Data logging was implemented. 
  - Data is logged to the data.log file using the Node fs package.

Node Dependencies:
    - "axios": "^0.19.0"
    - "dotenv": "^8.2.0"
    - "inquirer": "^7.0.0"
    - "moment": "^2.24.0"
    - "node-spotify-api": "^1.1.1"

```

# How to run the app

### Setup

```
1.) clone liri-node-app to your computer (git@github.com:kbrowngithub/liri-node-app.git)

2.) You'll need a Spotify API key. You can sign up here:
https://developer.spotify.com/my-applications/#!/login
Then follow the directions to create a new app.

3.) Once you have the Spotify key create a .env file containing the following 
    (replacing "your-spotify-id-here" with the spotify id you just received and 
    "your-spotify-secret-here" with the secret that you just received):
        
        # Spotify API keys
        SPOTIFY_ID=your-spotify-id-here
        SPOTIFY_SECRET=your-spotify-secret-here

Save it in the root directory of your liri-node-app instance.

4.) From a terminal cd into the root directory of your liri-node-app instance and run
the command:  npm install
This will install the required node packages.
```

### Execution

```
To execute the liri-node-app, from a terminal window cd into 
the root directory of the liri-node-app and type:  
    node liri.js

```

### Demo Recording Link: 

https://drive.google.com/file/d/1zrmQPSNTQCqva5Ja8REkh4PDA8xOcYSl/view


### Command Options:

```
1.) concert-this <artist/band name here>

Output:
    - Name of the venue
    - Venue location
    - Date of the Event ("MM/DD/YYYY")
```

```
2.) concert-this <no params>

Output:
    - Informational Message
        "You must enter an artist name (e.g. Celine Dion)"
```

```
3.) spotify-this <song name here>

Output:
    - Artist(s)
    - The song's name
    - A preview link of the song from Spotify
    - The album that the song is from
```

```
4.) spotify-this <no params> (will default to "The Sign")

Output :
    - Artist(s)
    - The song's name
    - A preview link of the song from Spotify
    - The album that the song is from
```

```
5.) movie-this <movie name here>

Output :
    - Title of the movie.
    - Year the movie came out.
    - IMDB Rating of the movie.
    - Rotten Tomatoes Rating of the movie.
    - Country where the movie was produced.
    - Language of the movie.
    - Plot of the movie.
    - Actors in the movie.
```

```
6.) movie-this <no params> (will default to "Mr. Nobody")

Output :
    - Title of the movie.
    - Year the movie came out.
    - IMDB Rating of the movie.
    - Rotten Tomatoes Rating of the movie.
    - Country where the movie was produced.
    - Language of the movie.
    - Plot of the movie.
    - Actors in the movie.

```

```
7.) do-what-it-says

Output :
    - randomly selects one of the first three commands each time executed
```





 