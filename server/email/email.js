/**
 * Created by Filipovic on 01-12-2014.
 */
var nodemailer = require('nodemailer');
var jade = require('jade');

var bookingTest = {bookingId: '20' ,startDate: '2015-01-10', endDate: '2015-01-29', roomId: '45'};
var guestTest = [{firstName: 'Vuk', lastName: 'Rajovic', address: 'Frederiksvej 11B', country: 'Montenegro',
    email: 'MessiKrkic@gmail.com', phone: '27620623' , dateOfBirth: '1993-06-23'}, {firstName: 'Vuk', lastName: 'Rajovic', address: 'Frederiksvej 11B', country: 'Montenegro',
    email: 'MessiKrkic@gmail.com', phone: '27620623' , dateOfBirth: '1993-06-23'}];


function sentMail(booking, guests) {

    var details = {
        booking:booking,
        guests:guests


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



    var html = jade.renderFile('emaildetail.jade', details)

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


}

sentMail(bookingTest, guestTest)
