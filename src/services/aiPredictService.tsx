import axios from "axios";

const API_URL = "http://127.0.0.1:5000/predict_home_price";
const API_URL2 = "http://127.0.0.1:5000/get_location_names";

interface PredictHomePricePayload {
  total_sqft: number;
  location: string;
  bhk: number;
  bath: number;
}

interface PredictHomePriceResponse {
  estimated_price: number;
}

export const predict_home_price = async (
  payload: PredictHomePricePayload
): Promise<PredictHomePriceResponse> => {
  try {
    const formData = new FormData();
    formData.append("total_sqft", payload.total_sqft.toString());
    formData.append("location", payload.location);
    formData.append("bhk", payload.bhk.toString());
    formData.append("bath", payload.bath.toString());

    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error predicting home price:", error);
    throw new Error("Failed to fetch predicted home price");
  }
};

export const get_location_names = async (): Promise<string[]> => {
    const response = await axios.get(`${API_URL2}`);
    return response.data.locations;
};