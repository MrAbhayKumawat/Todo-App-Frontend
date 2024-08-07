import axios from "axios";
import { BaseUrl } from "./Api";
import Cookies from "js-cookie";
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BaseUrl}/login`, credentials);

    if (response && response.data) {
        Cookies.set("token", response.data.token);
        localStorage.setItem("userdata", JSON.stringify(response.data.userdata));

      return response.data;
    } else {
      throw new Error("No response data received");
    }
  } catch (error) {

    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const register = async (credential) => {
  try {
    const response = await axios.post(`${BaseUrl}/register`, credential);

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("No response data received");
    }
  } catch (error) {
    throw error;
  }
};
