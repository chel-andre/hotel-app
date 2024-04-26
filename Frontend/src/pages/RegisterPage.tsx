
import { FormProvider, useForm } from 'react-hook-form'
import RegisterForm from '../components/RegisterForm/RegisterForm'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const RegisterPage = () => {
  const RegisterSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().required("Email is required").email("Please enter a valid email address"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref('password')], 'Passwords must match')
  });
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
  });
  return (
    <div className='w-full h-auto flex justify-center items-center'>
      <FormProvider {...methods}>
        <RegisterForm/>
        </FormProvider>
    </div>
  )
}

export default RegisterPage