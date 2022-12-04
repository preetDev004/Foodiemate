import { fetchItems, fetchUser } from "../Utils/fetchLocalStorageData"

const userInfo = fetchUser()
const userItems = fetchItems()

export const initialState = {
    user : userInfo,
    foodItems : null,
    cartShow : false,
    cartItems:userItems 
}