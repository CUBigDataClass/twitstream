var Twit   = require('twit'), // wrapper on top of twitter api
  dotenv   = require('dotenv'), // used for keys -> get from .env
  sentiment = require('sentiment'),
  fs        = require('fs'),
  Tweet     = require('./mongo.js').tweetInit();

  dotenv.load();

  var T = new Twit({
      consumer_key:       process.env.TWITTER_CONSUMER_KEY,
      consumer_secret:    process.env.TWITTER_SECRET_KEY,
      access_token:       process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret:  process.env.TWITTER_ACCESS_KEY
  });

  var stream = T.stream('statuses/sample')

  function getTweetsOne() {
      stream.on('tweet', function(tweet){
      // filter tweets that have geo location and are in english
      if(tweet.geo != null && tweet.lang=="en" && 
        (((tweet.geo.coordinates[0] >= -180 && tweet.geo.coordinates[0] <= -90)||(tweet.geo.coordinates[0] >= 90 && tweet.geo.coordinates[0] <= 180))
        ||((tweet.geo.coordinates[1] >= 90 && tweet.geo.coordinates[1] <= 180) || (tweet.geo.coordinates[1] >= -180 && tweet.geo.coordinates[1] <= -90)))){
        var obj = JSON.stringify(tweet);
        Tweet.create(tweet, function(err,doc){
          if(err) throw err;
          console.log(obj);
        })
      }
    })
  }
 function getTweetsTwo(){
    stream.on('tweet', function(tweet){
      // filter tweets that have geo location and are in english
      if(tweet.geo != null && tweet.lang=="en" && ((tweet.geo.coordinates[0] >= -90 && tweet.geo.coordinates[0] <= 90)
                                               &&(tweet.geo.coordinates[1] >= -90 && tweet.geo.coordinates[1] <= 90))){
        var obj = JSON.stringify(tweet);
        Tweet.create(tweet, function(err,doc){
          if(err) throw err;
          console.log(obj);
        })
      }
    })
  }

exports.getTweetsOne = getTweetsOne;
exports.getTweetsTwo = getTweetsTwo;



