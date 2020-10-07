const nodemailer = require('nodemailer')

function sendMail (emailId, subj, txt) {
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

module.exports = sendMail
