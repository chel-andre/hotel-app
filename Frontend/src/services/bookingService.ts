
import { FieldValues } from "react-hook-form";
import HttpRequest from "./request";

export interface BookingData{
    hotelId: string;
    childCount: number;
    adultCount: number;
    checkInDate: Date;
    checkOutDate: Date;
    pricePerNight: number;
    totalPrice: number;
}

class BookingService extends HttpRequest{
    getSingleBooking = async(id: string)=>{
        try {
            const response = await this.getRequest("/api/v1/booking/"+id);
            return response;
        } catch (error) {
            throw error;
        }
    }
    createBooking = async(data: BookingData)=>{
        try {
            const response = await this.postRequest("/api/v1/booking", data, false);
            return response;
        } catch (error) {
            throw error;
        }
    }

    updateBooking = async(id: string, data: FieldValues)=>{
        try {  
            const response = await this.putRequest("/api/v1/booking/"+ id, data, false);
            return response;
            
        } catch (error) {
            throw error;
        }
    }

    getMyBookings = async()=>{
        try {
            const response = await this.getRequest("/api/v1/booking");
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    deleteBooking = async(id: string) => {
        try {
           const response = await this.deleteRequest("/api/v1/booking/"+id);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

const BookingSvc = new BookingService();
export default BookingSvc;
