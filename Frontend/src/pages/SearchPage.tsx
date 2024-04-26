import { useSelector } from "react-redux";
import SearchResult from "../components/SearchResult";
import SearchBar from "../sections/SearchBar";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import HotelSvc from "../services/hotelService";
import { hotelDataType } from "../utils/globalTypes";
import axios from "axios";

import Loader from "../components/loader/Loader";

export interface SearchQuery {
  destination: string;
  childCount: number | null;
  adultCount: number | null;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  sortOptions?: string;
}

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<hotelDataType[]>([]);
  const searchQuery: SearchQuery = useSelector((state: RootState) => {
    return state.search.searchQuery;
  });
  const handleSearch = async (data: SearchQuery) => {
    try {
      setLoading(true);
      const response = await HotelSvc.searchHotel(data);
      setData(response?.data.data);
      console.log(response?.data.data);
    } catch (error) {
      setData([]);
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // toast.error(error?.response.data.message);
          return error;
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   if(searchQuery.destination && searchQuery.adultCount && searchQuery.childCount && searchQuery.checkInDate && searchQuery.checkOutDate){
    handleSearch(searchQuery);
   }
 
  }, [searchQuery]);

  return (
    <div className="my-10 w-[98%] mx-auto h-auto flex flex-col">
      <SearchBar />
      <div className="my-10 flex items-center flex-col">
       {!searchQuery.destination?  <div className="h-[30vh]"><h1 className="text-4xl font-bold text-blue-900 text-center">Search For Hotels here</h1></div>   : loading ? <div className="flex justify-center items-center"><Loader/></div> : (
        !data.length ? <div className="h-[30vh]">
          <h1 className="text-4xl font-bold text-blue-900 text-center">
          No results found for: <span className="text-red-900">{searchQuery.destination}</span>
        </h1>
        </div> : (
          <>
             <h1 className="text-4xl font-bold text-blue-900 text-center">
          Results for: <span className="text-red-900">{searchQuery.destination}</span>
        </h1>
        <div className="w-[85%] lg:w-[80%] my-5 p-3">
          <select className="form-select appearance-none  bg-gray-100 border rounded-lg w-32 block p-1 text-base font-medium text-center text-gray-700 shadow-sm hover:focus:ring-2 hover:focus:ring-indigo-500 focus:outline-none focus:ring-opacity-5 disabled:cursor-not-allowed" onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{
            // searchQuery.sortOptions = e.target.value;
            let search = {
              ...searchQuery,
              sortOptions: e.target.value
            }
            console.log(search);
            handleSearch(search)
          }}>
            <option value="">sort by</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Price Ascending</option>
            <option value="pricePerNightDesc">Price Descending</option>
          </select>
          <div className="my-4 flex flex-col gap-8">
            {
              data?.map((item: hotelDataType, index: number)=>{
                return(
                  <SearchResult hotelData={item} key={index}/>
                )
              })
            }
          
          </div>
        </div>
          </>
        )
       )}
      </div>
    </div>
  );
};

export default SearchPage;
