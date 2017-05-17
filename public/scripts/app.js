$(function() {

  function loadTweets() { 
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).done(function(data) {
      renderTweets(data);
    });
  };

  loadTweets();

let $submitTweet = $(".submitTweet");
$submitTweet.on("submit", function(event) {
  event.preventDefault();
  $(this).serialize();
});


function renderTweets(tweets) {
  let $tweetsContainer = $("#tweetsContainer");
  for (let element in tweets) {
    let tweet = tweets[element];
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
  $tweet.append($header, $tweetContent, $footer);
  $header.append($userAvatar, $userNAme, $userHandle);
  $footer.append($dateCreated, $icons);
  $icons.append( `<i class="fa fa-flag" aria-hidden="true"></i>
                 <i class="fa fa-retweet" aria-hidden="true"></i>
                 <i class="fa fa-heart" aria-hidden="true"></i>)`);
  return $tweet;
}


  //renderTweets(data);
});