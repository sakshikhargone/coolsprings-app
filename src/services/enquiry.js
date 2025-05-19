import axios from "axios";

const apiUrl = process.env.REACT_APP_BASE_API_URL;
export const AddEnquiry = async (newEnquiry) => {
  try {
    const param = {
      url: `${apiUrl}/api/v1/enquiries`,
      method: "POST",
      data: newEnquiry,
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.request(param);
  } catch (exception) {
    console.error(exception);
  }
};
