const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  console.log( email );
  sgMail.send({
    to: email,
    from: 'farzi9002@gmail.com',
    subject: 'Thanks For Joining in !!',
    text: `Welcome to the App ${name}.`
  }).then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}

const sendExitEmail = (email, name) => {
  console.log( email );
  sgMail.send({
    to: email,
    from: 'farzi9002@gmail.com',
    subject: 'Bye and thank you For giving us your time !!',
    text: `Sorry to see you go ${name}.`
  }).then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}

module.exports = { sendWelcomeEmail, sendExitEmail }