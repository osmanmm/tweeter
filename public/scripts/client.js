/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const createTweetElement = (tweetObject) => {
    const $tweetArticle = $(`
    <article class="tweet">
    <header>
        <div class="user-badge">
          <img class="user-avatar" src=${tweetObject.user.avatars}>
          <span class="user-name">${tweetObject.user.name}</span>
        </div>
        <span class="user-handle">${tweetObject.user.handle}</span>
    </header>
    <main>
      <div class="user-content">
        <p class="user-input"></p>
      </div>
    </main>
    <footer>
      <div class="footer-utility">
        <div>
          <span class="tweet-date">${timeago.format(
            tweetObject.created_at
          )}</span>
        </div>
        <div class="footer-icons">
          <div>
            <i class="fas fa-flag icon"></i>
          </div>
          <div>
            <i class="fas fa-retweet icon"></i>
          </div>
          <div>
            <i class="fas fa-heart icon"></i>
          </div>
        </div>
      </div>
    </footer>
  </article>
      `);

    $tweetArticle.find(".user-input").text(tweetObject.content.text);
    return $tweetArticle;
  };

  const renderTweets = (tweetData) => {
    tweetData.forEach((tweet) => {
      const $newTweet = createTweetElement(tweet);
      $(".tweet-container").prepend($newTweet);
    });
  };

  const postTweet = () => {
    $.get("/tweets", function (data, status) {
      const $newTweet = createTweetElement(data[data.length - 1]);
      $(".tweet-container").prepend($newTweet);
    });
  };

  const showError = (text) => {
    $(".error-msg").text(text);
    $(".error-box").slideDown("slow");
  };

  const hideError = () => {
    $(".error-box").slideUp();
  };

  $("form").submit(function (event) {
    event.preventDefault();

    const form = $(this);
    const textArea = $(this).find(".tweet-text");

    if (textArea.val() === "") {
      return showError("Cannot submit empty field");
    } else if (textArea.val().length >= 140) {
      return showError("Too many characters! #relax");
    }

    $.ajax({
      url: "/tweets",
      type: "POST",
      data: form.serialize(),
    }).then(() => {
      postTweet();
    });

    hideError();
    textArea.val("");
  });

  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      type: "GET",
      dataType: "json",
    }).then((response) => {
      renderTweets(response);
    });
  };

  loadTweets();
});
