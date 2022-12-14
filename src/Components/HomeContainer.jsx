import React from "react";
import Delivery from "../img/delivery.png";
import heroBg from "../img/heroBg.png";
import { heroData } from "../Utils/data";
 
const HomeContainer = () => {
  return (
    <section
      id="home"
      className="relative grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-evenly gap-6">
        <div className="flex items-center justify-center gap-2 bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 overflow-hidden rounded-full drop-shadow-xl">
            <img
              src={Delivery}
              alt="delivery"
              className="w-full h-full object-contain bg-white"
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          Fastest Delivery in{" "}
          <span className="text-[3rem] lg:text-[5rem] text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
            Your city
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem, ipsum dolor sit error ea labe, inventorere nesciunt sit rem
          similique ea totam architecto reiciendis placeat doloremque! Omnis
          culpa, facere perspiciatis optio vel illo possimus harum facilis
          doloribus. Commodi voluptates solutat iusto obcaecati commodi, voluptatibus quo voluptas culpa in odit quis dolore quisquam quaerat voluptatem consequuntur? Nemo modi officia corrupti fugiat.
        </p>
        <button
          type="button"
          onClick={()=>{window.scrollTo(0,1000)}}
          className="text-gray-50 bg-gradient-to-br from-orange-500  to-orange-400 hover:from-orange-400 hover:to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 md:w-auto"
        >
          Order Now
        </button>
      </div>
      <div id='herobg' className="relative py-2 flex-1 flex items-center">
        <img
          className="ml-auto h-420 w-full lg:w-auto lg:h-650"
          src={heroBg}
          alt="hero-bg"
        />
          
        <div  className="w-full h-full absolute lg:top-0 lg:left-5 flex gap-4 flex-wrap items-center justify-center py-4">
         
          {heroData && heroData.map((item) => {
            return (
              <div id='static-card' key={item.id} className="lg:w-190 p-4 bg-cardOverlay backdrop-blur-md flex flex-col  items-center justify-center rounded-3xl drop-shadow-lg">
                <img src={item.imgSrc} className="w-20 sm:w-[130px] lg:w-40 -mt-10 lg:-mt-20" alt="I1" />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {item.name}
                </p>
                <p className="text-[12px] lg:text-sm font-semibold text-lighttextGray my-1 lg:my-2">
                  {item.decp}
                </p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span> {item.price}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
