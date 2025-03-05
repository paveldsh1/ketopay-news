import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "vEJwp3nmtqMIO6FDqQwyQdjbTzJcbdAh";

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

export const fetchNews = createAsyncThunk<NewsArticle[], { year: number; month: number }>(
  "news/fetchNews",
  async ({ year, month }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`,
        {
          params: { "api-key": API_KEY },
        }
      );

      return response.data.response.docs;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка загрузки данных");
    }
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
