import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from "../reducer/productReducer"
const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products"

const initialState={
    isLoading:false,
    isError:false,
    products:[],
    featureProducts:[],
} 

const AppProvider = ({children})=>{
   const [state, dispatch] = useReducer(reducer, initialState)
    const getProducts =async (url)=>{
        dispatch({tyoe:"SET_LOADING"})

try {
    const res = await axios(url);
    const products = await res.data;
    dispatch({type:"SET_API_DATA",payload:products})
} catch (error) {
    dispatch({tyoe:"API_ERROR"})
}
} 

useEffect(()=>{
    getProducts(API);
}, []);

return(
<AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
);

}

const useProductContext=()=>{
return useContext(AppContext);
}

export {AppProvider,AppContext,useProductContext};