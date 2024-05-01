
import { yupResolver } from "@hookform/resolvers/yup";
import { isAxiosError } from "axios";
import DatePicker from "react-datepicker";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import BookingSvc, { BookingData } from "../services/bookingService";

interface propType{
  hotelId: string;
  pricePerNight: number;
  childCount: number;
  adultCount: number;
}
interface DateLike {
  getTime(): number;
}
const BookingForm = ({pricePerNight, hotelId, childCount, adultCount}: propType) => {
  const navigate = useNavigate();
  const registerSchema = yup.object({
    checkInDate: yup.date().required("Check in date is required"),
    checkOutDate: yup.date().required("Check out date is required"),
    childCount: yup.number().default(0).required("Number of child is required").min(0).max(childCount, "child count cannot ber more than "+childCount),
    adultCount: yup.number().default(1).required("Number of adult is required").min(1, "Number of adult cannot be less than 1").max(adultCount, `adult count cannot be more than ${adultCount}`),
  });
  
  const { control, register, formState: {errors}, handleSubmit } = useForm({
    resolver: yupResolver(registerSchema)
  });
  const bookingHandler = async(data: FieldValues)=>{
    try {
      if(hotelId && pricePerNight ){
        const numberOfDays = calculateDaysDifference(data.checkOutDate, data.checkInDate);
        const totalPrice = numberOfDays * pricePerNight;
        const newData: BookingData = {
          childCount: data.childCount,
          adultCount: data.adultCount,
          checkInDate: data.checkInDate,
          checkOutDate: data.checkOutDate,
          hotelId: hotelId,
          pricePerNight: pricePerNight,
          totalPrice: totalPrice
        }
        const response = await BookingSvc.createBooking(newData);
        toast.success(response?.data.message);
        navigate("/");
        


      }
      else{
        toast.error("Cannot proced booking")
        return <Navigate to={"/"}/>
      }
      
    } catch (error) {
      if(isAxiosError(error)){
        if(error.response?.data.message){
          toast.error(error.response?.data.message)
        }
      }
    }
  }



  function calculateDaysDifference(date1: DateLike, date2: DateLike): number {
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
    const diffMs = Math.abs(date1.getTime() - date2.getTime()); // Get time difference in milliseconds
    const days = Math.floor(diffMs / oneDay);
    return days;
  }
  return (
    <div className="container mx-auto mt-8 p-8 border rounded shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Book Your Stay</h2>
      <form onSubmit={handleSubmit(bookingHandler)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="checkInDate"
              className="block text-sm font-medium text-gray-700"
            >
              Check-In Date
            </label>

            <Controller
              control={control}
              name="checkInDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholderText="Check in Date"
                  onChange={onChange} // send value to hook form
                  onBlur={onBlur} // notify when input is touched/blur
                  selected={value}

                />
              )}
            />
          {errors.checkInDate && <span className="text-red-700">{errors?.checkInDate.message}</span>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="checkOutDate"
              className="block text-sm font-medium text-gray-700"
            >
              Check-Out Date
            </label>
            <Controller
              control={control}
              name="checkOutDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholderText="Check out Date"
                  onChange={onChange} // send value to hook form
                  onBlur={onBlur} // notify when input is touched/blur
                  selected={value}
                />
              )}
            />
            {errors.checkOutDate && <span className="text-red-700">{errors?.checkOutDate.message}</span>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="adultCount"
              className="block text-sm font-medium text-gray-700"
            >
              Adults
            </label>
            <input
              type="number"
              id="adultCount"
              min="1"
              {...register("adultCount")}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.adultCount && <span id="errorAdult" className="text-red-700">{errors?.adultCount.message}</span>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="childCount"
              className="block text-sm font-medium text-gray-700"
            >
              Children
            </label>
            <input
              type="number"
              id="childCount"
              min="0"
              {...register("childCount")}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.childCount && <span id="errorChild" className="text-red-700">{errors?.childCount.message}</span>}
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300" id="Book-Now"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
