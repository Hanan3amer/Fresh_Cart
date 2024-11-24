import React, { useContext, useEffect, useState } from 'react';
import RecentProducts from '../Recentproducts/Recentproducts';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Whishlistcontext } from '../../Context/Whishlistcontext';
import { Cartcontext } from '../../Context/Cartcontext'
export default function Products() {
  let { addTocart, setCart } = useContext(Cartcontext)
  let { addTowhishlist, setwhishlist } = useContext(Whishlistcontext)
  let [category, setCategory] = useState([]);
  let [cat, setCat] = useState([]);
  let [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let [catid, setCatid] = useState(null);

  let toggleDropdown = (event) => {
    event.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };
  async function addtowhishList(productId) {
    let response = await addTowhishlist(productId)
    if (response.data.status === 'success') {
      setwhishlist(response?.data)
      toast.success(response.data.message, {
        duration: 1000,
        position: 'top-right'
      })
    }
    else {
      toast.error(response.data.message, {
        duration: 1000,
        position: 'top-right'
      })
    }

  }
  async function addtocart(productId) {
    let response = await addTocart(productId)
    if (response.data.status === 'success') {
      setCart(response?.data)

      toast.success(response.data.message, {
        duration: 1000,
        position: 'top-right'
      })
    }
    else {
      toast.error(response.data.message, {
        duration: 1000,
        position: 'top-right'
      })
    }

  }
  function renderStars(rating) {
    let fullStars = Math.floor(rating);
    let hasHalfStar = rating - fullStars >= 0.5;
    let emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-yellow-300 fa-sm"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-yellow-300 fa-sm"></i>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-gray-200 dark:text-gray-600 fa-sm"></i>);
    }

    return stars;
  }
  function GetAllCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((response) => {
        setCategory(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function GetSpesificCat(catid) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${catid}`)
      .then((response) => {
        setCat(response.data.data);
        console.log(response.data.data);

      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    GetAllCategories();
  }, []);

  useEffect(() => {
    if (catid) {
      GetSpesificCat(catid);
    }
  }, [catid]);

  return (
    <>
      <form className="max-w-lg mx-auto">
        <div className="flex">
          <div className="flex flex-col">
            <button
              id="dropdown-button"
              onClick={toggleDropdown}
              type="button"
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
            >
              Categories
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className={`z-10 ${isDropdownOpen ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
            >
              <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
                {category?.map((item) => (
                  <li key={item?._id}>
                    <button
                      onClick={() => setCatid(item?._id)}
                      type="button"
                      className="w-full px-4 py-2 hover:bg-gray-100"
                    >
                      {item?.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative w-full">
            <div className="flex">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50  border-s-gray-50 border-s-2 border border-gray-300 focus:ring-green-500 focus:border-green-500"
                placeholder="Search Category..."
                required
              />
              <button
                type="submit"
                className="top-0 bottom-0 p-2.5 text-sm font-medium text-white bg-green-700 rounded-e-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      {cat.length > 0 ? (
        <div className='row'>
          {cat.map((product) => (
            <div key={product._id} className="py-3 sm:w-1/2 lg:w-1/4 xl:w-1/6 px-2 ">
              <div className="relative transition-all product w-full max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-white dark:border-gray-200">
                <Link to={`/productdetails/${product._id}/${product?.category?.name}`}>
                  <img className="p-6 rounded-t-lg" src={product.imageCover} alt={product.title} />
                  <div className="px-5">
                    <h5 className="text-xs font-semibold tracking-tight text-gray-900 dark:text-gray-400">{product.category.name}</h5>
                    <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-gray-700 hover:text-green-700 cursor-pointer">{product.title.slice(0, 20)}</h5>
                    <div className="flex items-center mt-2.5 ">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {renderStars(product.ratingsAverage)}
                      </div>
                      <span className="text-gray-400 text-sm py-0.5 rounded dark:text-gray-500 ms-3">{product.ratingsAverage}({product.quantity})</span>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center justify-between p-3">
                  {product?.priceAfterDiscount ? <>
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-900 ">£E {product.priceAfterDiscount}</span>
                    <del className="text-sm font-semibold text-gray-400 dark:text-gray-400"> £E{product.price}</del>

                  </>
                    : <span className="text-sm font-bold text-gray-900 dark:text-gray-900">£E{product.price}</span>}

                  <button onClick={() => addtocart(product.id)} className="text-white bg-green-500 hover:bg-green-600 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-green-500 dark:hover:bg-green-600"><i className="fa-solid fa-plus fa-sm text-white"></i>Add</button>
                </div>
                <div className="layer absolute w-full h-1/4 rounded-lg  z-10  justify-center items-center text-center gap-4 flex top-1/3">
                  <i className=" cursor-pointer fa-regular fa-eye fa-md text-black bg-white shadow-xl hover:bg-green-500 hover:text-white transition-all py-3 rounded-md 
                    px-2.5" />
                  <i onClick={() => addtowhishList(product.id)} className=" cursor-pointer fa-regular fa-heart fa-md text-black bg-white shadow-xl  hover:bg-green-500 hover:text-white transition-all py-3 rounded-md px-2.5" />
                  <i className=" cursor-pointer fa-solid fa-code-compare fa-md text-black bg-white shadow-xl  hover:bg-green-500 hover:text-white transition-all py-3 rounded-md px-2.5"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <RecentProducts />
      )}
    </>
  );
}
