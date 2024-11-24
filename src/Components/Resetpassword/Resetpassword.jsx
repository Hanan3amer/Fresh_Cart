import React, { useState } from 'react'
import resetpass from '../../assets/resetpass.svg'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Resetpassword() {
    let Navigate = useNavigate()
    let [ApiError, setApiError] = useState('')
    let [loading, setLoading] = useState(false)
    function HandelRegister(formValues) {
        setLoading(true)
        let { data } = axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, formValues)
            .then((ApiReasponse) => {
                if (ApiReasponse?.data?.token) {
                    Navigate('/login')
                    setLoading(false)
                }
            })
            .catch((ApiReasponse) => {
                setLoading(false)
                setApiError(ApiReasponse?.response?.data?.token);
            })
    }
    let Schema = Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is Required'),
        newPassword: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character').required('newPassword is Required'),

    })

    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword: ''
        },
        validationSchema: Schema,
        onSubmit: HandelRegister
    })

    return (
        <>
            <div className="row flex md:flex-row flex-col justify-center items-center">
                <div className="md:w-1/2 mb-4 md:mb-0">
                    <img src={resetpass} alt='Login' className="w-3/4 mx-auto" />
                </div>
                <div className="md:w-1/2">
                    <h1 className='text-gray-700 font-extrabold text-2xl md:px-36'>Enter New password</h1>

                    {ApiError ? <div className="py-3 m-2 text-sm text-gray-100 rounded-md bg-red-50 dark:bg-red-100 dark:text-red-500" role="alert">
                        <span className="font-medium ">{ApiError}</span>
                    </div> : null}
                    <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
                        {formik.errors.email && formik.touched.email ?
                            <div className="py-3  m-2 text-sm text-gray-100 rounded-md bg-red-50 dark:bg-red-100 dark:text-red-500" role="alert">
                                <span className="font-medium ">{formik.errors.email}</span>
                            </div> : null}
                        {formik.errors.newPassword && formik.touched.newPassword ?
                            <div className="py-3  m-2 text-sm text-gray-100 rounded-md bg-red-50 dark:bg-red-100 dark:text-red-500" role="alert">
                                <span className="font-medium ">{formik.errors.newPassword}</span>
                            </div> : null}



                        <div className="relative py-5">
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
                                className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform  scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-6 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                            >
                                Email
                            </label>
                        </div>

                        <div className="relative py-5">
                            <input
                                type='password'
                                name='newPassword'
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                id="newPassword"
                                className="block px-2 pb-2 pt-4 w-full text-sm text-black bg-transparent rounded-lg border border-gray-500 dark:text-black dark:border-green-500 focus:border-green-500 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="newPassword"
                                className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform  scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-6 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                            >
                                newPassword
                            </label>
                        </div>


                        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ">
                            {loading ? <i className='fas fa-spinner fa-spin'></i> : 'Submit'}

                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
