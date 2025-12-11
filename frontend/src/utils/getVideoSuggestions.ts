import axios from "axios";
import { Video } from "../types/video.types";

const getVideoSuggestions = async (query: string): Promise<Video[] | null> => {
  try {
    const response = await axios.get<Video[]>(
      import.meta.env.VITE_BASE_API_URL + "/videos/suggestions",
      {
        params: {
          q: query,
        },
      },
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

export default getVideoSuggestions;
