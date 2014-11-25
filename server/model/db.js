var mongoose = require('mongoose');

var dbURI;

//This is set by the backend tests
if (typeof global.TEST_DATABASE != 'undefined') {
    dbURI = global.TEST_DATABASE;
}
else {
    dbURI = 'mongodb://localhost/testdb';
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


/** User SCHEMA **/
/** Replace this Schema with your own(s) **/
var GuestSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    address : String,
    country : String,
    phone : String,
    email: String,
    dateOfBirth : Date,
    booking : Number
});

var RoomSchema = new mongoose.Schema({
    _id : Number,
    roomSize : Number
});

var BookingSchema = new mongoose.Schema({
    _id : Number,
    startDate : Date,
    endDate : Date,
    roomId : Number,
    regDate : Date
});

mongoose.model('Guest', GuestSchema, "guests");
mongoose.model('Room', RoomSchema, "rooms");
mongoose.model('Booking', BookingSchema, "bookings");

