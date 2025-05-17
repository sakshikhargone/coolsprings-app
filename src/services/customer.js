import axios from "axios";

const apiUrl = process.env.REACT_APP_BASE_API_URL;

export const getCustomer = async (phoneNo) => {
  try {
    const detail = {
      url: `${apiUrl}/api/v1/customers/${phoneNo}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(detail);
    return response.data;
  } catch (exception) {
    console.error(exception);
  }
};

export const getBookings = async (customerId) => {
  try {
    const detail = {
      url: `${apiUrl}/api/v1/customers/bookings/${customerId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: sessionStorage.getItem("token"),
      },
    };
    const response = await axios.request(detail);
    return response.data;
  } catch (exception) {
    console.error("error");
  }
};

export const login = async (loginCredentials) => {
  try {
    const req = {
      url: `${apiUrl}/api/v1/customers/login`,
      method: "POST",
      data: loginCredentials,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(req);
    return response.data;
  } catch (exception) {
    return {
      token: null,
    };
  }
};

export const signUp = async (loginCredentials) => {
  try {
    const param = {
      url: "http://localhost:33533/api/v1/customers",
      data: loginCredentials,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(param);
    return response.data;
  } catch (exception) {
    console.error(exception);
  }
};
