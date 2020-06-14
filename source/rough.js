const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: 'smtp.gmail.com',
    // port: 587,
    // secure: false,
    // requireTLS: true,
    auth: {
        user:'amityv0113',
        pass:'Donotaskmeagain'
    }
});
var mailOptions = {
    from: 'amityv0113@gmail.com', // sender address
    to:'amit@leadsmagnet.biz', // list of receivers
    subject: "Hello ", // Subject line
    text: "Hello world comming from amit Yadav", // plain text body
    html: "<b>Hello world?</b>", // html body
};


transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
        // response.send({error: error})
    }
    else 
    {
        console.log('Email sent: ' + info);
        // response.send(info)
    }
})