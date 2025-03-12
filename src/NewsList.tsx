import { memo, useEffect, useState, useMemo } from "react";
import { format } from "date-fns";
import NewsItem from "./NewsItem";
import { NewsArticle } from "./types/news";
import { useSelector } from "react-redux";
import { RootState } from "./store";

interface NewsListProps {
    news: NewsArticle[];
}

const NewsList: React.FC<NewsListProps> = memo(({ news }) => {
    const { visibleNewsCount } = useSelector((state: RootState) => state.news);
    const [delayedCount, setDelayedCount] = useState(visibleNewsCount);

    console.log("delayedCount", delayedCount)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelayedCount(visibleNewsCount);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [visibleNewsCount]);

    const groupedNews = useMemo(() => {
        return news.slice(0, delayedCount).reduce<Record<string, NewsArticle[]>>((acc, item) => {
            const dateKey = format(new Date(item.pub_date), "dd.MM.yyyy");
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(item);
            return acc;
        }, {});
    }, [news, delayedCount]);

    return (
        <div className="container__news news">
            {Object.entries(groupedNews).map(([date, articles]) => (
                <div key={date} className="news__news-group">
                    <p className="news__date">News for {date}</p>
                    {articles.map((item) => (
                        <NewsItem key={item._id || item.web_url} item={item} />
                    ))}
                </div>
            ))}
        </div>
    );
});

export default NewsList;
