
var TwitterPackage = require('twitter');

// replace the words in caps with the keys that
// we saw before on apps.twitter.com
var secret = {
  consumer_key: '	bOqm9rCAz5mvGagS2yVKti8KF',
  consumer_secret: 'nVX2mThtymOul4aPjuGEG9Fu1oXwE2jKnsghEtmOx7Uh5fFfut',
  access_token_key: '	887713453-7SZwxkey5bDZRG8nCy7UqATxnNeaZWXehsnYjDSm',
  access_token_secret: 'qr8VHjx3BcY2faLZjlWikgzHXWvLtrbHG0hx21u7c2u0a'
}

var Twitter = new TwitterPackage(secret);

var query = "alot";
Twitter.get('search/tweets', {q: query, count: 1, lang:"en"}, function(error, tweets, response) {

   var tweet_list = tweets['statuses'];

   for (var i = 0; i < tweet_list.length; i++) {
        if ('retweeted_status' in tweet_list[i]) {
            continue;
        }
        var screen_name = tweet_list[i].user.screen_name;
        var message = "@" + screen_name + " Alot confused, a lot not understand feelings";
        var tweet_id = tweet_list[i].id_str

        try {
            Twitter.post('statuses/update', {"status": message, "in_reply_to_status_id":tweet_id}, function(error, tweet, response){
                 console.log("Tweet posted successfully!")
            });
        }

        catch(err) {
            console.log(err);
        }
   }
});
