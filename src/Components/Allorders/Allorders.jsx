import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/Authcontext';
import { jwtDecode } from 'jwt-decode';
export default function Allorders() {
  let [cartitems, setOrder] = useState([]);
  let { userLogin } = useContext(AuthContext) 
  function GetAllorders(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then(({ data }) => {
        console.log(data);
        setOrder(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    if (userLogin) {
        const decodedToken = jwtDecode(userLogin);
        let userId = decodedToken.id; 
        GetAllorders(userId);
      ;
    }
  }, [userLogin]);
  

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg border">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
          <caption className="text-left py-3 text-2xl ms-3 font-bold border-b">
            Your Orders
          </caption>
          <thead>
            <tr className='border-b border-gray-200 text-center'>
              <th className='p-4'>
                Order Number
              </th>
              <th className='p-4'>
                Total Price
              </th>
              <th className='p-4'>
                Payment Method
              </th>
              <th className='p-4'>
                Paid 
              </th>
              <th className='p-4'>
                Delivered 
              </th>
            </tr>
          </thead>
          <tbody>
            {cartitems?.map((product) => (
              <tr
                key={product._id}
                className="bg-white border-b hover:bg-gray-50 text-center"
              >
                <td className="p-4">
                  <p className='text-yellow-600'>
                    # {product.id}
                  </p>
                </td>
                <td className="p-4">
                  <p>
                    <span className='text-green-500'> LE </span>{product.totalOrderPrice}
                  </p>
                </td>
                <td className="p-4">
                  <p>
                    {product.paymentMethodType}
                  </p>
                </td>
                <td className="p-4">
                  {product?.isPaid? <p className='text-yellow-500'>Order Paid</p> : <p className='text-red-500'>Order not paid</p>}
                </td>
                <td className="p-4">
                  {product?.isDelivered ? <p className='text-yellow-500'>Order Delivered</p> : <p className='text-red-500'>Order not Delivered</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
