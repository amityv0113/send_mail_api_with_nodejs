const express = require('express')

const path = require('path')

const app = express()

const dotenv = require('dotenv');

const file_dir = path.join(__dirname, '../config/dev.env')

dotenv.config({
    path: file_dir
});



const nodemailer = require("nodemailer");

var verifier = require('email-verify');

const port = process.env.PORT

console.log(typeof (process.env.user_password))
console.log(process.env.user_email)

app.use(express.json())


app.get('/user_2', async (request, response) => {
    console.log(request.query.key)

    if (request.query.key===process.env.api_key) 
    {
        console.log(request.query)
        if (!request.query.Emailaddress) {
            response.send({
                error: 'Error : provide Emailaddress'
            })
        }

        const user_email_1 = request.query.Emailaddress
        verifier.verify(user_email_1, function (err, info) {
            if (err) {
                // response.send(err)
                response.send({error:'email is not valid'})

            } else {

                //   console.log("Success (T/F): " + info.success );
                //   console.log("Info: " + info.info );
                console.log(info)
                if (info.success) {
                    var transporter = nodemailer.createTransport({
                        // service: 'gmail',
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,
                        requireTLS: true,
                        auth: {
                            user: process.env.user_email,
                            pass: process.env.user_password
                        }
                    });
                    var mailOptions = {
                        from: 'amityv0113@gmail.com', // sender address
                        to: user_email_1, // list of receivers
                        subject: "Hello ", // Subject line
                        text: "Hello world comming from amit Yadav", 
                        html: "<h2>Welcome to leads Magnet </h2>", // html body
                    };


                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            response.send({
                                error:'mail not send'
                            })
                        } else {
                            console.log('Email sent: ' + info);
                            response.send({answer:info})
                        }
                    })


                }
            }
        });
    }

})




app.get('*', (request, response) => {
    response.send('404 Page')
})


app.listen(3000, () => {
    console.log('server is up running on port ' + port)
})