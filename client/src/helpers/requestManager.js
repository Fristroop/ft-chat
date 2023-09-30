import axios from "axios";
axios.defaults.withCredentials = true;

export const API = import.meta.PROD
  ? "https://api.fristroop.com"
  : "http://localhost:3000";
console.log(API);

/**
 *
 * @param {string} endpoint
 * @param {string} method
 * @param {object} data
 * @returns {import("axios").AxiosResponse}
 */
export const request = async (endpoint = "/", method = "GET", data = {}) => {
  try {
    const res = await axios(`${API}${endpoint}`, {
      method,
      data,
    });

    res.ok = true;
    return res;
  } catch (error) {
    console.error(error);
    error.ok = false;
    return error;
  }
};
