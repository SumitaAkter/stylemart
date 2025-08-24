import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    toast.error("Item removed from wishlist");
  };

  const moveToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((c) => c.id === item.id);

    if (!exists) {
      cart.push({ ...item, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Item moved to cart");
      removeFromWishlist(item.id);
      window.dispatchEvent(new Event("cartUpdated"));
    } else {
      toast.info("Item already in cart");
    }
  };

  return (
    <div className="lg:py-[3%] lg:px-[12%] py-[10px] my-2">
      <h2 className="mt-16 text-center text-4xl mb-4 font-bold">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="text-center">
          <p className="lead mb-4">Your Wishlist is empty</p>
          <Link to="/" className="btn py-2 px-3 rounded">Back to Shop</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl p-4 transform transition duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
            
              <img
                src={item.image}
                alt={item.productname}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />

              <h5 className="mb-2 font-bold">{item.productname}</h5>
              <p className="text-lg font-bold mb-3 text-[#ff823a]">
                {item.price}
              </p>

              
              <div className="flex justify-between gap-2 mt-4">
                <button
                  className="flex items-center justify-center gap-2 w-1/2 py-2 px-3 rounded bg-black text-white hover:bg-gray-700 transition"
                  onClick={() => moveToCart(item)}
                >
                  <i className="fa fa-cart-plus"></i> Move to Cart
                </button>
                <button
                  className="flex items-center justify-center gap-2 w-1/2 py-2 px-3 rounded bg-red-500 text-white hover:bg-red-600 transition"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <i className="fa fa-trash"></i> Remove
                </button>
              </div>
            </div>
          ))}
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
  );
};

export default Wishlist;
