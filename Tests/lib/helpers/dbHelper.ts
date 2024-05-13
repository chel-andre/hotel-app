import mongoose from 'mongoose';
import { connectToDb, disconnectFromDb } from '../dbConnection';

const userSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    userType: String,
});
const UserModel = mongoose.model('User', userSchema);

const bookingSchema = new mongoose.Schema({
    hotelId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    childCount: Number,
    adultCount: Number,
    checkInDate: Date,
    checkOutDate: Date,
    pricePerNight: Number,
    totalPrice: Number,
});
const BookingModel = mongoose.model('Booking', bookingSchema);

export async function deleteUserByEmail(email: string) {
    try {
        await connectToDb();
        const result = await UserModel.deleteOne({ email });

        if (result.deletedCount === 1) {
            console.log('User deleted successfully');
        } else {
            console.log('User not found');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    } finally {

        await disconnectFromDb();
    }
}

export async function deleteAllBookingsForUserByEmail(email: string) {
    try {
        await connectToDb();
        const user = await UserModel.findOne({ email });

        if (!user) {
            console.log('User not found');

            return;
        }

        const result = await BookingModel.deleteMany({ userId: user._id });
        console.log(`${result.deletedCount} bookings deleted for user with email ${email}`);
    } catch (error) {
        console.error('Error deleting bookings:', error);
    } finally {
        await disconnectFromDb();
    }
}
