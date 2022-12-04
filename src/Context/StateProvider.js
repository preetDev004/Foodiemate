import React, { createContext , useContext , useReducer  } from "react";

export const stateContext = createContext();

export const StateProvider = ({reducer, initialState , children})=>{

    // eslint-disable-next-line react-hooks/rules-of-hooks
   return( <stateContext.Provider value={useReducer(reducer , initialState)}>
        {children}
    </stateContext.Provider>)
}



export const useStateValue = () => useContext(stateContext)