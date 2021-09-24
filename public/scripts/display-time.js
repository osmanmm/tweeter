$(document).ready(function() {

    $('.tweet-date').text((index, text) => {
      console.log(text);
      return timeago.format(text);
    });
  
  });