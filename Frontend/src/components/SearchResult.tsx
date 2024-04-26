import { AddLocation } from "@mui/icons-material";
import { hotelDataType } from "../utils/globalTypes";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import {motion} from "framer-motion"

interface propType {
  hotelData: hotelDataType;
}

const SearchResult = ({ hotelData }: propType) => {
  const {
    _id,
    name,
    description,
    city,
    country,
    pricePerNight,
    adultCount,
    childCount,
    type,
    starRating,
    facilities,
    imageUrl,
  } = hotelData;

  return (
    <motion.div initial={{top: -100}} animate={{top: 0}} transition={{duration: 2, type: "tween"}}  className="w-full border-2 rounded-xl p-4 h-auto flex flex-col lg:flex-row gap-5">
      <div className="w-[100%] lg:w-[25%]">
        <Link to={"/hotel/" + _id}>
          <img
            src={imageUrl[2]}
            alt=""
            className="w-[100%] h-[200px] md:h-[350px] lg:h-[200px] rounded-xl cursor-pointer"
          />
        </Link>
      </div>

      {/* --------------------------center-part------------------------- */}
      <div className=" w-[100%] lg:w-[40%] gap-2 flex flex-col">
        <h1 className="text-blue-700 font-bold text-xl">{name}</h1>
        <p className="text-sm text-gray-600">{description}</p>
        {/* facilties */}
        <div className="flex flex-wrap my-1 gap-2">
          {facilities?.map((item, index) => {
            return (
              <p key={index} className="p-[5px] text-sm bg-slate-300">
                {item}
              </p>
            );
          })}
        </div>
        <div className="flex gap-1">
          {" "}
          <h4 className="text-red-900">Rating: </h4>
          <StarRating rating={starRating} />
        </div>
      </div>

      {/*--------------------------- Right-part--------------------------- */}
      <div className=" w-[100%] lg:w-[30%] flex flex-col items-start lg:items-end gap-3">
        <div className="flex gap-1 items-end">
          <AddLocation />{" "}
          <p>
            {city},{country}
          </p>
        </div>
        <p className="text-sm text-gray-500">Type: {type}</p>

        {/* <h4 className="text-red-900">Rating: <span> <StarRating rating={starRating} /></span></h4> */}
        <p className="text-gray-400 text-md">
          {adultCount} adults, {childCount} children
        </p>
        <p className="font-semibold">
          Price:{" "}
          <span className="text-red-900">${pricePerNight} per night</span>
        </p>
        <Link
          to={`/booking/create?hotelId=${_id}&pricePerNight=${pricePerNight}&childCount=${childCount}&adultCount=${adultCount}`}
        >
          <button className="p-2 bg-blue-900 w-[100%] text-white font-bold hover:scale-105 duration-200">
            Book Now
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default SearchResult;
