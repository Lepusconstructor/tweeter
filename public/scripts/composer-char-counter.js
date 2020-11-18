$(document).ready(function() {
  console.log("I'm ready.");
  
  $('#tweet-text').on('input', function() {
  let keyEn = $(this).val().length;
  //console.log(140 - keyEn);
  //$('.counter').val(140 - keyEn);
  if (keyEn <= 140) {
    $("section.new-tweet").find("output").val(140 - keyEn).css("color","#545149");
  } else {
    $("section.new-tweet").find("output").val(140 - keyEn).css("color","red");
  }
 

  
});



});


