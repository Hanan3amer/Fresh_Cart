import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "../Loading/Loading";

export default function Productdetails() {
  let { id, category } = useParams();
  let [productdetail, setproductdetail] = useState([]);
  let [relatedproducts, setrelatedproducts] = useState([]);
  let [imagesrc, setimagesrc] = useState("");
  let [loading, setLoading] = useState(false);
  function Getproductdetails(id) {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setproductdetail(data?.data);
        setLoading(false);
      });
  }

  function Getrelatedproducts(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allproducts = data?.data;
        let related = allproducts.filter(
          (product) => product.category.name == category
        );

        setrelatedproducts(related);
      })
      .catch(() => {});
  }
  useEffect(() => {
    Getproductdetails(id);
    Getrelatedproducts(category);
  }, [id, category]);
  if (loading) {
    return <Loading></Loading>;
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
      stars.push(
        <i
          key="half"
          className="fas fa-star-half-alt text-yellow-300 fa-sm"
        ></i>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i
          key={`empty-${i}`}
          className="far fa-star text-gray-200 dark:text-gray-600 fa-sm"
        ></i>
      );
    }

    return stars;
  }
  function discount(price, priceAfterDiscount) {
    let Discount = price - priceAfterDiscount;
    let percent = (Discount / price) * 100;
    return Math.floor(percent);
  }
  function Changesrc(e) {
    setimagesrc(e.target.src);
  }
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="flex flex-col">
            <img
              src={imagesrc ? imagesrc : productdetail?.imageCover}
              className="w-3/5 h-full max-md:w-4/5 mx-auto block object-cover py-5 rounded-xl "
              alt="imageCover"
            />
            <ul className="flex gap-5">
              {productdetail?.images?.map((image) => (
                <li key={image}>
                  <motion.img
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={Changesrc}
                    src={image}
                    className="rounded-xl cursor-pointer"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className=" p-6 max-w-md  max-md:mx-auto">
            <h5 className="text-[#099309] py-3">
              {productdetail?.category?.name}
            </h5>
            <h3 className="text-3xl font-bold text-gray-700">
              {productdetail.title}
            </h3>
            <div className="flex items-center mt-2 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {renderStars(productdetail.ratingsAverage)}
              </div>
              <span className="text-[#099309]  text-sm  rounded dark:text-[#099309] ms-1">
                ({productdetail.ratingsQuantity} ratings)
              </span>
            </div>
            {productdetail?.priceAfterDiscount ? (
              <>
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-900 px-2">
                  £E {productdetail.priceAfterDiscount}
                </span>
                <del className="text-lg font-semibold text-gray-400 dark:text-gray-400">
                  {" "}
                  £E{productdetail.price}
                </del>
                <span className="text-red-600 ms-3">
                  {discount(
                    productdetail.price,
                    productdetail.priceAfterDiscount
                  )}
                  % off
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900 dark:text-gray-900">
                £E{productdetail.price}
              </span>
            )}
            <div className="line border-b-2 border-gray-200 py-3"></div>
            <form className="max-w-xs">
              <div className="relative flex items-center max-w-[8rem] py-3 ">
                <button
                  type="button"
                  id="decrement-button"
                  data-input-counter-decrement="quantity-input"
                  className="bg-gray-100 dark:bg-white dark:hover:bg-gray-100 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-black dark:text-black"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  id="quantity-input"
                  data-input-counter
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50  border-gray-600 h-11 text-center border text-black text-sm  block w-full py-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
                  placeholder="999"
                  required
                />
                <button
                  type="button"
                  id="increment-button"
                  data-input-counter-increment="quantity-input"
                  className="bg-gray-100 dark:bg-white dark:hover:bg-gray-100 dark:border-gray-600 hover:bg-gray-100 border border-gray-300 rounded-e-lg p-3 h-11  focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-black dark:text-black"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
            </form>
            <div className="flex gap-3 py-3">
              <button className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <i className="fa-solid fa-cart-plus"></i> Add to cart
              </button>
              <i className="fa-solid cursor-pointer fa-code-compare fa-md text-black bg-gray-200   hover:bg-gray-300 transition-all py-3 rounded-md px-2.5"></i>
              <i className="fa-regular cursor-pointer fa-heart fa-md text-black bg-gray-200   hover:bg-gray-300  transition-all py-3 rounded-md px-2.5" />
            </div>
            <div className="line border-b-2 border-gray-200 py-3"></div>

            <ul className="list-unstyled flex items center gap-10">
              <li className="text-gray-500 text-sm py-3 font-semibold">
                Description:
              </li>
              <li className="text-gray-500 text-sm py-3">
                {productdetail.description}
              </li>
            </ul>
            <ul className="list-unstyled flex items center gap-[4.8rem]">
              <li className="text-gray-500 text-sm py-3 font-semibold">
                Brand:
              </li>
              <li className="text-gray-500 text-sm py-3">
                {productdetail?.brand?.name}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h3 className="text-3xl text-gray-700 ms-7">Related Items</h3>
      <div className="row">
        {relatedproducts.map((product) => (
          <div
            key={product.id}
            className="py-3 sm:w-1/2 lg:w-1/4 xl:w-1/6 px-2 "
          >
            <div
              onClick={Changesrc}
              className=" relative transition-all product w-full max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-white dark:border-gray-200"
            >
              <Link
                to={`/productdetails/${product.id}/${product?.category?.name}`}
              >
                <img
                  className="p-6 rounded-t-lg"
                  src={product.imageCover}
                  alt={product.title}
                />
                <div className="px-5 pb-5">
                  <h5 className="text-xs font-semibold tracking-tight text-gray-900 dark:text-gray-400">
                    {product.category.name}
                  </h5>
                  <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-gray-700 hover:text-green-700 cursor-pointer">
                    {product.title.slice(0, 20)}
                  </h5>
                  <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      {renderStars(product.ratingsAverage)}
                    </div>
                    <span className="text-gray-400 text-sm py-0.5 rounded dark:text-gray-500 ms-3">
                      {product.ratingsAverage}({product.quantity})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    {product?.priceAfterDiscount ? (
                      <>
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-900 ">
                          £E {product.priceAfterDiscount}
                        </span>
                        <del className="text-sm font-semibold text-gray-400 dark:text-gray-400">
                          {" "}
                          £E{product.price}
                        </del>
                      </>
                    ) : (
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-900">
                        £E{product.price}
                      </span>
                    )}

                    <button className="text-white bg-green-500 hover:bg-green-600 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-green-500 dark:hover:bg-green-600">
                      <i className="fa-solid fa-plus fa-sm text-white"></i>Add
                    </button>
                  </div>
                </div>
                <div className="layer absolute w-full h-full z-10 rounded-lg  justify-center items-center text-center gap-4 flex top-0 ">
                  <i
                    className="fa-regular fa-eye fa-md text-black bg-white shadow-xl hover:bg-green-500 hover:text-white transition-all py-3 rounded-md 
                            px-2.5"
                  />
                  <i className="fa-regular fa-heart fa-md text-black bg-white shadow-xl  hover:bg-green-500 hover:text-white transition-all py-3 rounded-md px-2.5" />
                  <i className="fa-solid fa-code-compare fa-md text-black bg-white shadow-xl  hover:bg-green-500 hover:text-white transition-all py-3 rounded-md px-2.5"></i>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
3;
