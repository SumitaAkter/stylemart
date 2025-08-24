import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const [cartItems, setcartItems] = useState([]);

    useEffect(() => {
        const savedcart = JSON.parse(localStorage.getItem('cart')) || [];
        setcartItems(savedcart);
    }, []);

    const updateQuantity = (id, type) => {
        const updated = cartItems.map(item => {
            if (item.id === id) {
                if (type === 'increase') {
                    return { ...item, quantity: (item.quantity || 1) + 1 };
                } else if (type === 'decrease' && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
            }
            return item;
        });
        setcartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const removeItem = (id) => {
        const updated = cartItems.filter(item => item.id !== id);
        setcartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
        window.dispatchEvent(new Event('cartUpdated'));
        toast.error('Item removed from cart');
    };

    const totalPrice = cartItems.reduce((acc, item) => {
        const cleanPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
        return acc + cleanPrice * (item.quantity || 1);
    }, 0);

    return (
        <>
            <ol className="section-banner py-3 relative">
                <li className="relative"><Link to="/">Home</Link></li>
                <li className="relative active"><span className="ps-5">Cart</span></li>
            </ol>

            <div className="lg:py-[3%] lg:px-[12%] py-[10px] my-2">
                <h2 className="text-center text-4xl mb-4 font-bold">Your Cart</h2>

                {cartItems.length === 0 ? (
                    <div className="text-center">
                        <p className="lead mb-4">Your Cart is empty</p>
                        <Link to="/" className="btn py-2 px-3 rounded">Back to Shop</Link>
                    </div>
                ) : (
                    <div className="mt-12 grid gap-16 lg:grid-cols-12">

                        {/* Cart Items */}
                        <div className="lg:col-span-6">
                            {cartItems.map(item => (
                                <div
                                    key={item.id}
                                    className="bg-white shadow-md rounded-2xl p-4 mb-4 transform transition duration-300 hover:shadow-lg hover:scale-[1.02]"
                                >
                                    <div className="grid grid-cols-12 items-center gap-4">
                                        <div className="col-span-4">
                                            <img src={item.image} alt={item.productname} className="w-full rounded-lg" />
                                        </div>


                                        <div className="col-span-8">
                                            <div className="text-start w-full">
                                                <h5 className="mb-2 font-bold">{item.productname}</h5>
                                                <p className="text-black mb-1 font-semibold">
                                                    <span className="font-normal">Price: </span>
                                                    {item.price}
                                                </p>
                                                <p className="text-black mb-3 font-semibold">
                                                    <span className="font-normal">Total: </span>
                                                    ${(parseFloat(item.price.replace(/[^0-9.]/g, '')) * (item.quantity || 1)).toFixed(2)}
                                                </p>
                                            </div>

                                            {/* Actions under total */}
                                            <div className="flex items-center gap-2 mt-1">
                                                <button
                                                    className="btn w-[28px] h-[28px] rounded-sm"
                                                    onClick={() => updateQuantity(item.id, 'decrease')}
                                                >
                                                    -
                                                </button>
                                                <span className="w-6 text-center">{item.quantity || 1}</span>
                                                <button
                                                    className="btn w-[28px] h-[28px] rounded-sm"
                                                    onClick={() => updateQuantity(item.id, 'increase')}
                                                >
                                                    +
                                                </button>
                                                <button
                                                    className="btn px-3 py-1 rounded bg-red-500 text-white ml-2"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                        {/* Cart Summary */}
                        <div className="lg:col-span-5">
                            <div className="card border-0 shadow-md rounded-2xl p-5 bg-white flex flex-col min-h-[200px]">
                                <h4 className="font-bold mb-4">Cart Summary</h4>
                                <hr />
                                <div className="flex justify-between mt-2">
                                    <span>Total Items:</span>
                                    <span className="font-bold">{cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}</span>
                                </div>
                                <div className="flex justify-between mt-2 mb-3">
                                    <span>Total Price:</span>
                                    <span className="font-bold">${totalPrice.toFixed(2)}</span>
                                </div>
                                <Link
                                    to="/checkout"
                                    className="btn w-full mt-1 px-3 py-2 rounded bg-blue-500 text-white text-center"
                                >
                                    Proceed to checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
        </>
    );
};

export default Cart;
