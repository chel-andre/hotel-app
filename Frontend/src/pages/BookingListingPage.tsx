import { useEffect, useState } from "react";
import HotelBookingCard from "../components/HotelBookingCard";
import BookingSvc from "../services/bookingService";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { hotelDataType } from "../utils/globalTypes";
import Loader from "../components/loader/Loader";

export interface bookingDataType {
  _id: string;
  hotelId: hotelDataType;
  userId: string;
  childCount: number;
  adultCount: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
}

const BookingListingPage = () => {
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState<bookingDataType[]>();
  const getBookings = async () => {
    try {
      setLoading(true);
      const response = await BookingSvc.getMyBookings();
      setBookingData(response?.data.data);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error?.response) {
          toast.error(error?.response.data.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBookings();
  }, []);
  return (
    <div className="flex flex-col  my-10">
      <h1 className="text-center text-3xl text-blue-900 font-bold my-5">
        My Bookings
      </h1>
      {loading ? (
        <div className="h-[50vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        !bookingData?.length ? <div className="h-[50vh] flex justify-center items-center"><h1 className="text-3xl font-bold text-red-800">No booking found</h1></div> : (
          <>
        
          <div className="flex flex-wrap gap-8 justify-center items-center">
            {bookingData?.map((data: bookingDataType, index) => {
              return <HotelBookingCard bookData={data} key={index} />;
            })}
          </div>
          </>
        )
      )}
    </div>
  );
};

export default BookingListingPage;
