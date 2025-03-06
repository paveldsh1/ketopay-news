import { format } from "date-fns";
import NewsItem from "./NewsItem";

const NewsList = ({ news, visibleNewsCount }: { news: any[]; visibleNewsCount: number }) => (
    <div className="container__news news">
        {Object.entries(
            news.slice(0, visibleNewsCount).reduce((acc: Record<string, any[]>, item) => {
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

export default NewsList;