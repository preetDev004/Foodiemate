import React, { useEffect, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/Reducer";

let items =[]

const CartItem = ({ item ,setFlag }) => {
  const [{ cartItems }, dispatch] = useStateValue();

  const cartDispatch = () => {
      localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };

  const [qty, setQty] = useState(item.qty);

  const updateQty = (action, id) => {
    if (action === "add") {
      setQty((prev) => prev + 1);
      // eslint-disable-next-line array-callback-return
      cartItems.map((food) => {
        if (food.id === id) {
          food.qty += 1;
          setFlag((prev)=>prev+1)
        }
      });
      cartDispatch()
    }else{
        if (qty === 1) {
            items = (cartItems.filter((item)=> item.id!==id))
            setFlag((prev)=>prev+1)
            cartDispatch()
        }else{
            setQty((prev)=>prev-1)
            // eslint-disable-next-line array-callback-return
            cartItems.map((food) => {
                if (food.id === id) {
                  food.qty -= 1;
                  setFlag((prev)=>prev+1)
                }
              });
              cartDispatch()
        }
    }
    
  };
  useEffect(() => {
    items = cartItems;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty , items]);
  return (
    <div className="p-4 w-full px-2 rounded-lg bg-cartItem flex items-center gap-2 ">
      <img
        className="w-20 h-10 object-contain max-w-[60px] rounded-full"
        src={item?.imgSrc}
        alt={item?.name}
      />
      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.name}</p>
        <p className="text-sm block font-semibold text-gray-300">
          ${parseFloat(item?.price * qty).toFixed(2)}
        </p>
      </div>
      {/* button section */}
      <div className="group flex items-center gap-3 ml-auto cursor-pointer">
        <motion.div
          onClick={() => {
            updateQty("remove", item?.id);
          }}
          className="text-gray-50"
          whileTap={{ scale: 0.75 }}
        >
          <BiMinus />
        </motion.div>
        <p className="bg-cartBg text-gray-50 w-5 h-5 rounded-sm flex items-center justify-center">
          {qty}
        </p>
        <motion.div
          onClick={() => {
            updateQty("add", item?.id);
          }}
          className="text-gray-50"
          whileTap={{ scale: 0.75 }}
        >
          <BiPlus />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
