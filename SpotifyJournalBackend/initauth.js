require("dotenv").config();
const recent = require('./insertRecent');
const express = require("express");
const { redirect } = require("express/lib/response");
var SpotifyWebApi = require("spotify-web-api-node");

// Parameters for authorization
var scopes = ["user-read-private", "user-read-email", "user-read-recently-played"];
var userCredentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI + "/callback",
};

// authorize and open url using credentials
var spotifyApi = new SpotifyWebApi(userCredentials);
var authorizeURL = spotifyApi.createAuthorizeURL(scopes);
const open = require("open");
open(authorizeURL);

const app = express();
app.listen(8888, () => {
    console.log("listening on port 8888");
});

app.get("/callback", (req, res) => {
    var code = req.query.code;
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(
        function (data) {
            console.log("The token expires in " + data.body["expires_in"]);
            console.log("The access token is " + data.body["access_token"]);
            console.log("The refresh token is " + data.body["refresh_token"]);

            // Set the access token on the API object to use it in later calls
            spotifyApi.setAccessToken(data.body["access_token"]);
            spotifyApi.setRefreshToken(data.body["refresh_token"]);
            
            spotifyApi.getMyRecentlyPlayedTracks().then(
                (data) => {
                    const songList = data.body.items;
                    let nameList = [];
                    for (let item of songList){
                        nameList.push(item.track.name);
                    }

                    recent.insertRecent(songList);
                }
            )
        },
        function (err) {
            console.log("Something went wrong!", err);
        }
    );
});
