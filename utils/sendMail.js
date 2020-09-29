import nodemailer from "nodemailer";

export default function sendMail(emailId, subj, txt) {
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1a5c93d52a0e00",
          pass: "03df48b9bcc41d"
        }
    });

  const mailOptions = {
    from: "hello@gmail.com",
    to: emailId,
    subject: subj,
    text: txt,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
