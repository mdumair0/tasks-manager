const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'farzi9002@gmail.com',
    subject: 'Thanks For Joining in !!',
    text: `Welcome to the App ${name}.`,
  })
};

const sendExitEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'farzi9002@gmail.com',
    subject: 'Bye and thank you For giving us your time !!',
    text: `Sorry to see you go ${name}.`,
  })
};

module.exports = {sendWelcomeEmail, sendExitEmail};
