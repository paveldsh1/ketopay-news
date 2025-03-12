import { render, screen, waitFor, act } from "@testing-library/react"; 
import NewsList from "../NewsList";
import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../newsSlice";
import "@testing-library/jest-dom";
import { Provider } from "react-redux"; 
import { fetchNews } from "../newsSlice";
import { NewsArticle } from "../types/news";

const mockNewsData: NewsArticle[] = [
    {
        _id: '3',
        pub_date: '2025-03-06T10:00:00Z',
        source: 'The New York Times',
        web_url: 'https://www.nytimes.com/2025/03/06/technology/tech-news.html',
        abstract: 'Tech Industry is Growing Faster than Expected in 2025',
        multimedia: [
            {
                url: '/images/tech-news-2025.jpg',
            },
        ],
    },
    {
        _id: '4',
        pub_date: '2025-03-06T09:30:00Z',
        source: 'BBC News',
        web_url: 'https://www.bbc.com/news/2025/03/06/entertainment/movies.html',
        abstract: 'Oscars 2025: What We Can Expect from the Big Night',
        multimedia: [
            {
                url: '/images/oscars-2025.jpg',
            },
        ],
    },
];

const newNewsData: NewsArticle[] = [
    {
        _id: '1',
        pub_date: '2025-03-07T10:00:00Z',
        source: 'The Guardian',
        web_url: 'https://www.theguardian.com/2025/03/07/news/world-news',
        abstract: 'New World Event Shakes the Political Landscape',
        multimedia: [
            {
                url: '/images/world-event.jpg',
            },
        ],
    },
    {
        _id: '2',
        pub_date: '2025-03-07T09:30:00Z',
        source: 'Reuters',
        web_url: 'https://www.reuters.com/2025/03/07/world-economy.html',
        abstract: 'Global Economy: What You Need to Know for 2025',
        multimedia: [
            {
                url: '/images/global-economy.jpg',
            },
        ],
    },
];

describe('NewsList Component with State Updates', () => {
    jest.setTimeout(10000);  

    it('should add new news with a later date after an initial load', async () => {
        const store = configureStore({
            reducer: { news: newsReducer },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({ serializableCheck: false }),
        });

    
        store.dispatch({ type: 'news/setNews', payload: mockNewsData });

        render(
            <Provider store={store}>
                <NewsList news={store.getState().news.news} />
            </Provider>
        );
        
        await waitFor(() => {
            expect(screen.getByText('Tech Industry is Growing Faster than Expected in 2025')).toBeInTheDocument();
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(screen.getByText('Oscars 2025: What We Can Expect from the Big Night')).toBeInTheDocument();
        });

        await act(async () => {
            store.dispatch({ type: 'news/setNews', payload: [...newNewsData, ...mockNewsData] });
        });

        render(
            <Provider store={store}>
                <NewsList news={store.getState().news.news} />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('New World Event Shakes the Political Landscape')).toBeInTheDocument();
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(screen.getByText('Global Economy: What You Need to Know for 2025')).toBeInTheDocument();
        });

        const displayedNews = screen.getAllByText(/What/);
        console.log("displayedNews", displayedNews)
        debugger

        expect(displayedNews).toHaveLength(mockNewsData.length + newNewsData.length); // Ожидаем, что новости увеличились на количество новых данных
    });
});
