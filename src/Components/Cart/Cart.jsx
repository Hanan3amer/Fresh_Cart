import React, { useContext, useEffect, useState } from 'react'
import { Cartcontext } from '../../Context/Cartcontext'
import { Link } from 'react-router-dom';
import cartimg from '../../assets/cart.png'
export default function Cart() {
  let { getCartItem, removeCartitem, updatecart, setCart, cart } = useContext(Cartcontext);
  let [cartitems, setCartitems] = useState([]);
  async function getCart() {
    let response = await getCartItem();
    setCartitems(response.data.data.products);
  }

  async function removeItem(productId) {
    let response = await removeCartitem(productId);
    setCartitems(response?.data?.data?.products);
    setCart(response?.data?.data?.products)
  }

  async function UpdateCart(productId, count) {
    let response = await updatecart(productId, count);
    setCartitems(response?.data?.data?.products);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {cart?.numOfCartItems > 0 ? <>
        <div className="relative overflow-x-auto sm:rounded-lg border">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
            <caption className="text-left py-3 text-2xl ms-3 font-bold border-b">
              Shopping Cart
            </caption>
            <tbody>
              {cartitems?.map((product) => (
                <tr key={product._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-1 py-4 font-semibold text-gray-900">
                    {product.product.title}
                  </td>
                  <td className="px-1 py-4">
                    <div className="flex items-center">
                      <button onClick={() => UpdateCart(product?.product?._id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200">
                        <span className="sr-only">Decrease quantity</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span>{product.count}</span>
                      </div>
                      <button onClick={() => UpdateCart(product?.product?._id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200">
                        <span className="sr-only">Increase quantity</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-1 py-4 font-semibold text-gray-900"><span className='text-green-400 font-thin'>LE</span> {product.price}</td>
                  <td className="px-1 py-4">
                    <span
                      onClick={() => removeItem(product?.product?._id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:text-red-300 cursor-pointer"
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to={'/checkout'}>
          <button className='bg-green-500 my-3 py-2 px-3 border border-green-800 text-white rounded-lg hover:bg-green-600'><i className="fa-solid fa-wallet px-1"></i>
            Check Out Now
          </button>
        </Link>
      </> : <img src={cartimg} className='md:w-1/2 mx-auto' />}
    </>
  );
}

