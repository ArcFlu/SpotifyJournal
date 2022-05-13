# SpotifyJournal
 A web application to view my personal Spotify journal containing the songs I listened to on x day.


Backend Notes:
// Setup RESTful API locally
https://www.codementor.io/@olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd

// Express
https://expressjs.com/en/starter/basic-routing.html

// Deleting Avaiable Markets from Album and Track Data
124821 / 40829 = 3.0571652502;

Collection Name	Documents	Documents Size	Documents Avg	Indexes	Index Size	Index Avg
recentAM        1	        121.91KB	    121.91KB	    1	    4KB	        4KB
recentNAM       1	        39.89KB	        39.89KB	        1	    4KB	        4KB
By removing this unnecessary information, it reduces the document size by 3 times!!

// Authorization Notes
When planning authorization, we need to know/figure out how login will work.
Login consists of initial authorization and post authorization, so we need to know
how we will persist the user's credentials.

// getMyRecentlyPlayedTracks
Songs only count towards listening history if it gets to the end of the song, not if you skip it.
When I run the script, I'll schedule it for an hour + 1 minute after.
Edge case: previous day

// I will also have to account for duplicates, I'll probably actually store that data so we can see
// you played it over and over.

// AWS Lambda
zip -r function.zip .
command to properly zip for AWS
remember to update .gitignore
CRON


// Additional features: Look up the mood of the songs 
// Energy of your music throughout the day

// Bug Backlog
AWS Lambda uses UTC, convert to UTC
