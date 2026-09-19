//get all properties
//1. start api req
//2. tell redux loading started
//3. get search parameters
//4. call backend api
//5. wait for response
//6. get property data
//7. send data to redux store
//8. if error => send error to redux

//dispatch => send to redux
// getState => get from redux

import { propertyAction } from "./property-slice";
import { axiosInstance } from "../../utils/axios";

export const getAllProperties = () => async (dispatch, getState) => {
    try {
        console.log("API call started");

        dispatch(propertyAction.getRequest());

        const { searchParams } = getState().properties;

        console.log("Search Params:", searchParams);

        const response = await axiosInstance.get(`/v1/rent/listing`, {
            params: { ...searchParams }
        });

        if (!response || !response.data) {
            throw new Error("Could not fetch any properties");
        }

        console.log("API Response:", response.data);

        const { data } = response;

        dispatch(propertyAction.getProperties(data));

    } catch (error) {
        console.error("Property API Error:", error);
        dispatch(propertyAction.getErrors(error.message));
    }
};