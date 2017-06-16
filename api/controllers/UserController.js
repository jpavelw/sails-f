/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

require('dotenv').config();
const https = require('https');
const randomstring = require("randomstring");

module.exports = {
	// GET /user/:id
    // http://localhost:1337/user/id
    /*findOne: function(req, res){
        User.findOne({
            id: req.param('id')
        }).exec(function(err, user){
            if(err) return res.negotiate(err);

            // Subscribe to changes to this particular user events
            // Will send socket events when studd happens
            User.subscribe(req, user.id);
            return res.json(user);
        });
    }*/
    
    // GET /user/whoAmI
    whoAmI: function(req, res){
        return res.json({
            me: req.session.me
        });
    },

    findOne: function(req, res){

        /*const options = {
            hostname: 'api.twitter.com',
            path: '/oauth/request_token',
            method: 'POST',
            headers: {
                'oauth_consumer_key': process.env.TWITTER_API_KEY,
                'oauth_signature_method': 'HMAC-SHA1',
                'oauth_version': '1.0',
                'oauth_timestamp': Date.now().toString(),
                'oauth_token': process.env.TWITTER_ACCESS_TOKEN,
                'oauth_callback': encodeURI(process.env.TWITTER_API_CALLBACK),
                'oauth_nonce': randomstring.generate()
            }  
        };

        var _data = '';
        const postReq = https.request(options, (result) => {
            //console.log('statusCode:', result.statusCode);
            //console.log('headers:', result.headers);
            console.log('data:', result);

            res.on('data', (data) => {
                _data += data;
            });
            response.on('end', function() {
                console.log(_data)
            });
        });
        postReq.on('error', (err) => {
            if(err) return res.negotiate(err);
        });
        postReq.end();

        User.findOne({
            screenName: req.param('screenName')
        }).exec(function(err, user){
            if(err) return res.negotiate(err);

            if(!user) return res.notFound();
            Emoji.find({
                owner: user.id
            }).exec(function(err, emojis){
                if(err) return res.negotiate(err);

                return res.view('profile', {
                    user: user,
                    emojis: emojis,
                    twitterLoginUrl: 'https://api.twitter.com/oauth/authenticate?oauth_token='
                });
            });
        });*/

        // node-machine.org
        //TODO: build twitterLoginUrl

        var Twitter = require('machinepack-twitter');

        // Get the URL on twitter.com that a user should visit to allow/deny the specified Twitter Developer app (i.e. your app).
        Twitter.getLoginUrl({
            callbackUrl: process.env.TWITTER_API_CALLBACK,
            consumerKey: process.env.TWITTER_API_KEY,
            consumerSecret: process.env.TWITTER_API_SECRET
        }).exec({
            // An unexpected error occurred.
            error: function (err) {
                if(err) return res.negotiate(err);
            },
            // OK.
            success: function (twitterLoginUrl) {
                User.findOne({
                    screenName: req.param('screenName')
                }).exec(function(err, user){
                    if(err) return res.negotiate(err);

                    if(!user) return res.notFound();

                    Emoji.find({
                        owner: user.id
                    }).exec(function(err, emojis){
                        if(err) return res.negotiate(err);

                        return res.view('profile', {
                            user: user,
                            emojis: emojis,
                            twitterLoginUrl: twitterLoginUrl
                        });
                    });
                });
            },
        });
    }
};

