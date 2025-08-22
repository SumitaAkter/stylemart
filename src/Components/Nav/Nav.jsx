import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <div className="w-full fixed top-0 bg-white shadow-sm z-50">
                <nav className='flex flex-wrap items-center justify-between px-10 py-3 w-full'>
                    <button className='lg:hidden text-gray-800' onClick={toggleMobileMenu}>
                        <i className='bi bi-list text-2xl text-gray-800'></i>
                    </button>

                    <Link to='/' className='mx-auto order-0 lg:hidden flex'>
                        <h2 className='text-3xl font-bold font-bricolage tracking-widest'>Style <span className='font-bricolage'>Mart</span></h2>
                    </Link>

                    <ul className='lg:hidden flex items-center gap-4'>
                        <li className='relative'>
                            <Link to='/Wishlist'>
                                <i className='bi bi-heart text-lg text-black'></i>
                                <span className='absolute -top-2 -right-2 w-[22px] h-[22px] text-xs bg-black text-white rounded-full flex items-center justify-center'>
                                    0
                                </span>
                            </Link>
                        </li>
                        <li className='relative'>
                            <Link to='/Cart'>
                                <i className='bi bi-bag text-lg text-black'></i>
                                <span className='absolute -top-2 -right-2 w-[22px] h-[22px] text-xs bg-black text-white rounded-full flex items-center justify-center'>
                                    0
                                </span>
                            </Link>
                        </li>

                    </ul>

                    <div className={`w-full lg:flex justify-between items-center ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                        <ul className='flex flex-col lg:flex-row items-center gap-4'>
                            <li>
                                <Link to='/' className='font-bold uppercase relative nav-link py-1'>Home</Link>
                            </li>
                            <li>
                                <Link to='/About' className='font-bold uppercase relative nav-link py-1'>About</Link>
                            </li>
                            <li>
                                <Link to='/Shop' className='font-bold uppercase relative nav-link py-1'>Shop</Link>
                            </li>
                            <li>
                                <Link to='/Blog' className='font-bold uppercase relative nav-link py-1'>Blog</Link>
                            </li>
                            <li>
                                <Link to='/Contact' className='font-bold uppercase relative nav-link py-1'>Contact</Link>
                            </li>
                        </ul>

                        <Link to='' className='hidden lg:flex'>
                            <h2 className='text-3xl font-bold font-bricolage tracking-widest'>Style <span className='font-briocolage'>Mart</span></h2>
                        </Link>

                        <ul className='hidden lg:flex items-center gap-4'>
                            <li className='relative'>
                                <Link to='/Wishlist'>
                                    <i className='bi bi-heart text-lg text-black'></i>
                                    <span className='absolute -top-2 -right-2 w-[22px] h-[22px] text-xs bg-black text-white rounded-full flex items-center justify-center'>
                                        0
                                    </span>
                                </Link>
                            </li>
                            <li className='relative'>
                                <Link to='/Cart'>
                                    <i className='bi bi-bag text-lg text-black'></i>
                                    <span className='absolute -top-2 -right-2 w-[22px] h-[22px] text-xs bg-black text-white rounded-full flex items-center justify-center'>
                                        0
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Nav;