const { google } = require('googleapis')
const { authorization } = require('./oauth')

async function mailsListing(req, res, next) {
    try {
        const auth = await authorization()
        const gmail = google.gmail({ version: 'v1', auth });
        const list = await gmail.users.threads.list({
            userId: 'me',
            maxResults: 10
        })
        res.json({ list: list.data.threads })
    } catch (error) {
        console.log(error)        
    }
}

// params -> threadId
async function getSingleMail(req, res, next) {
    try {
        const { threadId } = req.params
        const auth = await authorization()
        const gmail = google.gmail({ version: 'v1', auth });
        const thread = await gmail.users.threads.get({
            userId: 'me',
            id: threadId
        })
        const fromIndex = thread.data.messages[0].payload.headers.findIndex(eachHeader => eachHeader.name === 'From')
        res.json({
            body: thread.data.messages[0].snippet,
            from: thread.data.messages[0].payload.headers[fromIndex].value
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = exports = {
    mailsListing,
    getSingleMail
}