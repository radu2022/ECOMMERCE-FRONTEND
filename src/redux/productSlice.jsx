import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products: [],
}

const productSlice = createSlice ({
    name: 'products',
    initialState,
    reducers : {
        // implement our logic to do the action
        setProducts(state, action) {
            state.products = action.payload
        }
    },
    // fetchdata async tank reducer we can
})

export const {setProducts} = productSlice.actions;
export default productSlice.reducer
