import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_API_URL;

export const getTicketDetail = async (bId) => {
  try {
    const detail = {
      url: `${apiUrl}/api/v1/tickets/${bId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(detail);
    return response.data;
  } catch (exception) {
    console.log(exception);
    return null;
  }
};
