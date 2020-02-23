const Booking = require('../.././models/bookings');
const mongoose = require('mongoose');
const DbTest = 'mongodb://localhost:27017/testdbmg';

beforeAll(async () => {
    await mongoose.connect(DbTest, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
})

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
})

describe('Booking Schema Test', () => {
    it('should be able to add new Booking', async () => {
        let booking = await Booking.create({ "checkin": "feb 20 2020" ,"checkout": "feb 28 2020"});
        expect(booking.status).toMatch("booked");
    })

    it('should be able to update Booking', async () => {
        let booking = await Booking.findOne({
            'status': 'booked'
        });
        booking.status = 'checkedin';

        let newBooking = await booking.save();
        expect(newBooking.status).toBe('checkedin');
    })

    it("should delete the Booking", async () => {
        let booking = await Booking.findOneAndDelete({
            'status': 'checkedin'
        });
        expect(booking.status).toMatch('checkedin');
    })
})