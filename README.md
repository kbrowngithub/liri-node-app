# liri-node-app

# Designed and Developed by: Kevin Brown

# Project Overview:
```
LIRI is a data search tool. It's like a simple version of iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface that takes in parameters from a command line and returns data related to music and movie entertainment based on the parameters given. LIRI will search "Spotify" for songs, "Bands in Town" for concerts, and "OMDB" for movies and then parse and display the data back to the user.

```

# Organizational Overview:

### Process Flow:
```
    main()
        - concert-this
            - prompt for artist
                - (if no artist is given display message to the user with an example)
                - BandsInTown lookup
                    - Parse, Log, and Display data

        - spotify-this
            - prompt for song
                - (if no song is given default to "The Sign")
                - Spotify lookup
                    - Parse, Log, and Display data

        - movie-this
            - prompt for movie
                - (if no movie is given default to "Mr. Nobody")
                - OMDB lookup
                    - Parse, Log, and Display data

        - do-what-it-says (randomly selects one of the 3 commands listed in random.txt)
            - get a command from random.txt (command will be one of the 3 listed above)
                - run the command in the Liri app

    end

```

# Technologies Used in this application:

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

# How to run the app:

```
You'll need a Spotify API key. You can sign up here:
https://developer.spotify.com/my-applications/#!/login
Then follow the directions to create a new app.

Once you have the Spotify key create a .env file containing the following:
        
        # Spotify API keys
        SPOTIFY_ID=your-spotify-id-here
        SPOTIFY_SECRET=your-spotify-secret-here

Save it in the root directory of your liri-node-app instance.

To run liri in a terminal window, in the root directory of the liri app type:  node liri.js
You'll then be prompted for what to do and any associated search parameters.

```

 # Screen Shots

```
 
 Main Menu

 ```
 <img width="977" alt="Start Screen Shot" src="assets/images/StartScreen.PNG">
 
 ```
 
 Data Display

 ```

 <img width="977" alt="Start Screen Shot" src="assets/images/PlayScreen.PNG">
 
 ```
 
 ```

### Demo Recording Link: https://drive.google.com/file/d/1zrmQPSNTQCqva5Ja8REkh4PDA8xOcYSl/view

# Test Cases:

```

1.) concert-this <params>

2.) concert-this <no params>

3.) spotify-this <params>

4.) spotify-this <no params>

5.) movie-this <params>

6.) movie-this <no params>

7.) do-what-it-says (randomly select one of the first three commands each time executed)

8.) do-what-it-says (randomly select one of the first three commands each time executed)

9.) do-what-it-says (randomly select one of the first three commands each time executed)


```



 