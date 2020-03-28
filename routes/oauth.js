const fs = require('fs')
const { google } = require('googleapis')
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env
const TOKEN_PATH = 'token.json';
const tokens = require('../token.json')

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
);

async function authorization() {
    try {
        if (tokens.refresh_token) {
            // Make use of the refresh token
            oAuth2Client.setCredentials(tokens);
            return oAuth2Client
        }
        // Or take the url from the below code 
        // and allow access to your account
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        return authUrl
    } catch (error) {
        console.log(error)
    }
}


async function oauthCallback(req, res, next) {
    try {
        const { code } = req.query
        const { tokens } = await oAuth2Client.getToken(code)
        oAuth2Client.setCredentials(tokens);
        res.json({ message: 'authorization successful' })
        fs.writeFile(TOKEN_PATH, JSON.stringify(tokens), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = { authorization, oauthCallback }