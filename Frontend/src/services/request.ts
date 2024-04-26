import { AxiosHeaders } from "axios";
import axiosInstance from "./axios"

interface headersType{
    Authorization?: string;
    'Content-Type'?: string;
    
}


class HttpRequest{
     getRequest = async(url: string)=>{
        const token = localStorage.getItem("AccessToken");
        const headers: headersType = {};
        if(token){
            headers["Authorization"] = "Bearer " + token;
        }
       try{
        const response = await axiosInstance.get(url, {headers: headers as AxiosHeaders});
        return response;
       } catch(err){
        throw err;
       }

    }

    postRequest = async(url: string, data: any, file: boolean)=>{
        const token = localStorage.getItem("AccessToken");
        var headers: headersType = {};
        if(token){
            headers["Authorization"] = "Bearer " + token;
        }
        if(file){
            headers = { 'Content-Type': 'multipart/form-data'};
        }
        try{
            const response = await axiosInstance.post(url, data, {headers: headers as AxiosHeaders, withCredentials: true});
            return response;
        }catch(err){
            throw err;
        }
    }

    putRequest = async(url: string, data: any, file: boolean)=>{
        const token = localStorage.getItem("AccessToken");
        var headers: headersType = {};
        if(token){
            headers["Authorization"] = "Bearer " + token;
        }
        if(file){
            headers = { 'Content-Type': 'multipart/form-data'};
        }
        try{
            const response = await axiosInstance.put(url, data, {headers: headers as AxiosHeaders, withCredentials: true});
            return response;
        }catch(err){
            throw err;
        }
    }

    deleteRequest = async(url: string)=>{
        const token = localStorage.getItem("AccessToken");
        var headers: headersType = {};
        if(token){
            headers["Authorization"] = "Bearer " + token;
        }
    
        try{
            const response = await axiosInstance.delete(url, {headers: headers as AxiosHeaders});
            return response
        }
        catch(err) {
            throw err;
        }
    }
}

export default HttpRequest;