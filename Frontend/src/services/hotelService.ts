import { SearchQuery } from "../pages/SearchPage";
import HttpRequest from "./request";

interface DataType {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  isFeatured: boolean;
  starRating: number;
  imgUrl: string[];
}

class HotelService extends HttpRequest {
  getFeaturedHotels = async () => {
    try {
      const response = await this.getRequest("/api/v1/hotel/featured");
      return response;
    } catch (error) {
      throw error;
    }
  }

  getAllHotels = async () => {
    try {
      const response = await this.getRequest("/api/v1/hotel");
      return response;
    } catch (err) {
      throw err;
    }
  };

  getSingleHotel = async (id: string) => {
    try {
      const response = await this.getRequest("/api/v1/hotel/" + id);
      return response;
    } catch (err) {
      throw err;
    }
  };

  createHotel = async (data: DataType) => {
    try {
      const response = await this.postRequest("/api/v1/hotel", data, true);
      return response;
    } catch (err) {
      return err;
    }
  };

  updateHotel = async (id: string, data: DataType) => {
    try {
      const response = await this.putRequest("/api/v1/hotel/" + id, data, true);
      return response;
    } catch (err) {
      return err;
    }
  };

  searchHotel = async (data: SearchQuery) => {
    try {
      const url = `/api/v1/hotel/search?destination=${data.destination}&childCount=${data.childCount}&adultCount=${data.adultCount}&checkInDate=${data.checkInDate}&checkOutDate=${data.checkOutDate}&sortOptions=${data.sortOptions}`;
      const response = await this.getRequest(url);
      return response;
    } catch (err) {
      throw err;
    }
  };
}

const HotelSvc = new HotelService();

export default HotelSvc;
