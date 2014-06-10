module.exports = {
  db: process.env.MONGODB|| 'mongodb://rickitan:quiniela@dbh83.mongolab.com:27837/quiniela', //'mongodb://localhost:27017/test',
  //To back up run: mongodump -h dbh83.mongolab.com:27837 -d quiniela -u rickitan -p quiniela -o /Users/ricardomacario/Desktop/quinielaDBBackup
  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

  localAuth: true,

  mailgun: {
    login: process.env.MAILGUN_LOGIN || 'Your Mailgun SMTP Username',
    password: process.env.MAILGUN_PASSWORD || 'Your Mailgun SMTP Password'
  },

  sendgrid: {
    user: process.env.SENDGRID_USER || 'Your SendGrid Username',
    password: process.env.SENDGRID_PASSWORD || 'Your SendGrid Password'
  },


  facebookAuth: true,
  facebook: {
    clientID: process.env.FACEBOOK_ID || '765874370098491',
    clientSecret: process.env.FACEBOOK_SECRET || '3aceb191612ac97a9a7798d4853e45ee',
    callbackURL: '/auth/facebook/callback',
    passReqToCallback: true
  },


  twitterAuth: false,
  twitter: {
    consumerKey: process.env.TWITTER_KEY || 'Your Consumer Key',
    consumerSecret: process.env.TWITTER_SECRET  || 'Your Consumer Secret',
    callbackURL: '/auth/twitter/callback',
    passReqToCallback: true
  },

  googleAuth: false,
  google: {
    clientID: process.env.GOOGLE_ID || 'Your Client ID',
    clientSecret: process.env.GOOGLE_SECRET || 'Your Client Secret',
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
  }

};
