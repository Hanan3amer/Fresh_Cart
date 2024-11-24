import React, { useContext, useState } from 'react'
import Check from '../../assets/checkout.png'
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Cartcontext } from '../../Context/Cartcontext';
export default function Checkout() {
    let { checkout , cart } = useContext(Cartcontext)
    let Schema = Yup.object().shape({
        details: Yup.string(),
        phone: Yup.string(),
        city: Yup.string(),
    })
    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        validationSchema: Schema,
        onSubmit: () => HandelCheckout(cart.cartId, 'https://hanan3amer.github.io/Fresh_Cart/#')
    })
    async function HandelCheckout(cartId, url) {
        let {data} = await checkout(cartId, url, formik.values)
        console.log(data);
        if (data.status === 'success') {
            window.location.href = data.session.url
        }
    }
    return (
        <>
            <div className="row flex md:flex-row flex-col justify-center items-center">
                <div className="md:w-1/2 mb-4 md:mb-0">
                    <img src={Check} alt='Login' className="w-3/4 mx-auto" />
                </div>
                <div className="md:w-1/2">
                    <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
                        {formik.errors.details && formik.touched.details ?
                            <div className=" text-center py-3  m-2 text-sm text-gray-100 rounded-md bg-red-50 dark:bg-red-100 dark:text-red-500" role="alert">
                                <span className="font-medium ">{formik.errors.details}</span>
                            </div> : null}
                        {formik.errors.phone && formik.touched.phone ?
                            <div className=" text-center py-3  m-2 text-sm text-gray-100 rounded-md bg-red-50 dark:bg-red-100 dark:text-red-500" role="alert">
                                <span className="font-medium ">{formik.errors.phone}</span>
                            </div> : null}
                        {formik.errors.city && formik.touched.city ?
                            <div className=" text-center py-3  m-2 text-sm text-gray-100 rounded-md bg-red-50 dark:bg-red-100 dark:text-red-500" role="alert">
                                <span className="font-medium ">{formik.errors.city}</span>
                            </div> : null}



                        <div className="relative py-5">
                            <input
                                type='text'
                                name='details'
                                value={formik.values.details}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                id="details"
                                className="block px-2 pb-2 pt-4 w-full text-sm text-black bg-transparent rounded-lg border border-gray-500 dark:text-black dark:border-green-500 focus:border-green-500 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="details"
                                className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform  scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-6 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                            >
                                details
                            </label>
                        </div>

                        <div className="relative py-5">
                            <input
                                type='text'
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
                                className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform  scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-6 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                            >
                                phone
                            </label>
                        </div>
                        <div className="relative py-5">
                            <input
                                type='text'
                                name='city'
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                id="city"
                                className="block px-2 pb-2 pt-4 w-full text-sm text-black bg-transparent rounded-lg border border-gray-500 dark:text-black dark:border-green-500 focus:border-green-500 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="city"
                                className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform  scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-6 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                            >
                                City
                            </label>
                        </div>


                        <button type="submit" className='bg-green-500 my-3 py-2 px-3 border border-green-800 text-white rounded-lg hover:bg-green-600'><i className="fa-solid fa-wallet px-1"></i>
                            Pay For Order
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}