import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

//data
import products from '../Products.json'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

import bannerImage from "../assets/section-banner.jpg";

const ProductDetails = () => {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));

    const [mainImage, setMainImage] = useState('');
    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (product) {
            setMainImage(product.image);
            setImages([product.image, product.secondImage].filter(Boolean));
            setQuantity(1);
        }
    }, [product]);

    if (!product) {
        return <p className="text-center text-xl py-20">Product not found</p>;
    }

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find((item) => item.id === product.id);

        if (!existing) {
            cart.push({ ...product, quantity });
            localStorage.setItem('cart', JSON.stringify(cart));
            window.dispatchEvent(new Event('cartUpdated'));
            toast.success(`${product.productname} added to your cart!!`)
        } else {
            toast.info(`${product.productname} is already added in your cart!!`)
        }
    };

    const addToWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const existing = wishlist.find((item) => item.id === product.id);

        if (!existing) {
            wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            window.dispatchEvent(new Event('wishlistUpdated'));
            toast.success(`${product.productname} added to your wishlist!!`)
        } else {
            toast.info(`${product.productname} is already added in your wishlist!!`)
        }
    };

    const colors = ['#000000', '#7b3f00', '#9bbec8'];
    const [activeTab, setActiveTab] = useState('description');





    return (

        <>

            <div
                className="w-full h-80 bg-cover bg-center flex items-center justify-center relative"
                style={{ backgroundImage: `url(${bannerImage})` }}
            >
                
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>

                
                <div className="relative text-center text-white z-10">
                    <h6 className="uppercase mb-2">- StyleMart</h6>
                    <h1 className="text-4xl md:text-6xl font-bold">
                        {product.productname}
                    </h1>
                </div>
            </div>


            <ToastContainer />

            <div className="px-[8%] lg:px-[12%] py-[50px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="flex flex-col-reverse lg:flex-row gap-4">
                        <div className="flex lg:flex-col gap-4 w-full lg:w-1/4">
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Thumb ${idx}`}
                                    onClick={() => setMainImage(img)}
                                    className={`w-full h-24 rounded-lg object-cover ${mainImage === img ? 'border-black' : 'border-gray-200'} cursor-pointer`}
                                />
                            ))}
                        </div>
                        <div className="w-full lg:w-3/4">
                            <img src={mainImage} alt="Main" className="w-full h-auto object-contain rounded-lg" />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-2">{product.productname}</h2>
                        <p className="text-2xl text-gray-700 font-semibold mb-4">{product.price}</p>

                        <p className="mb-2 font-medium">Color:</p>
                        <div className="flex gap-2 mb-4">
                            {colors.map((color, idx) => (
                                <div
                                    key={idx}
                                    className="w-6 h-6 rounded-full border border-gray-400"
                                    style={{ backgroundColor: color }}
                                ></div>
                            ))}
                        </div>

                        <p className="font-medium mb-1">Quantity:</p>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center bg-gray-100 px-4 py-2 rounded">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-lg">-</button>
                                <input type="text"
                                    readOnly
                                    value={quantity}
                                    className="w-12 text-center bg-transparent text-lg"
                                />
                                <button onClick={() => setQuantity(quantity + 1)} className="text-lg">+</button>
                            </div>
                        </div>

                        <button
                            onClick={addToCart}
                            className="w-full py-3 text-white text-lg bg-black hover:bg-orange-500 rounded mb-4"
                        >
                            Add to Cart
                        </button>
                        <p className="text-xl text-gray-500 mb-2">Vendor: <span className="text-black">{product.vendor}</span></p>
                        <p className="text-xl text-gray-500 mb-2">Category: <span className="text-black">{product.category}</span></p>
                        <p className="text-xl text-gray-500 mb-2">SKU: <span className="text-black">{product.id}</span></p>
                    </div>
                </div>
            </div>

            <div className="container px-[8%] lg:px-[12%] py-[80px]">
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`px-6 py-2 text-lg font-semibold capitalize border-b-2 transition-colors ${activeTab === 'description' ? 'border-black text-black' : 'border-transparent text-gray-500'}`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => setActiveTab('shipping')}
                        className={`px-6 py-2 text-lg font-semibold capitalize border-b-2 transition-colors ${activeTab === 'shipping' ? 'border-black text-black' : 'border-transparent text-gray-500'}`}
                    >
                        Shipping & Return
                    </button>
                </div>
                <div>
                    {activeTab === 'description' && (
                        <div className="mt-10">
                            <p className="text-2xl font-bold mb-2 font-bricolage">{product.dtitle}</p>
                            <p className="text-gray-700 mb-4">
                                {product.ddes}
                            </p>
                            <h5 className="text-2xl font-bold mb-2 font-bricolage">{product.dsubtitle}</h5>
                            <ul className="text-gray-700 space-y-1">
                                <li>Breathable and lightweight upper material</li>
                                <li>Cushioned insole for superior comfort</li>
                                <li>Durable rubber outsole for traction</li>
                                <li>Available in multiple sizes and colorways</li>
                                <li>Ideal for daily wear, gym, or casual outings</li>
                            </ul>
                        </div>
                    )}
                    {activeTab === 'shipping' && (
                        <div className="mt-10">
                            <p className="mb-2">
                                Orders are processed within 1-2 business days. Standard shipping delivers within 5-7 days. Express delivery options are available at checkout.
                            </p>
                            <p className="mb-2">
                                Free shipping is available on orders above ৳2,000. A tracking number will be sent to your email once your order ships.
                            </p>
                            <p className="mb-2">
                                Need to return or exchange? No problem. We accept returns within 7 days of delivery, as long as the shoes are unused and in original packaging. Refunds are processed within 3-5 days after we receive the item.
                            </p>
                            <p>
                                If you have any issues, contact our Support team anytime.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="products-container px-[8%] lg:px-[12%] py-[50px] my-12">
                <div className="relative">
                    <div className="row">
                        <div className="section-title mb-12 product-title text-Start">
                            <h2 className='font-semibold text-3xl'>Recomended Products</h2>
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
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
