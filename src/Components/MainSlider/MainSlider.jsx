import React from 'react'
import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
import Slider from 'react-slick'
export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autopalySpeed: 1500,
        arrows: false
    };
    return (
        <div className='row'>
            <div className="w-2/3 hidden md:block">
                <Slider {...settings}>
                    <img src={slide1} className='w-full h-[400px]' />
                    <img src={slide2} className='w-full h-[400px]' />
                    <img src={slide3} className='w-full h-[400px]' />
                </Slider>
            </div>
            <div className="w-1/3 hidden md:block">
                <img src={slide2} className='w-full h-[200px]' />
                <img src={slide3} className='w-full  h-[200px]' />
            </div>
        </div>
    )
}
