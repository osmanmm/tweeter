$(document).ready(function () {
  const textArea = $(".tweet-text");

  textArea.on("input", function () {
    let inputValue = $(this).val().length;
    let counter = $(this).siblings(".tweet-extras").contents(".counter");
    let remainingChars = 140 - inputValue;
    counter.val(140 - inputValue);

    if (remainingChars < 0 ) {
      counter.addClass('counter-color');
      
    } else {
      counter.removeClass('counter-color');
    }
  });
});
