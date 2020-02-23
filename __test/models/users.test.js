const User = require('../.././models/users');
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

describe('User Schema Test', () => {
    it('should be able to add new user', async () => {
        let user = await User.create({ 'fullname': "saugat kc" , "username":"jibs123", "password":"jibs123"});
        expect(user.fullname).toMatch("saugat kc");
    })

    it('should be able to update user', async () => {
        let user = await User.findOne({
            'fullname': 'saugat kc'
        });
        user.fullname = 'saugat thapa';

        let newUser = await user.save();
        expect(newUser.fullname).toBe('saugat thapa');
    })

    it("should delete the User", async () => {
        let user = await User.findOneAndDelete({
            'fullname': 'saugat thapa'
        });
        expect(user.fullname).toMatch('saugat thapa');
    })
})