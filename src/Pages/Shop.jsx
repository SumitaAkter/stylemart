import React, { useState } from 'react';
import productData from '../Products.json';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import bannerImage from '../assets/section-banner.jpg';

function Shop() {
    const [filterSortOption, setFilterSortOption] = useState('all');
    const navigate = useNavigate();

    // Filter & Sort Logic
    const handleFilterSort = () => {
        let filtered = [...productData];

        if (filterSortOption === 'New' || filterSortOption === 'Sale') {
            filtered = filtered.filter(product => product.tag === filterSortOption);
        }
        if (filterSortOption === 'low') {
            filtered.sort((a, b) =>
                parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''))
            );
        }
        if (filterSortOption === 'high') {
            filtered.sort((a, b) =>
                parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''))
            );
        }
        return filtered;
    };

    const displaedProducts = handleFilterSort();

    // Wishlist
    const addToWishlist = (product) => {
        const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!existing.some(p => p.id === product.id)) {
            const updated = [...existing, product];
            localStorage.setItem('wishlist', JSON.stringify(updated));
            window.dispatchEvent(new Event('wishlistUpdated'));
            toast.success(`${product.productname} added to your wishlist!`);
        } else {
            toast.info(`${product.productname} is already in your wishlist.`);
        }
    };

    // Cart
    const addToCart = (product) => {
        const existing = JSON.parse(localStorage.getItem('cart')) || [];
        if (!existing.some(p => p.id === product.id)) {
            const updated = [...existing, product];
            localStorage.setItem('cart', JSON.stringify(updated));
            window.dispatchEvent(new Event('cartUpdated'));
            toast.success(`${product.productname} added to your cart!`);
        } else {
            toast.info(`${product.productname} is already in your cart.`);
        }
    };

    return (
        <>
            {/* Banner Section */}
            <div
                className="w-full h-80 bg-cover bg-center flex items-center justify-center relative"
                style={{ backgroundImage: `url(${bannerImage})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative text-center text-white z-10">
                    <h6 className="uppercase mb-2">- StyleMart</h6>
                    <h1 className="text-4xl md:text-6xl font-bold">
                        <span className='text-[#ff823a]'>Our</span> Shop
                    </h1>
                </div>
            </div>

            {/* Filter & Sort */}
            <div className='px-[8%] lg:px-[12%] py-[20px]'>
                <div className="my-4 mx-auto">
                    <div className="flex justify-between items-center flex-wrap gap-3">
                        <div className="text-gray-500 text-[1.1rem]">
                            Showing <strong>{displaedProducts.length}</strong> Product{displaedProducts.length !== 1 && 's'} for "
                            {filterSortOption === 'all' ? 'All' : filterSortOption.charAt(0).toUpperCase() + filterSortOption.slice(1)}"
                        </div>
                        <div>
                            <select
                                className='py-2 px-3 rounded text-base appearance-none min-w-[260px] bg-gray-100 border-0'
                                value={filterSortOption}
                                onChange={(e) => setFilterSortOption(e.target.value)}
                            >
                                <option value="all">All Products</option>
                                <option value="New">New Products</option>
                                <option value="Sale">Sale Products</option>
                                <option value="low">Price: Low to High</option>
                                <option value="high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displaedProducts.map(product => (
                        <div key={product.id} className="product-item text-center relative">
                            {/* Image Clickable */}
                            <div
                                className="product-image w-full relative overflow-hidden cursor-pointer"
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                    navigate(`/product/${product.id}`);
                                }}
                            >
                                <img src={product.image} alt={product.productname} className="w-full h-auto" />
                                {product.tag && (
                                    <span className={`badge text-white absolute top-2 left-2 text-xs px-2 py-1 rounded ${product.tag === 'Sale' ? 'bg-red-600' : 'bg-green-600'}`}>
                                        {product.tag}
                                    </span>
                                )}

                                {/* Wishlist / Cart Icons */}
                                <div className="product-icons gap-3 flex justify-center items-center absolute transition duration-300">
                                    <div
                                        className="product-icon cursor-pointer"
                                        title='Add to Wishlist'
                                        onClick={(e) => { e.stopPropagation(); addToWishlist(product); }}
                                    >
                                        <i className='bi bi-heart text-lg'></i>
                                    </div>
                                    <div
                                        className="product-icon cursor-pointer"
                                        title='Add to Cart'
                                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                    >
                                        <i className='bi bi-cart3 text-lg'></i>
                                    </div>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className='product-content pt-3'>
                                {product.oldprice ? (
                                    <span className='price'>
                                        <span className='line-through text-gray-400 mr-2'>{product.oldprice}</span>
                                        <span className='font-bold text-red-600'>{product.price}</span>
                                    </span>
                                ) : (
                                    <span className='price'>{product.price}</span>
                                )}
                                <h3 className='title pt-1'>{product.productname}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Toast Notifications */}
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
}

export default Shop;
