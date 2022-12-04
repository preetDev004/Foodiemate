import React, { useState , useEffect } from "react";
import { motion } from "framer-motion";
import { GrClose } from "react-icons/gr";
import { FiRefreshCw } from "react-icons/fi";

import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/Reducer";
import empty from "./empty.svg";
import CartItem from "./CartItem";

const Cart = () => {
  const [{ user , cartShow, cartItems }, dispatch] = useStateValue();
  const [tot, setTot] = useState(0)
  const [flag, setFlag] = useState(0)
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  useEffect(()=>{
    let totalPrice = cartItems.reduce(function (accumulator, item){
        return accumulator + item.qty*item.price
    },0)
    setTot(totalPrice)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[tot, flag])


  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          dispatch({ type: actionType.SET_CART_SHOW, cartShow: false });
        }}
        className="w-full h-screen top-0 z-40 fixed bg-black/50 "
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className="w-full md:w-375 fixed z-[101] bg-white drop-shadow-md flex flex-col top-0 right-0 h-screen"
      >
        <div className="w-full flex items-center justify-between p-4 cursor-pointer">
          <motion.div whileTap={{ scale: 0.75 }}>
            <GrClose onClick={showCart} className="text-textColor text-2xl" />
          </motion.div>
          <p className="text-textColor text-lg font-semibold"> Cart</p>
          {cartItems && cartItems.length > 0 ? (
            <motion.p 
            onClick={() => {
              dispatch({ type: actionType.SET_CART_ITEMS, cartItems: [] });
            }}
              whileTap={{ scale: 0.75 }}
              className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:dhadow-md cursor-pointer text-textColor text-base
          "
            >
              {" "}
              Clear <FiRefreshCw size={20} />{" "}
            </motion.p>
          ) : (
            <></>
          )}
        </div>
        {/* Bottom section */}
        {cartItems && cartItems.length > 0 ? (
          <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
            {/* cart items section */}
            <div className="w-full h-340 md:h-86 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
              {/* cart item */}
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map((item) => {
                    return(
                        <CartItem key={item.id} item={item} setFlag={setFlag}/>
                    )
                })}
            </div>
            {/* cart total section */}
            <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col tems-center justify-evenly px-8 py-2">
              <div className="w-full flex items-center justify-between flex-col">
                <div className="w-full flex items-center justify-between py-2">
                  <p className="text-gray-50 text-lg ">Sub Total</p>
                  <p className="text-gray-50 text-lg ">${(tot).toFixed(2)}</p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-gray-50 text-lg ">Delivery</p>
                  <p className="text-gray-50 text-lg ">$2.5</p>
                </div>
              </div>
              <div className="w-full border-b border-gray-600 py-2">
                <div className="w-full flex items-center justify-between my-2">
                  <p className="text-gray-200 font-semibold text-xl">Total</p>
                  <p className="text-gray-200 font-semibold text-xl">${(tot+2.5).toFixed(2)}</p>
                </div>
              </div>
              {user ?<motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 bg-gradient-to-tl from-orange-400 to-orange-600 rounded-full text-gray-50 text-lg hover:drop-shadow-lg"
              >
                Check Out
              </motion.button>:<motion.button
              onClick={showCart}
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 bg-gradient-to-tl from-orange-400 to-orange-600 rounded-full text-gray-50 text-lg hover:drop-shadow-lg"
              >
                Log In To Buy
              </motion.button>}
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-cartBg flex rounded-t-[2rem] flex-col items-center justify-center gap-6">
            <img src={empty} className='w-300 h-300 bg-orange-500 rounded-full object-contain' alt="Cart is empty" />
            <p className="text-gray-50 text-xl font-semibold">Add Some Items To Your Cart</p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Cart;
