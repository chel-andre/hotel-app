import { yupResolver } from "@hookform/resolvers/yup";
import { AddLocation, CalendarMonth, People } from "@mui/icons-material";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import * as yup from "yup";
import { setSearchQuery } from "../redux/searchReducer";
import { useEffect } from "react";
import { RootState } from "../store/store";

const SearchBar = () => {
  const searchSchema = yup.object({
    destination: yup.string().required("please enter destination"),
    childCount: yup
      .number()
      .required("please select child count")
      .min(0, "Child count cannot be less than 0"),
    adultCount: yup
      .number()
      .required("please select child count")
      .min(1, "Adult count cannot be less than 1"),
    checkInDate: yup.date().required("Please select check in date"),
    checkOutDate: yup.date().required("Please select check out date"),
  });
  const { register, reset, control, handleSubmit } = useForm({
    resolver: yupResolver(searchSchema),
  });

  const searchQuery = useSelector((state: RootState) => {
    return state.search.searchQuery;
  });

  // const location = useLocation();
  const navigate = useNavigate();
  const dispach = useDispatch();

  const searchHandler = async (data: FieldValues) => {
    dispach(setSearchQuery(data));
    navigate('/search')
    // if (location.pathname !== "search") {
    //   navigate("/search");
    // }
  };
  useEffect(() => {
    if (searchQuery) {
      reset(searchQuery as any);
    }
  }, []);

  return (
    <div className="main-container w-[90%] mx-auto bg-blue-700 p-7 rounded-2xl ">
      <form onSubmit={handleSubmit(searchHandler)}>
        <div className="grid grid-cols-1 w-[100%] md:grid-cols-2 lg:grid-cols-5 gap-4 bg-orange-500 p-4 rounded-2xl items-center justify-center">
          <div className="flex flex-col gap-1 items-center">
            <label htmlFor="destination" className="font-bold">
              Destination <AddLocation />
            </label>
            <input
              type="text"
              className="border-black p-2 w-40  rounded-sm"
              placeholder="Enter Destination"
              {...register("destination")}
            />
          </div>

          <div className="flex flex-col gap-1 items-center">
            <label htmlFor="count" className="font-bold">
              No. Of People <People />
            </label>
            <div className="flex gap-1">
              <input
                type="number"
                className="border-black p-2 w-20 rounded-sm"
                min={0}
                placeholder="child"
                {...register("childCount")}
              />
              <input
                type="number"
                className="border-black p-2 w-20 rounded-sm"
                min={1}
                placeholder="adult"
                {...register("adultCount")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <label htmlFor="checkInDate" className="font-bold">
              Check in Date <CalendarMonth />
            </label>
            <Controller
              control={control}
              name="checkInDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  className="p-2 w-40"
                  placeholderText="Check in Date"
                  onChange={onChange} // send value to hook form
                  onBlur={onBlur} // notify when input is touched/blur
                  selected={value}
                />
              )}
            />

            {/* <DatePicker selected={checkInDate} className="p-2 w-40" placeholderText="CheckInDate"/> */}
          </div>
          <div className="flex flex-col gap-1 items-center">
            <label htmlFor="checkOutDate" className="font-bold">
              Check out Date <CalendarMonth />
            </label>
            <Controller
              control={control}
              name="checkOutDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  className="p-2 w-40"
                  placeholderText="Check out Date"
                  onChange={onChange} // send value to hook form
                  onBlur={onBlur} // notify when input is touched/blur
                  selected={value}
                />
              )}
            />
          </div>

          <button className="p-4 bg-blue-800 h-full text-white hover:bg-blue-600 cursor-pointer duration-100 ease-in-out w-[70%] mx-auto" id="Search">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
