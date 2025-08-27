import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

//data
import products from '../Products.json';

import serviceImg1 from '../assets/service-icon-1.svg';
import serviceImg2 from '../assets/service-icon-2.svg';
import serviceImg3 from '../assets/service-icon-3.svg';
import serviceImg4 from '../assets/service-icon-4.svg';

import brand1 from '../assets/brand-1.png';
import brand2 from '../assets/brand-2.png';
import brand3 from '../assets/brand-3.png';
import brand4 from '../assets/brand-4.png';
import brand5 from '../assets/brand-5.png';
import brand6 from '../assets/brand-5.png';


import shoesbanner from '../assets/Shoes-banner.jpg';

import discover1 from '../assets/shoes-banner-image-01.png';
import discover2 from '../assets/shoes-banner-image-02.png';

import socialImage1 from '../assets/social-image-1.png';
import socialImage2 from '../assets/social-image-2.png';
import socialImage3 from '../assets/social-image-3.png';
import socialImage4 from '../assets/social-image-4.png';
import socialImage5 from '../assets/social-image-5.png';

const Index = () => {
    const [filterSortOption, setfilterSortOption] = useState('all');
    const navigte = useNavigate();

    const addToWishlist = (products) => {
        const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!existing.some(p => p.id === products.id)) {
            const updated = [...existing, products];
            localStorage.setItem('wishlist', JSON.stringify(updated));
            window.dispatchEvent(new Event('wishlistUpdated'));
            toast.success(`${products.productname} added to your wishlist!`)
        } else {
            toast.info(`${products.productname} is already in your wishlist.`)
        }
    };
    const addToCart = (products) => {
        const existing = JSON.parse(localStorage.getItem('cart')) || [];
        if (!existing.some(p => p.id === products.id)) {
            const updated = [...existing, products];
            localStorage.setItem('cart', JSON.stringify(updated));
            window.dispatchEvent(new Event('cartUpdated'));
            toast.success(`${products.productname} added to your cart!`)
        } else {
            toast.info(`${products.productname} is already in your cart.`)
        }
    };

    const images = [socialImage1, socialImage2, socialImage3, socialImage4, socialImage5, socialImage1];


    return (
        <>
            {/** Hero */}
            <div className="hero">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    modules={[EffectFade, Autoplay]}
                    effect='fade'
                    loop={true}
                    autoplay={{ delay: 3000 }}
                >
                    <SwiperSlide>
                        <div className='hero-wrap hero-wrap1 px-[8%] lg:px-[12%]'>
                            <div className="hero-content">
                                <h5 className="pt-10">- 50% off Shoes Sale -</h5>
                                <h1>Shoe Must-Haves <span className='text-[#ff823a]'>For Man!</span></h1>
                                <p className='my-3'> Shoes go beyond mere utility; they showcase individual style, cultural identity, and advances in design</p>
                                <a href="#" className='btn hero-btn px-4 py-2 rounded'>Shop Now</a>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='hero-wrap hero-wrap2 px-[8%] lg:px-[12%]'>
                            <div className="hero-content">
                                <h5 className="pt-10">- NEW COLLECTONS -</h5>
                                <h1>Get The Perfectly <br /> Shoes <span className='text-[#ff823a]'>Best Price!</span></h1>
                                <p className='my-3'> Shoes serve more than a purpose; they reflect individuality, cultural history, and modern technology</p>
                                <a href="#" className='btn hero-btn px-4 py-2 rounded '>Shop Now</a>
                            </div>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>

            {/** Products */}
            <div className="products-container px-[8%] lg:px-[12%] py-[50px] my-12">
                <div className="relative">
                    <div className="row">
                        <div className="section-title mb-12 product-title text-center">
                            <h2 className='font-semibold text-3xl'>Our Latest Products</h2>
                            <p className="text-gray-500">Get The Trending Shoes</p>
                        </div>
                    </div>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={20}
                        modules={[Navigation]}
                        navigation={{ nextEl: ".product-swiper-next", prevEl: ".product-swiper-prev" }}
                        breakpoints={{
                            1399: { slidesPerView: 4 },
                            1199: { slidesPerView: 3 },
                            991: { slidesPerView: 2 },
                            767: { slidesPerView: 1.5 },
                            0: { slidesPerView: 1 },
                        }}
                        className='mt-4 swiper relative'
                    >
                        {products.filter(product => product.id >= 5 && product.id <= 10).map(product => (
                            <SwiperSlide key={product.id}>
                                <div className="product-item text-center relative">
                                    <Link to={`/product/${product.id}`} className='no-underline text-black'>
                                        <div className="product-image w-full relative overflow-hidden">
                                            <img src={product.image} alt="product" className="w-full h-auto" />
                                            <img src={product.secondImage} alt="product" className="w-full h-auto" />
                                            <div className="product-icons gap-3 flex justify-center items-center absolute transition duration-300">
                                                <div className="product-icon cursor-pointer" title='Add to Wishlist' onClick={(e) => { e.preventDefault(); addToWishlist(product); }}>
                                                    <i className='bi bi-heart text-lg'></i>
                                                </div>
                                                <div className="product-icon cursor-pointer" title='Add to Cart' onClick={(e) => { e.preventDefault(); addToCart(product); }}>
                                                    <i className='bi bi-cart3 text-lg'></i>
                                                </div>
                                            </div>
                                            {product.tag && (
                                                <span className={`badge text-white absolute top-2 left-2 text-xs px-2 py-1 rounded ${product.tag === 'Sale' ? 'bg-red-600' : 'bg-green-600'}`}>
                                                    {product.tag}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                    <div className="product-content pt-2">
                                        <span className='price no-underline'>
                                            {product.price}
                                        </span>
                                        <h3 className='title'>
                                            {product.productname}
                                        </h3>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
            </div>

            {/** Services */}
            <div className='px-[8%] lg:px-[12%] pb-[50px] py-10'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    <div>
                        <img src={serviceImg1} alt="Free Shipping" className='w-[100px] mx-auto' />
                        <h4 className='mb-2 text-2xl font-bricolage font-semibold'>Free Shipping</h4>
                        <p className='text-gray-600 text-sm font-medium'>
                            Free Shipping for orders over 3000 Taka
                        </p>
                    </div>
                    <div>
                        <img src={serviceImg2} alt="Free Shipping" className='w-[100px] mx-auto' />
                        <h4 className='mb-2 text-2xl font-bricolage font-semibold'>Returns</h4>
                        <p className='text-gray-600 text-sm font-medium'>
                            Within 30 days for an exchange.
                        </p>
                    </div>
                    <div>
                        <img src={serviceImg3} alt="Free Shipping" className='w-[100px] mx-auto' />
                        <h4 className='mb-2 text-2xl font-bricolage font-semibold'>Online Support</h4>
                        <p className='text-gray-600 text-sm font-medium'>
                            24 hours a day, 7 days a week
                        </p>
                    </div>
                    <div>
                        <img src={serviceImg4} alt="Free Shipping" className='w-[100px] mx-auto' />
                        <h4 className='mb-2 text-2xl font-bricolage font-semibold'>Flexible Payment</h4>
                        <p className='text-gray-600 text-sm font-medium'>
                            Pay with Multiple Credit Cards
                        </p>
                    </div>
                </div>
            </div>

            {/** Seen in */}
            <div className='text-center px-[8%] lg:px-[12%] seen-in'>
                <div>
                    <h1 className='mb-5 font-semibold text-2xl'>As see in</h1>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={6}
                        modules={[Autoplay]}
                        loop={true}
                        autoplay={{ delay: 2000 }}
                        breakpoints={{
                            1399: { slidesPerView: 6 },
                            1199: { slidesPerView: 6 },
                            991: { slidesPerView: 4 },
                            575: { slidesPerView: 2 },
                            0: { slidesPerView: 2 }
                        }}
                    >
                        <SwiperSlide>
                            <img src={brand1} className='w-[200px] h-[80px] object-cover border rounded border-black p-3' alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={brand2} className='w-[200px] h-[80px] object-cover border rounded border-black p-3' alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={brand3} className='w-[200px] h-[80px] object-cover border rounded border-black p-3' alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={brand4} className='w-[200px] h-[80px] object-cover border rounded border-black p-3' alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={brand5} className='w-[200px] h-[80px] object-cover border rounded border-black p-3' alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={brand6} className='w-[200px] h-[80px] object-cover border rounded border-black p-3' alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={brand2} className='w-[200px] h-[80px] object-cover border rounded border-black p-3' alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={brand4} className='w-[200px] h-[80px] object-cover border rounded border-black p-3' alt="" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>

            {/** favourite beauty */}
            <div className='favourite-beauty px-[8%] lg:px-[12%] py-[50px] my-5'>
                <div>
                    <div className="grid grid-cols-1 mb-5">
                        <div className="section-title mb-5 favourite-beauty-title w-full text-center">
                            <h2 className='font-semibold text-3xl'>Customers Favourite beauty essentials</h2>
                            <p className="text-gray-500">Made using clean, non-toxic ingredients, our products are designed for everyone.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mx-auto">
                        <div className="w-full lg:col-span-4">
                            <div className="favourite-beauty-banner mb-5 lg:mb-0 relative rounded">
                                <img src={shoesbanner} alt="female banner" className='w-full h-auto' />
                                <div className='favourite-beauty-banner-title absolute z-10'>
                                    <h3 className='text-3xl font-bricolage text-[#ff823a]'>Empower Yourself</h3>
                                    <p className='text-md text-[#ff823a]'>Get the skin you want to feel</p>
                                    <button className='btn mt-2 px-3 py-2 rounded btn-default'>Explore More</button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:col-span-7">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {products.filter(product => product.id >= 11 && product.id <= 16).map(product => (
                                    <div className='w-full mb-0' key={product.id}>
                                        <div className="product-item text-center relative">
                                            <div className="product-image w-full relative overflow-hidden">
                                                <img src={product.image} alt="product" className="w-full h-auto" />
                                                <img src={product.secondImage} alt="product" className="w-full h-auto" />
                                                <div className="product-icons gap-3 flex justify-center items-center absolute transition duration-300">
                                                    <div className="product-icon cursor-pointer" title='Add to Wishlist' onClick={() => addToWishlist(product)}>
                                                        <i className='bi bi-heart text-lg'></i>
                                                    </div>
                                                    <div className="product-icon cursor-pointer" title='Add to Cart' onClick={() => addToCart(product)}>
                                                        <i className='bi bi-cart3 text-lg'></i>
                                                    </div>
                                                </div>
                                                {product.tag && (
                                                    <span className={`badge text-white absolute top-2 left-2 text-xs px-2 py-1 rounded ${product.tag === 'Sale' ? 'bg-red-600' : 'bg-green-600'}`}>
                                                        {product.tag}
                                                    </span>
                                                )}
                                            </div>
                                            <Link to={`/product/${product.id}`} className='no-underline text-black'>
                                                <div className="product-content pt-2">
                                                    <span className='price no-underline'>
                                                        {product.price}
                                                    </span>
                                                    <h3 className='title'>
                                                        {product.productname}
                                                    </h3>
                                                </div>
                                            </Link>
                                        </div>

                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/** discover */}
            <div className="discover px-[8%] lg:px-[12%] py-10">
                <div className="mb-10 text-center">
                    <span className="text-lg capitalize font-bold text-[#ff823a]">
                        About Us
                    </span>
                    <h2 className='capitalize text-2xl  tracking-widest font-bricolage font-semibold max-w-7xl mx-auto lg:text-5xl mb-3'>
                        Welcome to multi store
                    </h2>
                    <p className='capitalize text-sm text-[#777777] tracking-widest font-bricolage max-w-7xl mx-auto lg:text-xl'>
                        StyleMart brings you stylish, comfy, and trendy shoes designed for every occasion.
                        Our collections blend modern fashion with lasting comfort, from casual sneakers to elegant formal wear. Shopping is simple with fast delivery secure payments, and reliable customer service. Every step you take reflects confidence, style, and quality, now with exclusive deals on the latest styles. Step into your best look with StyleMart, where fashion meets comfort.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {[discover1, discover2].map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt=""
                            className="w-full h-auto object-cover rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg"
                        />
                    ))}
                </div>

            </div>
            {/** Spcial Image container */}
            <div className="social-mage-container px-5 pt-[50px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 cursor-pointer gap-4">
                    {images.map((img, index) => (
                        <div key={index} className='relative overflow-hidden group rounded-lg'>
                            <img src={img} alt="" className='w-full object-cover' />
                            <i className='bi bi-instagram absolute inset-0 flex items-center justify-center text-white text-5xl opacity-[0] group-hover:opacity-[1] bg-black/50 transition duration-300'></i>
                        </div>
                    ))}
                </div>
            </div>

            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default Index;