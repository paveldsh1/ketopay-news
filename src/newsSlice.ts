// slice/newsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewsFromApi } from "./services/newsApi";
import { NewsArticle, NewsState } from "./types/news";

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
      const response = await fetchNewsFromApi(year, month);
      return response.data.reverse();
    } catch (error: any) {
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
