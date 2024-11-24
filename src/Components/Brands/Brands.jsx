import axios from 'axios'
import React from 'react'
import Loading from '../Loading/Loading'
import { useQuery } from '@tanstack/react-query'
export default function Brands() {
  function getBrand() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  let { data, isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrand
  })
  if (isLoading)
    return <Loading></Loading>
  return (
    <div className='row'>
      {data?.data.data.map(brand => <div key={brand?._id} className='sm:w-1/2 lg:w-1/4 mx-auto p-2'>
        <img src={brand?.image} className='mx-auto border border-gray-200 rounded-lg shadow-md' />
        <p className='text-center text-2xl text-gray-700 font-bold py-5'>{brand?.name}</p>
      </div>)}
    </div>
  )
}