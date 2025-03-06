import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface NewsArticle {
  pub_date: string;
  abstract: string;
  web_url: string;
  multimedia?: { url: string }[];
  source: string;
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
      return response.data;
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
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default newsSlice.reducer;
