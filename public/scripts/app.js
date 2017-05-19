$(function() {

// Use to convert Date.now()
  function getDaysDifference(tweet) {
    const $dateClass = $("<span>").addClass("dateCreated");
    let $dateDifference = 0;
    const minutes = 1000 * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    let dateDiff = Date.now() - tweet.created_at;
    let dateDiffConvert = Math.round(dateDiff / days);
    if (dateDiffConvert === 0) {
      dateDiffConvert = Math.round(dateDiff / hours);
      if (dateDiffConvert === 0) {
        dateDiffConvert = Math.round(dateDiff / minutes);
        $dateDifference = $dateClass.text(dateDiffConvert + " minutes ago");
      } else {
        $dateDifference = $dateClass.text(dateDiffConvert + " hours ago");
      }
    } else {
      $dateDifference = $dateClass.text(dateDiffConvert + " days ago");
    }
    return $dateDifference;
  }

// Create New Tweets, the inside of section #tweetsContainer.
  function createTweetElement(tweet) {
    const $tweet = $("<article>").addClass("tweet");
    const $header = $("<header>");
    const $footer = $("<footer>");
    const $icons = $("<div>").addClass("icons");
    let $userAvatar = $("<img>").addClass("userAvatar").attr("src", tweet.user.avatars.small);
    let $userNAme = $("<h2>").addClass("userName").text(tweet.user.name);
    let $userHandle = $("<h6>").addClass("userHandle").text(tweet.user.handle);
    let $tweetContent = $("<p>").addClass("tweetText").text(tweet.content.text);

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
    const $tweetsContainer = $("#tweetsContainer");
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
        $(".counter").text("140");
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