/**
 * EmojiController
 *
 * @description :: Server-side logic for managing emojis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // Thanks to blue print, this will be automatically available
    // This URl would be http://localhost:1337/emoji/id/takeover?owner=id
    associateWithUser: function(req, res){
        Emoji.update({
            id: req.param('id')
        }, {
            owner: req.param('owner')
        }).exec(function(err){
            if(err) return res.negotiate(err);

            res.ok();
        });
        /*console.log('hello');
        res.json({
            hello: 'world'
        });*/
    }
	/*
    find: function(req, res){},
    findOne: function(req, res){},
    create: function(req, res){},
    update: function(req, res){},
    destroy: function(req, res){}
    */
};

