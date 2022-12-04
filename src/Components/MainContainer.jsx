import React from "react";
import HomeContainer from "./HomeContainer";
import { motion } from 'framer-motion'
import { AiOutlineRight , AiOutlineLeft } from 'react-icons/ai'
import RowData from "./RowData";
import { useStateValue } from "../Context/StateProvider";
import MenuContainer from "./MenuContainer";
import Cart from "./Cart";

const MainContainer = () => {
  const [{foodItems , cartShow}] = useStateValue()
  const move = (value)=>{
    const moveElement = document.getElementById('scroll-container')
    moveElement.scrollLeft+=value
    // console.log(moveElement.scrollLeft)
  }

  return (
    <div className="flex w-full h-auto flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-xl before:content before:w-32 before:h-1 before:-bottom-3 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
          transition-all ease-in-out duration-100">
            our fresh & healthy fruits
          </p>
        <div className="hidden md:flex items-center justify-end gap-3 ">
          <button className="p-1" onClick={()=>{move(-500)}}><motion.div whileTap={{scale:0.65}} className="w-8 h-8 rounded-lg cursor-pointer  bg-orange-300 hover:bg-orange-500 flex items-center hover:shadow-lg justify-center"><AiOutlineLeft size={20} className="text-white font-semibold" /></motion.div></button>
          <button className='p-1' onClick={()=>{move(+500)}}><motion.div whileTap={{scale:0.65}} className="w-8 h-8 rounded-lg cursor-pointer  bg-orange-300 hover:bg-orange-500 flex items-center hover:shadow-lg justify-center"><AiOutlineRight size={20} className="text-white font-semibold" /></motion.div></button>
        </div>
        </div>
      <RowData flag={true} data={foodItems?.filter((item)=>{return item.category ==='fruits'})}/>
      </section>
      <MenuContainer/>
     {cartShow && <Cart/>}
    </div>
  );
};

export default MainContainer;
