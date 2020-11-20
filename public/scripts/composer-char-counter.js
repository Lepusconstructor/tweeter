$(document).ready(function() {
  console.log("I'm ready.");
  
  $('#tweet-text').on('input', function() {
  let keyEn = $(this).val().length;
  
  //$('.counter').val(140 - keyEn) would also find the value of the counter, but by going to the parent and go down to the child we can achieve the same result, which is preferable
  if (keyEn <= 140) {
    $("section.new-tweet").find("output").val(140 - keyEn).css("color","#545149");
  } else {
    $("section.new-tweet").find("output").val(140 - keyEn).css("color","red");
  }
 

  
});



});


