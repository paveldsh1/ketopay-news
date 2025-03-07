import { useEffect, useState, memo } from "react";
import { format } from "date-fns";
import NewsItem from "./NewsItem";
import { useAppDispatch } from "./hooks";

const NewsList = memo(({ news, visibleNewsCount }: { news: any[]; visibleNewsCount: number }) => {
    const [displayedNewsCount, setDisplayedNewsCount] = useState(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (visibleNewsCount === 5) {
            setDisplayedNewsCount((prev) => prev + 5);
        }
        else {
            const timeout = setTimeout(() => {
                setDisplayedNewsCount((prev) => prev + 5);
                dispatch({ type: 'news/setLoading', payload: false });
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [visibleNewsCount]);

    return (
        <div className="container__news news">
            {Object.entries(
                news.slice(0, displayedNewsCount).reduce((acc: Record<string, any[]>, item) => {
                    const dateKey = format(new Date(item.pub_date), "dd.MM.yyyy");
                    acc[dateKey] = acc[dateKey] || [];
                    acc[dateKey].push(item);
                    return acc;
                }, {})
            ).map(([date, articles]) => (
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
