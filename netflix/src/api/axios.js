import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
      api_key: "adb01f6c1b0929b51b4cb6942788b2fb",
      language: "ko-KR",
  },
});

export default instance;