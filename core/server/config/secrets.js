module.exports = {
  db: process.env.MONGODB|| 'mongodb://localhost:27017/test',

  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

  localAuth: true,

  mailgun: {
    login: process.env.MAILGUN_LOGIN || 'Your Mailgun SMTP Username',
    password: process.env.MAILGUN_PASSWORD || 'Your Mailgun SMTP Password'
  },

  sendgrid: {
    user: process.env.SENDGRID_USER || 'Your SendGrid Username',
    password: process.env.SENDGRID_PASSWORD || 'Your SendGrid Password'
  }
};
