const router = require('express').Router()
const { mailsListing, getSingleMail } = require('./listMails')
const { oauthCallback } = require('./oauth')


router.get('/list', mailsListing)
router.get('/list/:threadId', getSingleMail)
router.get('/oauth-callback', oauthCallback)

module.exports = exports = router