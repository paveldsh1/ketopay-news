import { render, screen, waitFor } from "@testing-library/react";
import { configureStore } from '@reduxjs/toolkit'; 
import newsReducer, { fetchNews } from '../newsSlice';
import { NewsArticle, NewsState } from '../types/news';
import { Provider } from "react-redux";
import NewsList from "../NewsList";
import '@testing-library/jest-dom';

const initialState: NewsState = {
    news: [
        { _id: '1', pub_date: '2025-03-07T10:00:00Z', source: 'The Guardian', web_url: 'https://example.com', abstract: 'Test news 1', multimedia: [] }
    ],
    loading: false,
    error: null,
    currentYear: 2025,
    currentMonth: 3,
    isMonthChanged: false,
    visibleNewsCount: 1
};

let store = configureStore({
    reducer: {
        news: newsReducer,
    },
    preloadedState: {
        news: initialState,
    },
});

describe('newsSlice async actions', () => {

    jest.setTimeout(20000);

    it('should initialize store with preloadedState', () => {
        const { news, loading, visibleNewsCount } = store.getState().news;

        expect(loading).toBe(false);
        expect(news.length).toBe(1);
        expect(visibleNewsCount).toBe(1);
    });

    it('should handle fetchNews.fulfilled with new articles', async () => {
        const newArticles: NewsArticle[] = [
            { _id: '1', pub_date: '2025-03-07T09:30:00Z', source: 'Reuters', web_url: 'https://example.com', abstract: 'Test news 2', multimedia: [] },
            { _id: '2', pub_date: '2025-03-07T10:00:00Z', source: 'The Guardian', web_url: 'https://example.com', abstract: 'Test news 1', multimedia: [] }
        ];

        store.dispatch(fetchNews.fulfilled(newArticles, 'test', { year: 2025, month: 3 }));

        const { news, visibleNewsCount } = store.getState().news;

        expect(news.length).toBe(2);
        expect(visibleNewsCount).toBe(2);

        render(
            <Provider store={store}>
                <NewsList news={store.getState().news.news} />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Test news 2')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Test news 1')).toBeInTheDocument();
        });
    });
});
