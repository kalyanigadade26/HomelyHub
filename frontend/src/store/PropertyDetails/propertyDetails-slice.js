//propertyDetails

// create a slice name
// create initial State 
// request starts 
// property data receieved 
// error action 
// export slice

import { createSlice } from "@reduxjs/toolkit";

const propertyDetailsSlice = createSlice({
    name: "propertyDetails",

    initialState: {
        propertydetails: null,
        loading: false,
        error: null
    },

    reducers: {
        getRequest(state) {
            state.loading = true;
        },

        getPropertyDetails(state, action) {
            state.propertydetails = action.payload;
            state.loading = false;
        },

        getErrors(state, action) {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const propertyDetailsAction = propertyDetailsSlice.actions;
export default propertyDetailsSlice;