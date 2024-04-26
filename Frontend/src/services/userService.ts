import { FieldValues } from "react-hook-form";
import HttpRequest from "./request";



class UserService extends HttpRequest{
    register = async(data: FieldValues)=>{
        try{
            const response = await this.postRequest('/api/v1/auth/register', data, false);
            return response;
        }
        catch(err){
            throw err;
        }
    }

    login = async(data: FieldValues)=>{
        try {
            const response = await this.postRequest("/api/v1/auth/login", data, false);
            return response;
        } catch (error) {
            throw error;
        }   
    }

    getUser = async() => {
        try {
           const response = await this.getRequest("/api/v1/auth/get-user");
           return response; 
        } catch (error) {
            throw error;
        }
    }

    logOut = async()=>{
        try {
            const response = await this.getRequest("/api/v1/auth/logout");
            return response;
        }catch (err){
            throw err;
        }
    }
}

const UserSvc = new UserService();
export default UserSvc;