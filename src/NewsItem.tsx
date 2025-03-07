import { format } from "date-fns";
import imgPlaceholder from "./images/placeholder.jpeg";

const NewsItem = ({ item }: { item: any }) => {
    // console.log('NewsItem component rendered');
    return (
        <div className="news__news-item news-item">
            <img
                src={item.multimedia?.[0]?.url ? `https://www.nytimes.com/${item.multimedia[0].url}` : imgPlaceholder}
                alt="news"
                className="news-item__image"
            />
            <div className="news-item__content">
                <a className="news-item__source" href={item.web_url} target="_blank" rel="noopener noreferrer">
                    {item.source}
                </a>
                <p className="news-item__title">{item.abstract}</p>
                <p className="news-item__date">{format(new Date(item.pub_date), "MMM dd, yyyy, hh.mm a")}</p>
            </div>
        </div>
    )
};

export default NewsItem;