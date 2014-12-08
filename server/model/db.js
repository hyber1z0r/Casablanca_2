var mongoose = require('mongoose');

var dbURI;

//This is set by the backend tests
if (typeof global.TEST_DATABASE != 'undefined') {
    dbURI = global.TEST_DATABASE;
}
else {
    dbURI = 'mongodb://localhost/casablanca';
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    global.mongo_error = "Not Connected to the Database";
    console.error('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});


/* GuestSchema */
var GuestSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    address: String,
    country: String,
    phone: String,
    email: String,
    dateOfBirth: Date,
    booking: mongoose.Schema.Types.ObjectId
});
mongoose.model('Guest', GuestSchema, "guests");


/* RoomSchema */
var RoomSchema = new mongoose.Schema({
    _id: Number,
    roomSize: Number
});

mongoose.model('Room', RoomSchema, "rooms");


/* BookingSchema */
var BookingSchema = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    room: {type: Number, ref: 'Room'},
    regDate: Date
});

mongoose.model('Booking', BookingSchema, "bookings");


/* FacilitySchema */
var FacilitySchema = new mongoose.Schema({
    name: String,
    courts: Number,
    players: Number
});

mongoose.model('Facility', FacilitySchema, "facility");


/* FacilityBookingSchema */
var FacilityBookingSchema = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    fID: mongoose.Schema.Types.ObjectId,
    regDate: Date
});
mongoose.model('FacilityBooking', FacilityBookingSchema, "facilitybooking");


/* FacilityBookingDetailsSchema*/
var FacilityBookingDetailsSchema = new mongoose.Schema({
    guest: mongoose.Schema.Types.ObjectId,
    fID: mongoose.Schema.Types.ObjectId

});

mongoose.model('FacilityBookingDetails', FacilityBookingDetailsSchema, "facilitybookingdetails");


GuestSchema.pre('remove', function (next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    console.log('The booking ID to be removed, according to pre.remove\n');
    console.log(this.booking);
    mongoose.model('Booking').remove({_id: this.booking}, function (err) {
        if (err) {
            next(err);
        }
    });
    next();
});




