const nodemailer = require('nodemailer')
const TalkyError = require('./talkyError')

async function sendMail (emailId, subj, txt) {
  /* const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MT_USER,
      pass: process.env.MT_PASSWORD
    }
  }) */

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_ID,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: process.env.ACCESS_TOKEN
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: emailId,
    subject: subj,
    text: `Welcome to app talky. Your one time password for authorisation is - ${txt}`
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('MessageSent: %s', info.messageId)
  } catch (err) {
    throw new TalkyError(err.message, 500)
  }
}

module.exports = sendMail
