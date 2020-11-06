const nodemailer = require('nodemailer')
const TalkyError = require('./talkyError')

async function sendMail (emailId, subj, txt) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MT_USER,
      pass: process.env.MT_PASSWORD
    }
  })

  const mailOptions = {
    from: 'hello@gmail.com',
    to: emailId,
    subject: subj,
    text: txt
  }
  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('MessageSent: %s', info.messageId)
  } catch (err) {
    throw new TalkyError(err.message, 500)
  }
}

module.exports = sendMail
