import React, { useState , useEffect } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import Loader from "./Loader";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/Reducer";

const RowData = ({ flag, data }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [items, setItems] = useState(cartItems)
  // console.log(data)
  const addToCart =() => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };
  useEffect(() => {
    addToCart()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])
  
  return (
    <div
      id="scroll-container"
      className={`w-full my-12 bottom-0 flex items-center gap-4 bg-rowBg scroll-smooth scrollbar-none ${
        flag
          ? "overflow-x-scroll"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data ? (
        data.map((dataItem) => {
          return (
            <div
              key={dataItem?.id}
              className="w-275 min-w-[275px] md:w-300 md:min-w-[340px] my-12 lg:my-8 p-2 bg-card rounded-lg h-auto shadow-md backdrop-blur-lg hover:drop-shadow-lg"
            >
              <div className="w-full flex items-center justify-between">
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  src={dataItem?.imgSrc}
                  alt={dataItem?.name}
                  className="w-40 h-40 -mt-9 drop-shadow-2xl object-contain"
                />
                <button className="mb-auto">
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    className="w-8 h-8   rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                  >
                    <MdShoppingBasket
                      className="text-white md:text-lg "
                      onClick={() => setItems([...cartItems, dataItem])}
                    />
                  </motion.div>
                </button>
              </div>
              <div className="w-full flex flex-col items-end justify-end">
                <p className="text-textColor font-semibold text-base md:text-lg">
                  {dataItem?.name}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {dataItem?.calories} Calories
                </p>
                <div className="flex items-start gap-8">
                  <p className="text-lg text-headingColor font-semibold">
                    <span className="text-sm text-red-500">$</span>{" "}
                    {dataItem?.price}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex items-center justify-center w-full h-[200px]">
          {" "}
          <Loader color={"orange"} />
        </div>
      )}
    </div>
  );
};

export default RowData;
