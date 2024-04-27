import { Public } from "@mui/icons-material";
import { hotelDataType } from "../utils/globalTypes";
import { Link } from "react-router-dom";

interface propType {
  hotelData: hotelDataType;
}

const HotelCard = ({hotelData}: propType) => {
  const {_id, name, city, country, facilities, imageUrl, pricePerNight} = hotelData;
let randomDecimal = Math.floor(Math.random() * 3);
  return (
    <div className="hotel-card w-[250px] h-auto bg-gray-100 p-2 rounded-md">
      <img src={imageUrl[randomDecimal]} alt="" className="w-[100%] h-[150px] mb-3" />
      <div>
        <p id="hotel-name" className="text-md text-blue-900 font-semibold text-ellipsis overflow-hidden text-nowrap">{name}</p>{" "}
        
      </div>

      {/* location */}
      <p className="text-gray-400 text-sm p-2" id="location">
        <Public style={{ fontSize: "15px", marginRight: "4px" }} />
        <span className="font-semibold text-xs">Location: </span>{city}, {country}
      </p>

      {/* facilties */}
      <div className="flex flex-wrap my-1 p-1 gap-2">
        {facilities?.map((item: string, index: number)=>{
          return(
            <p className="p-[5px] text-sm bg-slate-300" key={index}>{item}</p>
          )
        })}
        {/* <p className="p-[5px] text-sm bg-slate-300">Free Wifi</p>{" "}
        <p className="p-[5px] text-sm bg-slate-300">Swimming pool</p>{" "}
        <p className="p-[5px] text-sm bg-slate-300">Free Parking</p> */}
      </div>
      <p className="text-red-800 text-md font-bold p-1 my-1" id="price">
          ${pricePerNight} <span className="text-gray-400 text-xs">per night</span>
        </p>
        <Link to={"/hotel/"+_id}>
      <button className="p-1 bg-blue-900 w-full h-8 text-white font-bold hover:text-orange-700" id="Details">Details</button>
      </Link>
    </div>
  );
};

export default HotelCard;
