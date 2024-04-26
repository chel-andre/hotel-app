
import Swal from "sweetalert2";
import { bookingDataType } from "../pages/BookingListingPage";
import BookingSvc from "../services/bookingService";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface propType{
 bookData: bookingDataType;
}

const HotelBookingCard = ({bookData}: propType) => {



  const handleDelete = (id: string)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          const response = await BookingSvc.deleteBooking(id);
          toast.success(response?.data.message)
          window.location.reload();
  
        } catch (error) {
          if(isAxiosError(error)){
            toast.error(error?.response?.data.message)
          }
        }
       
      }
    });
  
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-5">
      <img
        className="w-full h-48 object-cover object-center rounded-t-md"
        src={bookData.hotelId.imageUrl[1]}
        alt={bookData.hotelId.name}
      />
      <div className="px-6 py-4 ">
        <div className="font-bold text-2xl mb-2 text-red-900">
          {bookData?.hotelId.name}
        </div>
        <p className="text-gray-600 text-md mb-2">
          <span className="font-black">Children: </span> {bookData?.childCount}
        </p>
        <p className="text-gray-600 text-md mb-2">
        <span className="font-black">Adults: </span> {bookData?.adultCount}
        </p>
        <p className="text-gray-600 text-md mb-2">
        <span className="font-black">Check-In: </span> {bookData?.checkInDate}
        </p>
        <p className="text-gray-600 text-md mb-2">
        <span className="font-black">Check-Out: </span> {bookData?.checkOutDate}
        </p>
        <p className="text-gray-600 text-md mb-2">
        <span className="font-black">Total Price: </span> ${bookData?.totalPrice}
        </p>
        <div className="flex mt-4 gap-2">
          <Link to={"/booking/update/"+bookData?._id}>
          <button
            className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Update Booking
          </button>
          </Link>
          <button className="bg-red-800 text-white py-2 px-4 rounded hover:bg-red-400 focus:outline-none focus:ring focus:border-red-300" onClick={()=>{
            handleDelete(bookData?._id);
          }}>
            Delete Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelBookingCard;
