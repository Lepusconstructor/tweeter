/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {
  loadTweets();
  $('#compose-btn').on('click', function() {
    $('form').slideUp;
  });
  $('#compose-btn').on('click', function() {
    $('form').slideDown;
  });
  submitTweet();
  
})
  
const loadTweets = function() {
  $
    .ajax('/tweets')
    .then(tweets => renderTweets(tweets))
    .catch(err => console.log(err))
}

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
    return tweetHtml;
};

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const newArticle = createTweetElement(tweet);
    $('section.tweet-container').prepend(newArticle);
  }
}
  
const submitTweet = () => {
 
  $('form').submit(function(event) {
    event.preventDefault();
    const text = $('#tweet-text').val();
    $('#tweet-text').on('click', function() {
    $('.new-tweet .hidden').slideUp();
    })
    let validatedTweet = validation(text);
    
    if(validatedTweet === true){
      $
      .ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      })
      .then(function(){
        loadTweets();
        $('#tweet-text').val("");
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




  

