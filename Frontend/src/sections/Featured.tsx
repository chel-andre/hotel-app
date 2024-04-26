import { useEffect, useState } from "react";
import HotelCard from "../components/HotelCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { hotelDataType } from "../utils/globalTypes";
import HotelSvc from "../services/hotelService";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/loader/Loader";

const Featured = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<hotelDataType[]>([]);
  const dataFetcher = async () => {
    try {
      setLoading(true);
      const response = await HotelSvc.getFeaturedHotels();
      setData(response?.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error?.response.data.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dataFetcher();
  }, []);
  return (
    <div className="my-28 mx-auto w-[95%]" id="featured">
      <h1 className="text-center text-5xl font-extrabold text-blue-900">
        Featured Hotels
      </h1>
      <div className="relative p-10">
        {loading ? (
          <div className="flex justify-center items-center h-[20vh]">
            <Loader />
          </div>
        ) : !data.length ? (
          <div>
            <h1 className="text-center text-5xl font-extrabold text-red-900">
              No featured hotels found
            </h1>
          </div>
        ) : (
          <>
            <Carousel responsive={responsive} className="p-8">
              {data?.map((item: hotelDataType, index)=>{
                return <HotelCard hotelData={item} key={index}/>
              })}
              
           
            </Carousel>
          </>
        )}
      </div>
    </div>
  );
};

export default Featured;
