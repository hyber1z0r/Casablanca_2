/**
 * Created by Filipovic on 01-12-2014.
 */
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'casablancaschoolproject@gmail.com',
        pass: 'test9999'
    }
});
// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Casablanca Hotel Resort <casablancaschoolproject@gmail.com>', // sender address
    to: 'damii93@hotmail.com', // list of receivers
    subject: 'Confirmation email on your booking at Casablanca Hotel', // Subject line
    html: {path: 'details.html'} // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});