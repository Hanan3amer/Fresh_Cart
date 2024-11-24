import React, { useContext } from 'react';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import useProducts from '../../Hooks/useProducts';
import toast from 'react-hot-toast';
import { Cartcontext } from '../../Context/Cartcontext'
import { Whishlistcontext } from '../../Context/Whishlistcontext';
export default function RecentProducts() {
    let { addTocart , setCart} = useContext(Cartcontext)
    let { addTowhishlist , setwhishlist} = useContext(Whishlistcontext)
    let { data, isLoading } = useProducts()
    if (isLoading)
        return <Loading></Loading>
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
    return (
        <div className="row">
            {data?.data.data.map((product) => (
                <div key={product.id} className="py-3 sm:w-1/2 lg:w-1/4 xl:w-1/6 px-2 ">
                    <div className="relative transition-all product w-full max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-white dark:border-gray-200">
                        <Link to={`/productdetails/${product.id}/${product?.category?.name}`}>
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
    );
}
