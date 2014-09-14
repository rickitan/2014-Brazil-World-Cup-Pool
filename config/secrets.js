module.exports = {
  db: process.env.MONGODB|| 'mongodb://rickitan:quiniela@dbh83.mongolab.com:27837/quiniela', //'mongodb://localhost:27017/test',
  //To back up run: mongodump -h dbh83.mongolab.com:27837 -d quiniela -u rickitan -p quiniela -o /Users/ricardomacario/Desktop/quinielaDBBackup
  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

  localAuth: true,

  facebookAuth: true,
  facebook: {
    clientID: process.env.FACEBOOK_ID || '765874370098491',
    clientSecret: process.env.FACEBOOK_SECRET || '3aceb191612ac97a9a7798d4853e45ee',
    callbackURL: '/auth/facebook/callback',
    passReqToCallback: true
  }



};
