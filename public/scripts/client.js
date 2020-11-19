/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {
  loadTweets();
  submitTweet();
})
  
const loadTweets = function() {
  $
    .ajax('/tweets')
    .then(tweets => renderTweets(tweets))
}
  
const createTweetElement = function(tweet) {
  let tweetHtml = $(`
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
      ${tweet.content.text}
      </p>
    <footer>
      <div class="date">
      ${new Date(tweet.created_at)}
      </div>
      <div>
      icons
      </div>
    </footer>
  </article>`);
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
    alert("Where your tweet at??");
  } else if (tweet.length > 140) {
    alert("Yo it's too long, like Canadian winter!");
  } else {
    return true;
  }
}




  

