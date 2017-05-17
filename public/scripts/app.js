$(function() {
// Fake data taken from tweets.json
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {
  let $tweetsContainer = $('#tweetsContainer');
  for (let element in data) {
    let tweet = data[element];
    $tweetsContainer.append(createTweetElement(tweet));
  }
}

function createTweetElement(tweet) {
  let $tweet = $("<article>").addClass("tweet");
  let $header = $("<header>");
  let $userAvatar = $("<img>").addClass("userAvatar").attr("src", tweet.user.avatars.small);
  let $userNAme = $("<h2>").addClass("userName").text(tweet.user.name);
  let $userHandle = $("<h6>").addClass("userHandle").text(tweet.user.handle);
  let $tweetContent = $("<p>").addClass("tweetText").text(tweet.content.text);
  let $footer = $("<footer>");
  let $dateCreated = $("<span>").addClass("dateCreated").text(tweet.created_at);
  let $icons = $("<div>").addClass("icons");
  $icons.append( `<i class="fa fa-flag" aria-hidden="true"></i>
                 <i class="fa fa-retweet" aria-hidden="true"></i>
                 <i class="fa fa-heart" aria-hidden="true"></i>)`);
  $tweet.append($header, $tweetContent, $footer);
  $header.append($userAvatar, $userNAme, $userHandle);
  $footer.append($dateCreated, $icons);

  return $tweet;
}


  renderTweets(data);
});