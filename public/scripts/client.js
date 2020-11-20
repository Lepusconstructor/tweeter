/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {
  //before creating new tweets, the page should have existing tweets loaded
  loadTweets();
  submitTweet();
})
  
const loadTweets = function() {
  $
    .ajax('/tweets')
    .then(tweets => renderTweets(tweets))
    .catch(err => console.log(err))
}
//to prevent from cross-site scripting, aka unsafe user input, create an "escape" funciton to encode the text
const escapeXSS =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}  

const createTweetElement = function(tweet) {
  let tweetHtml = `
  <article class="tweet">
    <header>
      <div class="name">
        <image src="${tweet.user.avatars}"/>
        <span>${tweet.user.name}</span>
      </div>
      <div class="handle">
        <span>${tweet.user.handle}</span>
      </div>
    </header>
      <p>
      ${escapeXSS(tweet.content.text)}
      </p>
    <footer>
      <div class="date">
      ${new Date(tweet.created_at).toLocaleDateString("en-US")}
      </div>
      <div>
      
      <i class="fa fa-flag">🏁</i> 
      <i class="fa fa-heart">💓</i>
      <i class="fa fa-retweet">✏</i>
      
      </div>
    </footer>
  </article>`;
  //theoratically the icons should be showing icons with just the classes, but here they are just place holders: "Refused to apply style from 'http://localhost:8080/node_modules/@fortawesome/fontawesome-free/css/all.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled."
    return tweetHtml;
};

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const newArticle = createTweetElement(tweet);
    //the newest tweet should be shown right after the composing tweet text area, and the one after should be the second newest and so on
    $('section.tweet-container').prepend(newArticle);
  }
}
  
const submitTweet = () => {
 
  $('form').submit(function(event) {
    //prevent the form from refreshing and rerouting
    event.preventDefault();
    const text = $('#tweet-text').val();
    //once the user clicks on the textarea, the error message shown before should disappear until there is a new error message
    $('#tweet-text').on('click', function() {
    $('.new-tweet .hidden').slideUp();
    })
    
    let validatedTweet = validation(text);
    
    if(validatedTweet === true){
      //submit tweet
      $
      .ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      })
      .then(function(){
        loadTweets();
        //clearing the text area
        $('#tweet-text').val("");
        //turn the count back to 140
        $("section.new-tweet").find("output").val(140);
      })
      
    }
    
  });
}

function validation(tweet) {
  if (tweet.length === 0) {
    let errormsg = "⛔  EMPTY! Like your pocket! Plz follow teh rulz ( 0 < what you have to say < 140 ) kthnxbai  ⛔";
    $('#error').text(errormsg);
    $('.new-tweet .hidden').slideDown();
  } else if (tweet.length > 140) {
    let errormsg = "⛔  TOO LONG! Like Canadian winter! Plz follow teh rulz ( 0 < what you have to say < 140 ) kthnxbai  ⛔";
    $('#error').text(errormsg);
    $('.new-tweet .hidden').slideDown();
  } else {
    return true;
  }
}




  

