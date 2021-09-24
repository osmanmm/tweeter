$(document).ready(function() {

    $('.tweet-date').text((index, text) => {
      return timeago.format(text);
    });
  
  });