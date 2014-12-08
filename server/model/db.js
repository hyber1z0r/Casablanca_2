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
    firstName : String,
    lastName : String,
    address : String,
    country : String,
    phone : String,
    email: String,
    dateOfBirth : Date,
    booking : mongoose.Schema.Types.ObjectId
});

/* RoomSchema */
var RoomSchema = new mongoose.Schema({
    _id : Number,
    roomSize : Number
});

/* BookingSchema */
var BookingSchema = new mongoose.Schema({
    startDate : Date,
    endDate : Date,
    room : Number,
    regDate : Date
});

GuestSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    console.log('The booking ID to be removed, according to pre.remove\n');
    console.log(this.booking);
    mongoose.model('Booking').remove({_id: this.booking}, function (err) {
        if(err) {
            next(err);
        }
    });
    next();
});


mongoose.model('Guest', GuestSchema, "guests");
mongoose.model('Room', RoomSchema, "rooms");
mongoose.model('Booking', BookingSchema, "bookings");

