$(function() {
  $( "textarea" ).on( "keyup", function(event) { 
    const maxLength = 140;
    let currentLength = maxLength - $(this).val().length;
    const $counter = $(this).parent().find(".counter");
    $counter.text(currentLength);
    if (currentLength < 0) {
      $counter.addClass("maxedOut");
    } else {
      $counter.removeClass("maxedOut");
    }
  });
});