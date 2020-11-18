/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = [
  {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
},
{
  "user": {
    "name": "Emily",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227

}
  
];

$(document).ready(function() {
  const createTweetElement = function(tweet) {
    const tweetHtml = $(`
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
        ${tweet.created_at}
        </div>
        <div>xs
        icons
        </div>
      </footer>
    </article>`);
    return tweetHtml;
  };
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const newArticle = createTweetElement(tweet);
    $('section.tweet-container').append(newArticle);
    }
  }
  
  renderTweets(tweetData);
  /*
  $('form').on('submit', event => {
    event.preventDefault();
    fetchTweets(renderTweets);
    
    const createHTML = tweets => addLatestTweet(tweets, createTweetElement);
    const fetchAndUpdate = () => fetchTweets(createHTML);
    submitTweet(event, fetchAndUpdate);
    
})
    $('#submit-btn').on('click', event => {
      
      const createHTML = tweets => renderTweets(tweets, createTweetElement);
      fetchTweets(createHTML);
      
    })
  */
  })


  

