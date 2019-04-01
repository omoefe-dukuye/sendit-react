import { toast } from "react-toastify";
import axios from "../../utils/axiosConfig";
import { ADD_ORDER } from "./types";

const api = process.env.API_ROOT_URL;

export const createOrder = (payload) => async (dispatch) => {
  try {
    const { data: { parcel } } = await axios.post(`${api}/parcels`, payload);

    dispatch({
      type: ADD_ORDER,
      payload: parcel
    });

    return parcel;
  } catch ({ response: { data: { error } } }) {
   toast.error(error);
  }
}

export default createOrder;
