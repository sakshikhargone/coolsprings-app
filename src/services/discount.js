import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_API_URL;

export const getDiscountValue = async (disCode) => {
  try{
    const detail = {
      url: `${apiUrl}/api/v1/discounts?discountCode=${disCode}`,
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await axios.request(detail);
  
    return response.data;
  }
  catch(exception){
    console.error(exception);
  }
};
