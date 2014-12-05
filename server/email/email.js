/**
 * Created by Filipovic on 01-12-2014.
 */
var nodemailer = require('nodemailer');
var jade = require('jade');

function sentMail(booking, guests, usernpw) {


    var details = {
        booking:booking,
        guests:guests,
        usernpw: usernpw


    }

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'casablancaschoolproject@gmail.com',
            pass: 'test9999'
        }
    });
// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails



    var html = jade.renderFile('../server/email/emaildetail.jade', details)

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Casablanca Hotel Resort <casablancaschoolproject@gmail.com>', // sender address
        to: guests[0].email, // list of receivers
        subject: 'Confirmation email on your booking at Casablanca Hotel', // Subject line
        html: html // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });


};

module.exports.sentMail = sentMail;
