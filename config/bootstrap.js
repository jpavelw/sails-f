/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // This will run when the sails is lifted
  //console.log('Hello', (1 + 9) % 30);
  // The sails ORM supports a single object and an array of objects
  /*
  Emoji.create({
    text: '=)'
  });
  */
  /*
  Emoji.create([{
    text: '=)'
  }, {
    text: ':('
  }, {
    text: '8-)'
    }]).exec({
      error: function theBadFuture(err){
        console.log('IT DID NOT WORK OMG', err);
        cb(err);
      },
      success: function theGoodFuture(result){
        console.log('IT WORKED');
        cb();
      }
    });
  /*}]).exec(function theFuture(err, result){
    if(err){
      // handle it
      cb(err);
    }
    else {
      // handle success case
      // It's very important to trigger this callback method when you are finished
      // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
      cb();
    }
  });
  */

  /*
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
  */
  cb();
};
