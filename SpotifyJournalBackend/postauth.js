require("dotenv").config();
const recent = require('./insertRecent');
const express = require("express");
const app = express();
var SpotifyWebApi = require("spotify-web-api-node");

// Parameters for authorization
var userCredentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI + "/callback",
};

// since we have credentials, initialize SpotifyWebApi with credentials
var spotifyApi = new SpotifyWebApi(userCredentials);
const refresh_token = process.env.REFRESH_TOKEN;
spotifyApi.setRefreshToken(refresh_token);
spotifyApi.refreshAccessToken()
.then(
    function(data) {
      console.log('The access token has been refreshed!');
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);

      // get data every hour
      const currentTime = new Date().getTime();
      const pastHourTime = currentTime - 3_600_000;

      spotifyApi.getMyRecentlyPlayedTracks({after: pastHourTime, limit: 50,})
        .then(
            (data) => {
                const songList = data.body.items;
                let nameList = [];
                for (let item of songList){
                    nameList.push(item.track.name);
                }
                
                // after parsing through API data, send it to the database
                recent.insertRecent(songList);
            }
        )
    },
    function(err) {
      console.log('Could not refresh access token', err);
    }
  )


