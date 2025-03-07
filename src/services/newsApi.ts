import axios from "axios";

const newsApi = axios.create({
  baseURL: "http://localhost:4000",
});

export const fetchNewsFromApi = (year: number, month: number) => {
  return newsApi.get("/news", {
    params: { year, month },
  });
};