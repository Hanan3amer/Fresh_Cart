import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import Slider from 'react-slick';
import axios from 'axios';
export default function Slides() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        autoplay: true,
        autopalySpeed: 1500
    };
    let [category, setcategory] = useState([])
    let [loading, setLoading] = useState(false)
   
    function getCategoriesApi() {
        setLoading(true)
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            .then(({data}) => {
                setcategory(data?.data)
                setLoading(false)
            })
    }
    useEffect(() => {
        getCategoriesApi()
    }, [])

    if (loading)
        return <Loading></Loading>
    return (
        <div className=' hidden md:block'>
            <Slider {...settings}>
                {category.map(ele => <img key={ele._id} src={ele?.image} className='h-[180px]' style={{ objectFit: 'cover' }} />)}
            </Slider>
        </div>
    )
}
