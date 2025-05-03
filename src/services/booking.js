import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_API_URL;

export const addBooking = async (newBooking) => {
  try {
    const param = {
      url: `${apiUrl}/api/v1/bookings`,
      data: newBooking,
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await axios.request(param);

    return response.data;
  } catch (exception) {
    console.error(exception);
  }
};
