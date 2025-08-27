import React from 'react';
import blogs from '../Blogs.json';
import { Link } from 'react-router-dom';

import bannerImage from '../assets/section-banner.jpg';

const Blog = () => {
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
                        <span className="text-[#ff823a]">Our</span> Blog
                    </h1>
                </div>
            </div>

            {/* Blog Cards Section */}
            <div className="shop-container px-[8%] lg:px-[12%] py-[50px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <div key={index} className="blog-item bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                            
                            <div className="blog-image relative overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt="blog"
                                    className="w-full h-[250px] object-cover transition-transform duration-300 hover:scale-110"
                                />
                            </div>

                            
                            <div className="blog-content p-5 flex flex-col flex-grow">
                                
                                <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm font-semibold mb-3">
                                    {blog.title}
                                </span>

                               
                                <h3 className="font-bricolage text-2xl font-semibold text-gray-900 mb-4">
                                    {blog.pere}
                                </h3>

                               
                                <div className="flex justify-between items-end mt-auto">
                                   
                                    <div className="flex flex-col text-sm text-gray-600">
                                        <span className="font-bold">{blog.author}</span>
                                        <span>{blog.date}</span>
                                    </div>

                                    
                                    <Link
                                        to={`/blog/${blog.id}`}
                                        className="inline-flex items-center gap-2 text-[#ff823a] font-semibold hover:underline"
                                    >
                                        See More <i className="bi bi-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Blog;
