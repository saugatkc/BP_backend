const Hotel = require('../.././models/hotels');
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

describe('Hotel Schema Test', () => {
    it('should be able to add new Hotel', async () => {
        let hotel = await Hotel.create({ 'owner': "Saugat kc" ,"hotelname":"paradise", "username":"jibs123", "password":"jibs123"});
        expect(hotel.owner).toMatch("Saugat kc");
    })

    it('should be able to update Hotel', async () => {
        let hotel = await Hotel.findOne({
            'owner': 'Saugat kc'
        });
        hotel.owner = 'Saugat thapa';

        let newHotel = await hotel.save();
        expect(newHotel.owner).toBe('Saugat thapa');
    })

    it("should delete the Hotel", async () => {
        let hotel = await Hotel.findOneAndDelete({
            'owner': 'Saugat thapa'
        });
        expect(hotel.owner).toMatch('Saugat thapa');
    })
})