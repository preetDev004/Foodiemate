import React, { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config.js";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/Reducer";
import { useLocation } from "react-router-dom";


const Header = () => {
  
const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow , cartItems }, dispatch] = useStateValue();
  const [isMenu, setisMenu] = useState(false);
  const location = useLocation();

  const login = async () => {
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
      // console.log(refreshToken)
    } else {
      setisMenu(!isMenu);
    }
  };
  const logout = () => {
    setisMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  const showCart = () => {
    setisMenu(false);
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  return (
    <header className="fixed z-30 w-screen bg-primary p-3 px-4 md:p-6 md:px-16">
      {/* -------------------------desktop & tablet screen-------------------------------  */}
      <div className="hidden md:flex w-full items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img className="w-8 object-cover " src={Logo} alt="Logo" />
          <p className="text-headingColor text-xl font-bold">FoodieMate</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: 200 }}
            className="flex items-center gap-8"
          >
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => {
                setisMenu(false);
              }}
            >
              Home
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => {
                setisMenu(false);
              }}
            >
              Menu
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => {
                setisMenu(false);
              }}
            >
              About Us
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => {
                setisMenu(false);
              }}
            >
              Services
            </li>
          </motion.ul>
          <motion.div
            whileTap={{ scale: 0.5 }}
            className="relative flex items-center justify-center cursor-pointer"
          >
            <button className="w-6 h-9" onClick={showCart}>
              <MdShoppingBasket className="text-textColor text-2xl cursor-poiner" />
              {cartItems && cartItems.length>0 && <div className="absolute -top-1 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">{cartItems.length}</p>
              </div>}
            </button>
          </motion.div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt="userProfile"
              className="w-10 min-w-[40px] min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 "
              >
                {user &&
                  user.email === process.env.REACT_APP_EMAIL &&
                  location.pathname !== "/cre@teItem" && (
                    <Link to="/cre@teItem">
                      <p
                        onClick={() => {
                          setisMenu(false);
                        }}
                        className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      >
                        New Item <MdAdd />
                      </p>
                    </Link>
                  )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Log Out <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* -----------------------mobile screen-------------------------- */}
      <div className="flex md:hidden items-center justify-between w-full">
        <div className="relative">
          <button ><motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            alt="userProfile"
            className="w-10 min-w-[40px] min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer"
            onClick={login}
          /></button>
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 left-0 "
            >
              {user &&
                user.email === process.env.REACT_APP_EMAIL &&
                location.pathname !== "/cre@teItem" && (
                  <Link to="/cre@teItem">
                    <p
                      onClick={() => {
                        setisMenu(false);
                      }}
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
              <ul className="flex flex-col">
                <li
                  className="px-4 py-2 text-base text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer"
                  onClick={() => {
                    setisMenu(false);
                  }}
                >
                  Home
                </li>
                <li
                  className="px-4 py-2 text-base text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer"
                  onClick={() => {
                    setisMenu(false);
                  }}
                >
                  Menu
                </li>
                <li
                  className="px-4 py-2 text-base text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer"
                  onClick={() => {
                    setisMenu(false);
                  }}
                >
                  About Us
                </li>
                <li
                  className="px-4 py-2 text-base text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer"
                  onClick={() => {
                    setisMenu(false);
                  }}
                >
                  Services
                </li>
              </ul>
              <p
                className="m-2  p-2 rounded-lg shadow-md px-4 py-2 flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Log Out <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img className="w-8 object-cover " src={Logo} alt="Logo" />
          <p className="text-headingColor text-xl font-bold">FoodieMate</p>
        </Link>
        <motion.div
          whileTap={{ scale: 0.5 }}
          className="relative flex items-center justify-center cursor-pointer"
        >
          <button>
            <div  className="w-7 h-9 flex items-center justify-center">
              <MdShoppingBasket
              onClick={showCart}
              className="text-textColor text-2xl cursor-poiner"
            />
            {cartItems && cartItems.length>0 && <div className="absolute -top-1 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">{cartItems.length}</p>
              </div>}</div>
          </button>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
