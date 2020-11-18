
const fetchTweets = (action) => {
  $
    .ajax('/tweets')
    .then(res => action(res))

}






/*
const submitTweet = (event, action) => {
  event.preventDefault();
  $
    .ajax({
      url: '/tweets',
      method: 'POST',
      data: $('form').serialize()
    })
    .then(res => action(res))
    .catch(err => console.log(err))
}
*/

/*
const addLatestTweet = (tweets, createTweetElement) => {
  const tweet = Object.values(tweets).pop()
  const newArticle =  createTweetElement(tweet);
  $('section .tweet-container').prepend(newArticle);
}
*/