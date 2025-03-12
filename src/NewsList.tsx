import { useEffect, useState, memo, useMemo } from "react";
import { format } from "date-fns";
import NewsItem from "./NewsItem";

interface NewsListProps {
    news: any[];
    visibleNewsCount: number;
}

const NewsList = memo(({ news, visibleNewsCount }: NewsListProps) => {
    const [delayedCount, setDelayedCount] = useState(visibleNewsCount);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelayedCount(visibleNewsCount);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [visibleNewsCount]); 

    const groupedNews = useMemo(() => {
        return news.slice(0, delayedCount).reduce<Record<string, any[]>>((acc, item) => {
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
