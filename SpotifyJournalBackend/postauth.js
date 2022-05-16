require("dotenv").config();
const recent = require('./insertRecent');
const pastHourTime = require('./utility').pastHourTime;
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

const getRecent = async () => {
await spotifyApi.refreshAccessToken()
.then(
    async function(data) {
    //   console.log('The access token has been refreshed!');
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);

      await spotifyApi.getMyRecentlyPlayedTracks({after: pastHourTime, limit: 20,})
        .then(
            async (data) => {
                const songList = data.body.items;
                // console.log(data);
                // get user information then send data to the database
                await spotifyApi.getMe()
                .then(
                    async (userData) => {
                        await recent.insertRecent(songList, userData);
                    }
                )
            }
        )
    },
    function(err) {
      console.log('Could not refresh access token', err);
    }
    )
    return("Success!");
}

// getRecent();
exports.getRecent = getRecent;
