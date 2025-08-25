import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Checkout = () => {

    const [deliveryOption, setdeliveryOption] = useState('ship');
    const [cartItems, setcartItems] = useState([]);

    useEffect(() => {
        const savedcart = JSON.parse(localStorage.getItem('cart')) || [];
    }, []);

    const handlePlaceorder = () => {
        toast.success('Order Placed Successfull')
    };

    const totalPrice = cartItems.reduce((acc, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return acc + price * item.quantity;
    }, 0);

    const estimatedTax = (totalPrice * 0.1).toFixed(2);

    return (
        <>
            <h2 className="text-center text-5xl mb-4 font-bold font-bricolage mt-[3%] md:mt-[7%]">Checkout!</h2>
            <div className='px-[8%] lg:px-[12%] py-[50px]'>
                <div className='grid gap-4 lg:grid-cols-12'>
                    <div className='lg:col-span-7'>
                        <h5 className="mb-2 font-semibold">Contact</h5>
                        <div className='mb-3'>
                            <input type="email" className='border w-full p-2' placeholder='Email or mobile phone number' />
                        </div>
                        <div className="form-check mb-4">
                            <input type="checkout" id='newsCheck' className='border p-2' />
                            <label className='form-check-label text-lg ml-2' htmlFor="newsCheck">
                                Email me with news and offers
                            </label>
                        </div>

                        <h5 className="mb-2 font-semibold">Delivery</h5>
                        <div>
                            <div className='mb-3'>
                                <div className='btn-group btn-form w-full' role='group'>
                                    <input
                                        type="radio"
                                        className='btn-check'
                                        name='deliveryOption'
                                        id='ship'
                                        checked={deliveryOption === 'ship'}
                                        onChange={() => setdeliveryOption('ship')}
                                    />
                                    <label className='btn btn-outline-primary px-2 me-3 rounded-lg ml-2' htmlFor="ship">Ship</label>
                                    <input
                                        type="radio"
                                        className='btn-check'
                                        name='deliveryOption'
                                        id='pickup'
                                        checked={deliveryOption === 'pickup'}
                                        onChange={() => setdeliveryOption('pickup')}
                                    />
                                    <label className='btn btn-outline-primary px-2 me-3 rounded-lg ml-2' htmlFor="pickup"> Pickup in store</label>
                                </div>
                            </div>
                            {deliveryOption === 'ship' && (
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-3'>
                                    <div className='mb-3 md:col-span-2'>
                                        <select className='form-select border p-1'>
                                            <option>Bangladesh</option>
                                            <option>United State</option>
                                            <option>united Kingdom</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className='border w-full p-2'
                                            placeholder='First name'
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className='border w-full p-2'
                                            placeholder='Last name (optional)'
                                        />
                                    </div>
                                </div>
                            )}
                            {deliveryOption === 'pickup' && (
                                <div className='my-4'>
                                    <div className='flex justify-between items-center mb-2'>
                                        <h6 className='font-semibold mb-0'>Store Location</h6>
                                        <a href='#' className='text-decoration-none text-sm'>
                                            change Location
                                        </a>
                                    </div>
                                    <div
                                        className='alert alert-danger p-2 flex flex-col rounded-3'
                                        role='alert'
                                        style={{
                                            color: "#7b1c1c",
                                            backgroundColor: "#fef6f6",
                                            border: '1px solid rgba(145, 137, 137, .59)'
                                        }}
                                    >
                                        <div className='flex items items-center mb-1'>
                                            <i className='bi bi-exclamation-circle-fill me-2'
                                                style={{ fontSize: "1rem" }}></i>
                                        </div>
                                        <strong>No Stores available with your item</strong>
                                    </div>
                                    <div>
                                        <a
                                            href="#"
                                            className='underline'
                                            style={{ color: "#7b1c1c" }}
                                        >Ship to address
                                        </a> {""}
                                        instead
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <input type="text" className='border w-full p-2' placeholder='Address' />
                        </div>
                        <div className="mb-3">
                            <input type="text" className='border w-full p-2' placeholder='Apartment, suite, etc.(optional)' />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-2'>
                            <div>
                                <input type="text" className='border w-full p-2' placeholder='city' />
                            </div>
                            <div>
                                <input type="text" className='border w-full p-2' placeholder='Postal code(optional)' />
                            </div>
                        </div>
                        <div className='form-check mb-4'>
                            <input type="checkbox" id='saveInfo' />
                            <label htmlFor="" className='ms-1'>
                                Save this information for next time
                            </label>
                        </div>

                        <h6 className='mb-2'>Shipping Mathod</h6>
                        <div className='rounded p-3 flex justify-between items-center' style={{ border: "1px solid darkblue", backgroundColor: '#f0f5ff' }}>
                            <span>Standard</span>
                            <span className='text-green-600'>FREE</span>
                        </div>

                        <div className="my-5">
                            <h4 className='font-semibold'>Payment</h4>
                            <p className='text-gray-500 mb-3'>All transactions are secure and encrypted.</p>

                            <div className="border rounded">
                                <div className="bg-gray-100 border-b flex justify-between items-center">
                                    <span className='font-semibold ml-4'>Credit Card</span>
                                    <div className='bg-yellow-400 text-white rounded px-2 py-1 font-bold text-sm'>
                                        B
                                    </div>
                                </div>
                                <div className="p-3 bg-gray-100">
                                    <div className="mb-3">
                                        <input type="text" className='border w-full p-2' placeholder='Card number' />
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                        <div>
                                            <input type="text" className='border w-full p-2' placeholder='Expiration Date (MM / YY)' />
                                        </div>
                                        <div>
                                            <input type="text" className='border w-full p-2' placeholder='Security code' />
                                        </div>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <input type="text" className='border w-full p-2' placeholder='Name on card' />
                                    </div>

                                    <div className="form-check mb-3">
                                        <input type="checkbox" className='form-check-input' id='billingCheck' checked />
                                        <label htmlFor="billingCheck" className='form-check-label'>
                                            Use billing address as billing address
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button
   
  className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded bg-black text-white hover:bg-[#ff823a]  transition-transform duration-75"
>
  <i className="fa fa-credit-card"></i>
  Pay Now
</button>



                            <div className="mt-5 border-t pt-3">
                                <a href="#" className='text-decoration-none text-sm underline'>Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <div className="card border-0 shadow-sm rounded-4 p-4">
                            <h5 className='font-bold mb-3 font-bricolage'>
                                <i className='ri-shopping-card-2-line  text-[#ff823a]'></i>Order Summary
                            </h5>
                            {cartItems.length === 0 ? (
                                <p className='text-gray-500'>Your Cart is empty</p>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className='flex items-center mb-3 border-b pb-2'>
                                        <img src={item.image} alt={item.name} className='rounded' width='60' height='60' style={{ objectFit: "cover", marginRight: "10px" }} />
                                        <div className="flex-grow">
                                            <h6 className="mb-1 font-bricolage">{item.productname}</h6>
                                            <small className='text-gray-600'>
                                                Qty:{item.quantity}
                                            </small>
                                        </div>
                                        <div className="font-semibold">
                                            ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</div>
                                    </div>
                                ))
                            )}
                            <hr />
                            <div className="flex justify-between text-sm pt-2">
                                <span>SubTotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2">
                                <span>Shipping</span>
                                <span>Enter address</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2">
                                <span>Estimated Tax</span>
                                <span>${estimatedTax}</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2">
                                <span>Total</span>
                                <span className='font-bricolage'>${(totalPrice + parseFloat(estimatedTax)).toFixed(2)}</span>
                            </div>
                            <button
  onClick={handlePlaceorder}
  className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded bg-black text-white hover:bg-[#ff823a] transition-transform duration-75 mt-3 mb-5"
>
  <i className="ri-secure-payment-line"></i>
  Place Order
</button>

                            <Link to='/Cart' className='btn p-2 rounded px-3 transition-all text-decoration-none'>
                                <i className='ri-arrow-left-line me-1'></i> Back to cart
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
            />
        </>
    );
};

export default Checkout;