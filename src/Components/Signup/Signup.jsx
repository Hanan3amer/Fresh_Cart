import React, { useContext, useState } from 'react'
import signup from '../../assets/signup.svg'
import { useFormik } from 'formik';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../Context/Authcontext';
export default function Signup() {

  let navigate = useNavigate();
  let { SetuserLogin } = useContext(AuthContext)
  let [ApiError, setApiError] = useState('')
  let [loading, setLoading] = useState(false)
  function HandelRegister(formValues) {
    setLoading(true)
    let { data } = axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
      .then((ApiReasponse) => {
        if (ApiReasponse?.data?.message === 'success') {
          localStorage.setItem('userToken', ApiReasponse?.data?.token)
          SetuserLogin(ApiReasponse?.data?.token)
          navigate('/')
          setLoading(false)
        }
      })
      .catch((ApiReasponse) => {
        setLoading(false)
        setApiError(ApiReasponse?.response?.data?.message);
      })
  }

  let Schema = Yup.object().shape({
    name: Yup.string().min(3, 'Name minimum length is 3').max(10, 'Name max length is 10').required('Name is Required'),
    email: Yup.string().email('Email is invalid').required('Email is Required'),
    phone: Yup.string().matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/, 'phone number is incorrect[Egyptian Number]').required('Phone number is Required'),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character').required('Password is Required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'Password Not match Repassword').required('rePassword is required')

  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema: Schema,
    onSubmit: HandelRegister
  })


  return (
    <>

      <div className="row flex md:flex-row flex-col justify-center items-center">


        <div className="md:w-1/2 mb-4 md:mb-0">
          <img src={signup} alt='signup' className="w-3/4 mx-auto" />
        </div>
        <div className="md:w-1/2">
          <h1 className='text-gray-700 font-extrabold text-2xl md:px-36'>Get Start Shopping</h1>
          <p className='text-gray-500 py-2 md:px-36'>Welcome to FreshCart! Enter your email to get started.</p>
          {ApiError ? <div className="py-3 m-2 text-sm text-gray-100 rounded-md bg-red-50 dark:bg-red-100 dark:text-red-500" role="alert">
            <span className="font-medium ">{ApiError}</span>
          </div> : null}
          <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
            {formik.errors.name && formik.touched.name ?
              <div className="py-3 m-2 text-sm text-gray-100 rounded-md bg-red-50 dark:bg-red-100 dark:text-red-500" role="alert">
                <span className="font-medium ">{formik.errors.name}</span>
              </div> : null}
            {formik.errors.email && formik.touched.email ?
              <div className="py-3  m-2 text-sm text-gray-100 rounded-md bg-red-50 dark:bg-red-100 dark:text-red-500" role="alert">
                <span className="font-medium ">{formik.errors.email}</span>
              </div> : null}
            {formik.errors.phone && formik.touched.phone ?
              <div className="py-3  m-2 text-sm text-gray-100 rounded-md bg-red-50 dark:bg-red-100 dark:text-red-500" role="alert">
                <span className="font-medium ">{formik.errors.phone}</span>
              </div> : null}
            {formik.errors.password && formik.touched.password ?
              <div className="py-3  m-2 text-sm text-gray-100 rounded-md bg-red-50 dark:bg-red-100 dark:text-red-500" role="alert">
                <span className="font-medium ">{formik.errors.password}</span>
              </div> : null}
            {formik.errors.rePassword && formik.touched.rePassword ?
              <div className="py-3  m-2 text-sm text-gray-100 rounded-md bg-red-50 dark:bg-red-100 dark:text-red-500" role="alert">
                <span className="font-medium ">{formik.errors.rePassword}</span>
              </div> : null}
            <div className="grid md:grid-cols-2 md:gap-6 py-5">
              <div className="relative py-2">
                <input
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type='text'
                  id='name'
                  className="block px-2 pb-2 pt-4 w-full text-sm text-black bg-transparent rounded-lg border border-gray-500 dark:text-black dark:border-green-500 focus:border-green-500 peer"
                  placeholder=" "
                />
                <label
                  htmlFor='name'
                  className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                  Name
                </label>

              </div>
              <div className="relative py-2">
                <input
                  type='tel'
                  name='phone'
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="phone"
                  className="block px-2 pb-2 pt-4 w-full text-sm text-black bg-transparent rounded-lg border border-gray-500 dark:text-black dark:border-green-500 focus:border-green-500 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="phone"
                  className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Phone
                </label>
              </div>

            </div>

            <div className="relative ">
              <input
                type='email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="email"
                className="block px-2 pb-2 pt-4 w-full text-sm text-black bg-transparent rounded-lg border border-gray-500 dark:text-black dark:border-green-500 focus:border-green-500 peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Email
              </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6 py-5 ">
              <div className="relative py-2">
                <input
                  type='password'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="password"
                  className="block px-2 pb-2 pt-4 w-full text-sm text-black bg-transparent rounded-lg border border-gray-500 dark:text-black dark:border-green-500 focus:border-green-500 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Password
                </label>
              </div>
              <div className="relative py-2">
                <input
                  type='password'
                  name='rePassword'
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="rePassword"
                  className="block px-2 pb-2 pt-4 w-full text-sm text-black bg-transparent rounded-lg border border-gray-500 dark:text-black dark:border-green-500 focus:border-green-500 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="rePassword"
                  className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Repassword
                </label>
              </div>
            </div>
            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ">
              {loading ? <i className='fas fa-spinner fa-spin'></i> : 'Register'}

            </button>
            <p className='text-gray-700 py-2'>Already have an account? <NavLink to='/login' className='text-green-500'>Sign in</NavLink></p>

          </form>
        </div>
      </div>

    </>
  )
}