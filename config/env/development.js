module.exports = {
  db: 'mongodb://localhost/mean-book',
  sessionSecret: 'developmentSessionSecret',
  facebook: {
    clientID: '1580163918917999',
    clientSecret: '6c6a7a77b7142a3ba437d3ee96546797',
    callbackURL: 'http://localhost:3000/oauth/facebook/callback'
  },
  twitter: {
    clientID: '2787003818',
    clientSecret: 'TYjJdit0Z9qTxUTdQJLqAyv9UxGFkbQfeNtri9tK5Sny20YLxB',
    callbackURL: 'http://localhost:3000/oauth/twitter/callback'
  }
};