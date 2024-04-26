
import { FormProvider, useForm } from 'react-hook-form'
import LoginForm from '../components/LoginForm/LoginForm'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'


const LoginPage = () => {
  const LoginSchema = yup.object({
    email: yup.string().email("Please enter valid email address").required("Email address is required"),
    password: yup.string().required("Password is required"),
  })

  
  
  const methods = useForm({
    resolver: yupResolver(LoginSchema)
  });
  return (
    <div className='w-full h-[70vh] flex justify-center items-center'>
      <FormProvider {...methods}>
      <LoginForm/>
      </FormProvider>
    </div>
  )
}

export default LoginPage