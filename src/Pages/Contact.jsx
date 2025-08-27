import React, { useState } from 'react';
import bannerImage from '../assets/section-banner.jpg'

function Contact() {
    const [isSent, setIsSent] = useState(false);

    const handleSendMessage = (e) => {
        e.preventDefault();
        setIsSent(true);

        // 20 sec পর আবার button ফিরে আসবে
        setTimeout(() => setIsSent(false), 20000);
    };

    return (
        <>
            <section className='contact-section mt-20'>
                <div className='px-[8%] lg:px-[12%] py-50px'>
                    <h2 className='section-title text-3xl font-bold text-center'>Keep In Touch With Us</h2>
                    <p className='section-subtitle text-center mt-2 text-gray-600'>
                        Be the first to know about new skincare launches, exclusive offers, and <br />
                        expert beauty tips for radiand skin.
                    </p>

                    <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-10'>
                        <div className="contact-box text-left p-6">
                            <i className='ri-map-pin-line text-3xl icon mb-2'></i>
                            <h5 className='text-2xl font-semibold mb-1 font-bricolage'>Address</h5>
                            <p>FS Tower, 5th Floor, Mirpur-10, Dhaka</p>
                            <p className='mb-4'>Senpara Parbota, Kafrul, Dhaka-1612</p>
                            <a href="#" className='line font-bold hover:underline'>
                                Get Direction
                            </a>
                        </div>
                        <div className="contact-box text-left p-6">
                            <i className='ri-phone-line text-3xl icon mb-2'></i>
                            <h5 className='text-2xl font-semibold mb-1 font-bricolage'>Contact</h5>
                            <p className='text-gray-400'><strong className='text-black'>Mobile:</strong> +880 1392763899</p>
                            <p className='text-gray-400'><strong className='text-black'>Phone:</strong> +880 1358993399</p>
                            <p className='text-gray-400'><strong className='text-black'>Email:</strong> sumitaakter530@gmail.com</p>
                        </div>
                        <div className="contact-box text-left p-6">
                            <i className='ri-time-line text-3xl icon mb-2'></i>
                            <h5 className='text-2xl font-semibold mb-1 font-bricolage'>Working Hour</h5>
                            <p className='text-gray-400'><strong className='text-black'>Mon - Fri:</strong> 08:30 - 20:00</p>
                            <p className='text-gray-400'><strong className='text-black'>Sat & Sun:</strong> 10:00 - 21:00</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="contact-page">
                {/** Map Section */}
                <section className='map-location px-[8%] lg:px-[12%]'>
                    <iframe
                        title='Our Location'
                        className='map rounded w-full h-96'
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14144.961920894002!2d90.35855565104697!3d23.807471358100642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1764d78c5fb%3A0x72ef8385abd98414!2sFS%20Square!5e1!3m2!1sen!2sbd!4v1756314134247!5m2!1sen!2sbd"
                        allowFullScreen
                    ></iframe>
                </section>

                {/** Contact Form */}
                <div className="message-section text-center mt-6 px-4">
                    <h2 className='form-title text-3xl font-bold text-center mb-8 font-bricolgae'>Send Your Message</h2>
                    <form className='contact-form max-w-4xl mx-auto' onSubmit={handleSendMessage}>
                        <div className="row grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input type="text" placeholder='Your Name' className='input border border-gray-300 px-4 py-2 rounded' required />
                            <input type="email" placeholder='Enter Email' className='input border border-gray-300 px-4 py-2 rounded' required />
                        </div>
                        <div className='row mb-4'>
                            <textarea placeholder='Message' className='text w-full border border-gray-300 px-4 py-2 rounded h-32' required></textarea>
                        </div>

                        {isSent ? (
                            <p className="text-green-600 font-semibold mb-5">✅ Your message sent successfully</p>
                        ) : (
                            <button
                                type='submit'
                                className="flex items-center justify-center gap-2 py-2 px-3 rounded bg-black text-white hover:bg-[#ff823a] transition-transform duration-200 mt-3 mb-5"
                            >
                                <i className="ri-send-plane-line"></i>
                                Send
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default Contact;
