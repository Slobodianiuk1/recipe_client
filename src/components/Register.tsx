import {FC} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";


export const schema = yup.object({
  username: yup
    .string()
    .min(2, 'Must be more than 1 character ')
    .required("Please enter the username"),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
}).required("Please fill in all fields");

const Register: FC = () => {
  const {register, handleSubmit, reset, formState: {errors}} = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  type FormData = yup.InferType<typeof schema>;


  const registerUser = async (data: FormData) => {
    console.log(data);
    try {
      await axios.post('http://localhost:4200/auth/register', {...data})
      alert('Registration completed! Naw login.')
    } catch (error) {
      console.error(error)
    }
    reset()
  };


  return (
    <div className='bg-white rounded w-[500px] p-5'>
      <h2>Register</h2>
      <form className="flex flex-col gap-4 justify-center items-center" onSubmit={handleSubmit(registerUser)}>
        <div className="flex flex-col">
          <label htmlFor="username">Username:</label>
          <input type="text" id='username' {...register('username')}/>
          {errors.username && <span>{errors.username.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <input type="password" id='password' {...register('password')}/>
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type='submit' className="px-4 py-1 bg-green-700 rounded w-[150px] text-white">register</button>
      </form>
    </div>
  )
};

export default Register;