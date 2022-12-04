import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { category } from "../Utils/data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config.js";
import { saveItem } from "../Utils/firebaseFunctions";
import LoadingBar from "react-top-loading-bar";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/Reducer";
import { getAllFoodItems } from "../Utils/firebaseFunctions";

const CreateContainer = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const [imageAsset, setImageAsset] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMsg, setAlertMsg] = useState(null);
  const [fields, setFields] = useState(false);
  const [Item, setItem] = useState({
    title: "",
    calories: "",
    price: "",
    category: "Select Category",
  });
  const uploadImage = (e) => {
    setLoading(true);
    const imgFile = e.target.files[0];
    const storeageRef = ref(storage, `Images/${Date.now()}-${imgFile.name}`);
    const uploadTask = uploadBytesResumable(storeageRef, imgFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        // A full list of error codes is available at
        console.log(error);
        setFields(true);
        setAlertStatus("danger");
        setAlertMsg("Error while uploading: Try Again !⛔️ ");
        setTimeout(() => {
          setFields(false);
          setLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setLoading(false);
          setFields(true);
          setAlertStatus("success");
          setAlertMsg("image Uploaded Successfully! 🎉 ");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };
  const deleteImage = () => {
    setLoading(false);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setLoading(false);
      setFields(true);
      setAlertStatus("success");
      setAlertMsg("image Deleted Successfully! 🎉 ");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  const clearData = () => {
    // console.log("cleardata called");
    setItem({
      title: "",
      calories: "",
      price: "",
      category: "Select Category",
    });
    setImageAsset(null);
  };
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  const saveDetails = () => {
    setLoading(false);
    try {
      if (
        !Item.title ||
        !Item.calories ||
        !Item.price ||
        Item.category === "Select Category" ||
        !imageAsset
      ) {
        setFields(true);
        setAlertStatus("danger");
        setAlertMsg("Required fields can't be empty!⛔️ ");
        setTimeout(() => {
          setFields(false);
          setLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          name: `${Item.title}`,
          category: `${Item.category}`,
          calories: `${Item.calories}`,
          price: `${Item.price}`,
          imgSrc: `${imageAsset}`,
          qty: 1,
        };

        saveItem(data);
        setFields(true);
        setAlertStatus("success");
        setAlertMsg("Data Uploaded Successfully! 🎉 ");
        clearData();
        setTimeout(() => {
          setFields(false);
          setLoading(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setAlertStatus("danger");
      setAlertMsg("Error while uploading: Try Again !⛔️ ");
      setTimeout(() => {
        setFields(false);
        setLoading(false);
      }, 4000);
    }
    fetchData();
  };

  return (
    <div className="w-full min-h-screen  flex items-center justify-center">
      <LoadingBar height={5} color="#50C878" progress={progress} />
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold  ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {alertMsg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={Item.title}
            placeholder="Give me a title..."
            name="title"
            className="w-full h-full text-lg bg-transparent focus:outline-none placeholder:text-gray-400 text-textColor"
            onChange={(e) => {
              setItem({ ...Item, [e.target.name]: [e.target.value] });
              // console.log(Item)
            }}
          />
        </div>
        <div className="w-full">
          <select
            className="outline-none text-base w-full border-b-2 border-gray-200 p-2 rounded-lg cursor-pointer"
            name="category"
            onChange={(e) => {
              setItem({ ...Item, [e.target.name]: [e.target.value] });
            }}
          >
            <option value="Select Category" className="bg-white">
              Select Category
            </option>
            {category &&
              category.map((item) => {
                return (
                  <option
                    key={item.id}
                    value={item.urlParamName}
                    className="text-base outline-none capitalize border-0"
                  >
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="group flex items-center justify-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 rounded-lg cursor-pointer ">
          {loading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="h-full relative">
                    <img
                      src={imageAsset}
                      alt="uploadedImage"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-2xl text-gray-700 " />
            <input
              type="text"
              required
              value={Item.calories}
              name="calories"
              onChange={(e) => {
                setItem({ ...Item, [e.target.name]: [e.target.value] });
              }}
              placeholder="Caloties"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor "
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-2xl text-gray-700 " />
            <input
              type="text"
              required
              value={Item.price}
              name="price"
              onChange={(e) => {
                setItem({ ...Item, [e.target.name]: [e.target.value] });
              }}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div className="flec items-center w-full">
          <button
            type="button"
            className="w-full border-none outline-none bg-gradient-to-br from-emerald-400 bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold hover:shadow-lg duration-300"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
