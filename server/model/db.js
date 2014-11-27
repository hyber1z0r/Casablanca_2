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
    booking : Number
});

/* RoomSchema */
var RoomSchema = new mongoose.Schema({
    _id : Number,
    roomSize : Number
});

/* BookingSchema */
var BookingSchema = new mongoose.Schema({
    _id : {type: Number, unique: true},
    startDate : Date,
    endDate : Date,
    roomId : Number,
    regDate : Date
});

/* CounterSchema */
var Settings = new Schema({
    nextSeqNumber: { type: Number, default: 1000 }
});

BookingSchema.pre('save', function (next) {
    var doc = this;
    // You have to know the settings_id, for me, I store it in memory: app.current.settings.id
    Settings.findByIdAndUpdate( settings_id, { $inc: { nextSeqNumber: 1 } }, function (err, settings) {
        if (err) next(err);
        doc._id = settings.nextSeqNumber - 1; // substract 1 because I need the 'current' sequence number, not the next
        next();
    });
});

mongoose.model('Guest', GuestSchema, "guests");
mongoose.model('Room', RoomSchema, "rooms");
mongoose.model('Booking', BookingSchema, "bookings");

