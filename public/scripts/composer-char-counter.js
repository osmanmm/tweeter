 $(document).ready(function() {
  
  const textArea = $(".tweet-text");

  textArea.on("input", function() {
    let inputValue = $(this).val().length;
    let counter = $(this).siblings(".tweet-extras").contents(".counter");
  
    counter.val(140 - inputValue);

    if (counter.val() < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "");
    }
  });
});
