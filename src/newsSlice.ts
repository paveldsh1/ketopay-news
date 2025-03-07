import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface NewsArticle {
  _id: string;
  pub_date: string;
  source: string;
  web_url: string;
  abstract: string;
  multimedia: {
    url: string;
  }[];
}

interface NewsState {
  news: NewsArticle[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  loading: false,
  error: null,
};

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ year, month }: { year: number; month: number }) => {
    const response = await axios.get(`http://localhost:4000/news`, {
      params: { year, month },
    });
    return response.data.reverse();
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchNews.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchNews.fulfilled, (state, action) => {
      state.loading = false;
      
      const freshNews = action.payload.filter(
        (article: NewsArticle) => !state.news.some((old) => old._id === article._id)
      );

      // console.log("fetchNews.fulfilled, freshNews:", freshNews)

      if (freshNews.length > 0) {
        state.news = [...freshNews, ...state.news];  
      }
    })
    .addCase(fetchNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default newsSlice.reducer;
