$(function() {

// Use to convert Date.now()
  function getDaysDifference(tweet) {
    let $dateDifference = 0;
    const minutes = 1000 * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    let dateDiff = Math.round((Date.now() - tweet.created_at) / days);
    if (dateDiff === 0) {
      dateDiff = Math.round((Date.now() - tweet.created_at) / hours);
      if (dateDiff === 0) {
        dateDiff = Math.round((Date.now() - tweet.created_at) / minutes);
        $dateDifference = $("<span>").addClass("dateCreated").text(dateDiff + " minutes ago");
      } else {
        $dateDifference = $("<span>").addClass("dateCreated").text(dateDiff + " hours ago");
      }
    } else {
      $dateDifference = $("<span>").addClass("dateCreated").text(dateDiff + " days ago");
    }
    return $dateDifference;
  }

// Create New Tweets, the inside of section #tweetsContainer.
  function createTweetElement(tweet) {
    let $tweet = $("<article>").addClass("tweet");
    let $header = $("<header>");
    let $userAvatar = $("<img>").addClass("userAvatar").attr("src", tweet.user.avatars.small);
    let $userNAme = $("<h2>").addClass("userName").text(tweet.user.name);
    let $userHandle = $("<h6>").addClass("userHandle").text(tweet.user.handle);
    let $tweetContent = $("<p>").addClass("tweetText").text(tweet.content.text);
    let $footer = $("<footer>");
    let $icons = $("<div>").addClass("icons");

    $tweet.append($header, $tweetContent, $footer);
    $header.append($userAvatar, $userNAme, $userHandle);
    $footer.append(getDaysDifference(tweet), $icons);
    $icons.append( `<i class="fa fa-flag" aria-hidden="true"></i>
                 <i class="fa fa-retweet" aria-hidden="true"></i>
                 <i class="fa fa-heart" aria-hidden="true"></i>`);
    return $tweet;
  }

// Iterate each entry on /tweets. Last entry is on top.
  function renderTweets(tweets) {
    let $tweetsContainer = $("#tweetsContainer");
    $tweetsContainer.empty();
    for (let element in tweets) {
      let tweet = tweets[element];
      $tweetsContainer.prepend(createTweetElement(tweet));
    }
  }

// Get all the values from /tweets
  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).done(function(data) {
      renderTweets(data);
    });
  }
  loadTweets();

// On Submit Tweet
  $(".submitTweet").on("submit", function(event) {
    event.preventDefault();
    // Form validation of textarea
    let textLength = $("textarea").val().length;
    // If post textarea is empty, alert.
    if (textLength === 0) {
      alert("Please fill in the tweetbox.");
      $("textarea").focus();
    // If post is exceeding the limit max of characters, alert.
    } else if (textLength > 140) {
      alert("Character Limit Exceeded!");
      $("textarea").focus();
    } else {
      // Add the value to /tweets
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      }).done(function(data) {
        // once post to /tweets is done, load the tweet immediately on the page
        loadTweets();
        // Clear textarea upon sucessfull submit of tweet
        $("textarea").val("");
      });
    }
  });

// Compose button
  $("button").on("click", function(event) {
    event.preventDefault();
    $(".new-tweet").slideToggle("slow", function(){
      $("textarea").focus();
    });
  });
  
});