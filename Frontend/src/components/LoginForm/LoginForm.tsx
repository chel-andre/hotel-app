import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import {  FieldValues, useFormContext } from "react-hook-form";
import { useState } from "react";
import authSvc from '../../services/userService'
import { toast } from "react-toastify";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userReducer";

interface LoginResponse{
  success: boolean;
  message: string;
  data: {
    AccessToken: string;
    firstName: string;
    lastName: string;
    userType: string;
  }
}


const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const {register, handleSubmit, formState: {errors}} = useFormContext();


  const submitHandler = async(data: FieldValues) => {
    try {
        setLoading(true);
        const response: AxiosResponse<LoginResponse> = await authSvc.login(data);
        console.log(response.data);
        localStorage.setItem("AccessToken", response?.data.data.AccessToken);
        dispatch(setUser(response?.data.data));
        navigate('/')
        toast.success(response.data.message);
    } catch (error) {
        if(axios.isAxiosError(error)) {
            if(error.response){
              toast.error(error.response.data.message)
            }
        }
    }
    finally {
      setLoading(false);
    }
  }


  return (
    <form className="form" onSubmit={handleSubmit(submitHandler)}>
      <p className="form-title">Login in to your account</p>
      <div className="input-container">
        <input placeholder="Enter email" type="email" {...register("email")}/>
        <span>
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </span>
        {errors.email && <p className="text-red-600">{errors?.email.message as string}</p>}
      </div>
      <div className="input-container">
        <input placeholder="Enter password" type="password" {...register("password")}/>

        <span>
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
            <path
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </span>
        {errors.password && <p className="text-red-600">{errors?.password.message as string}</p>}
      </div>
      <button disabled={loading} className="submit bg-blue-800" type="submit" id="Login-form">
        {loading ? "Loading...." : "Login"}
      </button>

      <p className="signup-link" id="Register">
        No account? 
        <Link to={'/register'}> Register</Link>
      </p>
    </form>
  );
};

export default LoginForm;
