export const fetchUser = ()=>{
    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')):localStorage.clear()
    return userInfo;
}
export const fetchItems = ()=>{
    const cartItems = localStorage.getItem('cartItems') !== undefined ? JSON.parse(localStorage.getItem('cartItems')) :[]
    return cartItems ? cartItems : []
}