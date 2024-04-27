import { AddLocation, People } from "@mui/icons-material";
import ImageSlider from "../components/ImageSlider";
import StarRating from "../components/StarRating";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { hotelDataType } from "../utils/globalTypes";
import HotelSvc from "../services/hotelService";
import Loader from "../components/loader/Loader";

const HotelDescription = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<hotelDataType>();
  const dataFetcher = async (id: string) => {
    try {
      setLoading(true);
      const response = await HotelSvc.getSingleHotel(id);
      setData(response?.data.data);
      
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    dataFetcher(id as string);

  }, []);
  return (
    <>
      {loading ? (
        <div className="h-[90vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-[90%] flex justify-center items-center mx-auto my-10 p-7 flex-col gap-5 bg-gray-100">
            <h1 className="text-5xl text-blue-900 text-center font-bold" id="hotel-name">
              {data?.name}
            </h1>
            <div className="w-[70%] h-auto mx-auto">
              <ImageSlider image={data?.imageUrl as string[]}/>
            </div>

            <div className="w-[90%] border-2 p-8 gap-5 flex flex-col md:flex-row rounded-xl">
              <div className="w-[100%] md:w-[50%] ">
                <h3 className="text-xl font-bold text-blue-900">
                  Description:{" "}
                </h3>
                <p className="text-md mb-3">
                  {data?.description}
                </p>
                <h3 className="text-xl font-bold text-blue-900 my-3">
                  Facilities:{" "}
                </h3>
                <div className="flex gap-3">
                  {data?.facilities?.map((item, index) => {
                    return (
                      <div
                        className="p-2 bg-slate-300 w-40 text-md font-semibold text-blue-1000"
                        key={index}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-[100%] md:w-[50%] flex flex-col gap-4 md:items-end">
                <div id="location">
                  <AddLocation /> {data?.city}, {data?.country}
                </div>
                <div id="people">
                  <People /> {data?.childCount} children, {data?.adultCount} adult
                </div>
                <div className="flex gap-2 font-semibold">
                  Rating: <StarRating rating={data?.starRating as number} />
                </div>
                <div className="text-red-800 font-semibold" id="hotel-price">
                  <span className="font-semibold text-blue-900">Price: </span>
                  ${data?.pricePerNight} per night
                </div>
                <Link to={`/booking/create?hotelId=${data?._id}&pricePerNight=${data?.pricePerNight}&childCount=${data?.childCount}&adultCount=${data?.adultCount}`}>
                <button className="p-3 w-40 bg-blue-900 text-white font-bold hover:scale-105 duration-200" id="Book-Now">
                  Book Now
                </button>

                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HotelDescription;
