import "./App.css";
import { Header, MainContainer, CreateContainer } from "./Components";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./Context/StateProvider";
import { getAllFoodItems } from "./Utils/firebaseFunctions";
import { useEffect } from "react";
import { actionType } from "./Context/Reducer";

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue()
  const fetchData = async()=>{
    await getAllFoodItems().then(data => {
      // console.log(data)
      dispatch({
        type :actionType.SET_FOOD_ITEMS,
        foodItems:data
      })
    }) 
  }
  useEffect(()=>{
    fetchData()
    // eslint-disable-next-line
  },[])
  return (
    <AnimatePresence mode='wait'>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/cre@teItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
