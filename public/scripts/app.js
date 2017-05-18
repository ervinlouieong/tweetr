$(function() {

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

function renderTweets(tweets) {
  let $tweetsContainer = $("#tweetsContainer");
  $tweetsContainer.empty();
  for (let element in tweets) {
    let tweet = tweets[element];
    $tweetsContainer.prepend(createTweetElement(tweet));
  }
}

$(".submitTweet").on("submit", function(event) {
  event.preventDefault();
  let textLength = $("textarea").val().length;
  if (textLength === 0) {
    alert("Please fill in the tweetbox.");
  } else if (textLength > 140) {
    alert("Character Limit Exceeded!");
  } else {
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize()
    }).done(function(data) {
      loadTweets();
    })
  }
});

function loadTweets() { 
  $.ajax({
    url: "/tweets",
    method: "GET"
  }).done(function(data) {
     renderTweets(data); 
    });
}

loadTweets();

});