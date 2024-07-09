const nodeMailer = require('nodemailer');

export const transporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "soporte.movil.nachos@gmail.com",
    pass: "ofmr nqdw tkll fiuc"
  }
});
