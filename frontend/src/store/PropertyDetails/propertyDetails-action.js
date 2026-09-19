
//fetch details of one specific property using its id
//recieve the property id  
//start loadinig
//call backend api
//wait for response
//get the property data
//store the details in redux
//if error store error in redux


import { axiosInstance } from "../../utils/axios";
import { propertyDetailsAction } from "./propertyDetails-slice";

export const getPropertyDetails = (id) => async (dispatch) => {
    try {
        dispatch(propertyDetailsAction.getRequest());

        const response = await axiosInstance.get(`/v1/rent/listing/${id}`);

        if (!response || !response.data) {
            throw new Error("Could not fetch property details");
        }

        dispatch(
            propertyDetailsAction.getPropertyDetails(response.data.data)
        );

    } catch (error) {
        dispatch(
            propertyDetailsAction.getErrors(
                error.response?.data?.message || error.message
            )
        );
    }
};
