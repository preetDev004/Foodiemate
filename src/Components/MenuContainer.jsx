import React, { useState } from "react";
import { CgIcecream } from "react-icons/cg";
import { GiChickenOven , GiBowlOfRice , GiBubblingBowl , GiFruitBowl , GiFishCorpse } from 'react-icons/gi'
import { BiDrink } from 'react-icons/bi'
import { category } from "../Utils/data.js";
import { motion } from 'framer-motion';
import RowData from "./RowData.jsx";
import { useStateValue } from "../Context/StateProvider.js";

const MenuContainer = () => {
  const [filter, setFilter] = useState("icecreams");
  const [{foodItems}]=useStateValue()
  return (
    <section id="menu" className="w-full -mt-10">
      <div className="w-full flex flex-col items-center justify-center">
        <p
          className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-xl before:content before:w-16 before:h-1 before:-bottom-3 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
          transition-all ease-in-out duration-100 mr-auto"
        >
          Our Hot Dishes
        </p>
        <div className="mt-8 w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scroll-smooth scrollbar-none">
          {category?.map((item) => {
            return (
              <motion.div whileTap={{scale:0.75}} key={item.id} onClick={()=>{setFilter(item.urlParamName)}} className={`group ${filter === item.urlParamName?'bg-orange-600':'bg-card'} w-24 min-w-[94px] h-28 cursor-pointer drop-shadow-xl rounded-lg flex flex-col items-center justify-center gap-3 hover:bg-orange-600`}>
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${filter===item.urlParamName?'bg-white':'bg-orange-600'}  group-hover:bg-white shadow-lg`}>
                  {
                    item.urlParamName ==='icecreams'?<CgIcecream className={`${filter === item.urlParamName ?'text-textColor':'text-card'} group-hover:text-textColor text-lg`} />:<></>
                  }
                  {
                    item.urlParamName ==='chicken'?<GiChickenOven className={`${filter === item.urlParamName ?'text-textColor':'text-card'} group-hover:text-textColor text-lg`} />:<></>
                  }
                  {
                    item.urlParamName ==='fish'?<GiFishCorpse className={`${filter === item.urlParamName ?'text-textColor':'text-card'} group-hover:text-textColor text-lg`} />:<></>
                  }
                  {
                    item.urlParamName ==='fruits'?<GiFruitBowl className={`${filter === item.urlParamName ?'text-textColor':'text-card'} group-hover:text-textColor text-lg`} />:<></>
                  }
                  {
                    item.urlParamName ==='rice'?<GiBowlOfRice className={`${filter === item.urlParamName ?'text-textColor':'text-card'} group-hover:text-textColor text-lg`} />:<></>
                  }
                  {
                    item.urlParamName ==='curry'?<GiBubblingBowl className={`${filter === item.urlParamName ?'text-textColor':'text-card'} group-hover:text-textColor text-lg`} />:<></>
                  }
                  {
                    item.urlParamName ==='drinks'?<BiDrink className={`${filter === item.urlParamName ?'text-textColor':'text-card'} group-hover:text-textColor text-lg`} />:<></>
                  }
                  
                </div>
                <p className={`text-sm ${filter === item.urlParamName ? 'text-white':'text-textColor'} group-hover:text-white capitalize`}>
                  {item.urlParamName}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="w-full">
        <RowData flag={false} data={foodItems?.filter((item)=>{return item.category === filter})}/>
      </div>
    </section>
  );
};

export default MenuContainer;
 