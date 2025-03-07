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

export const fetchNews = createAsyncThunk<
  NewsArticle[],
  { year: number; month: number },
  { rejectValue: { error: string } }
>(
  "news/fetchNews",
  async ({ year, month }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/news`, {
        params: { year, month },
      });
      return response.data.reverse();
    } catch (error: any) {
      // console.error("Error fetching news:", error);

      if (error.code === "ERR_NETWORK") {
        return rejectWithValue({ error: "Network error: Unable to reach the server." });
      }

      if (error.response) {
        const status = error.response.status;
        const statusText = error.response.statusText;
        
        if (status === 429) {
          return rejectWithValue({ error: "Too many requests. Please try again later." });
        }
        
        return rejectWithValue({
          error: `Server error: ${status} ${statusText}`,
        });
      }

      return rejectWithValue({ error: error.message || "An unexpected error occurred." });
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
        state.error = action.payload?.error || "Error when uploading";
      });
  },
});

export default newsSlice.reducer;
