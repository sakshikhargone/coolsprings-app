import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_API_URL;
export const addFile = async (profileData) => {
  try {
    const param = {
      url: `${apiUrl}/api/v1/files`,
      data: profileData,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const resposne = await axios.request(param);
    return resposne.data;
  } catch (exception) {
    console.error(exception);
  }
};

export const getFile = async (phoneNo) => {
  try {
    const detail = {
      url: `${apiUrl}/api/v1/files`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        phoneNo: phoneNo,
      },
    };
    const response = await axios.request(detail);
    return response.data;
  } catch (exception) {
    console.error(exception);
  }
};
