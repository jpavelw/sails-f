/**
 * TwitterController
 *
 * @description :: Server-side logic for managing twitters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

require('dotenv').config();

module.exports = {
	handleLogin: function(req, res){
        var Twitter = require('machinepack-twitter');

        // Generate a new access token for acting on behalf of a particular Twitter user account.
        Twitter.getAccessToken({
            oauthToken: req.param('oauth_token'),
            oauthVerifier: req.param('oauth_verifier'),
            consumerKey: process.env.TWITTER_API_KEY,
            consumerSecret: process.env.TWITTER_API_SECRET
        }).exec({
            // An unexpected error occurred.
            error: function (err) {
                return res.negotiate(err);
            },
            // OK.
            success: function (result) {
                req.session.me = 'hey';
                return res.ok();
            },
        });
    }
};

