import { useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UserSvc from "../../services/userService";
import { toast } from "react-toastify";
import axios from "axios";



const RegisterForm = () => {
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const {register, formState: {errors}, handleSubmit} = useFormContext();

const registerHandler = async (data: FieldValues)=>{
  try {
    setLoading(true);
      const formData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      }

    const response = await UserSvc.register(formData);

    navigate('/login')
    toast.success(response?.data.message);

  } catch (error) {
    if(axios.isAxiosError(error)) {
      if(error.response){
         const errors =  error.response.data.message;
        errors?.map((item: string)=>{
            toast.error(item);
        })
        
      }
  }
  }
  finally{
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-96" onSubmit={handleSubmit(registerHandler)}>
        <h1 className="text-center text-xl text-blue-900 font-semibold my-2">Register account!</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            placeholder="First Name"
            {...register("firstName")}
          />
          {errors.firstName && <p className="text-red-700">{errors?.firstName.message as string}</p>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="text"
            placeholder="Last Name"
            {...register('lastName')}
          />
          {errors.lastName && <p className="text-red-700">{errors?.lastName.message as string}</p>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            {...register('email')}
          />
          {errors.email && <p className="text-red-700">{errors?.email.message as string}</p>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          {errors.password && <p className="text-red-700">{errors?.password.message as string}</p>}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <p className="text-red-700">{errors?.confirmPassword.message as string}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "submit"}
          </button>
        </div>
        <p>Already have a account? <Link to={"/login"} style={{color: "blue"}}>login here</Link></p>
      </form>
    </div>
  );
};

export default RegisterForm;
