import React, { useEffect, useState } from "react"; 
import { useSelector } from "react-redux";
import { useAppDispatch } from "./hooks";
import { fetchNews } from "./newsSlice";
import { RootState } from "./store";
import { format } from "date-fns";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { news, loading, error } = useSelector((state: RootState) => state.news);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onBurgerButtonClick = () => setIsMenuOpen(true);
    const onCloseMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        dispatch(fetchNews({ year: currentDate.getFullYear(), month: currentDate.getMonth() + 1 }));
        const interval = setInterval(() => {
          dispatch(fetchNews({ year: currentDate.getFullYear(), month: currentDate.getMonth() + 1 }));
        }, 30000);
    
        return () => clearInterval(interval);
      }, [dispatch, currentDate]);

    if (isMenuOpen) {
        return (
            <div className="header__overlay">
                <button className="header__close-button" onClick={onCloseMenu}>&times;</button>
                <nav className="header__menu">
                    <ul className="header__menu-list">
                        <li className="header__menu-item"><a href="/" className="header__menu-link is-active">SCIENCE</a></li>
                        <li className="header__menu-item"><a href="/" className="header__menu-link">GENERAL</a></li>
                        <li className="header__menu-item"><a href="/" className="header__menu-link">ENTERTAINMENT</a></li>
                        <li className="header__menu-item"><a href="/" className="header__menu-link">TECHNOLOGY</a></li>
                        <li className="header__menu-item"><a href="/" className="header__menu-link">BUSINESS</a></li>
                        <li className="header__menu-item"><a href="/" className="header__menu-link">HEALTH</a></li>
                        <li className="header__menu-item"><a href="/" className="header__menu-link">SPORTS</a></li>
                    </ul>
                </nav>
            </div>
        );
    }

    return (
        <div className="container">
            <header className="container__header header">
                <button className="header__burger-button" type="button" title="Open menu" onClick={onBurgerButtonClick}>
                    <span className="burger-button__line"></span>
                    <span className="burger-button__line"></span>
                    <span className="burger-button__line"></span>
                </button>
                <div>BESIDER</div>
            </header>
            <hr className="container__line" />
            
            {error && <p style={{ color: "red", textAlign: "center" }}>Ошибка: {error}</p>}

            <div className="container__news news">
                {Object.entries(news.reduce((acc: Record<string, any[]>, item) => {
                    const dateKey = format(new Date(item.pub_date), "dd.MM.yyyy");
                    acc[dateKey] = acc[dateKey] || [];
                    acc[dateKey].push(item);
                    return acc;
                }, {})).map(([date, articles]) => (
                    <div key={date} className="news__news-group">
                        <p className="news__date">News for {date}</p>
                        {articles.map((item) => (
                            <div key={item._id || item.web_url} className="news__news-item news-item">
                                <img src={item.multimedia?.[0]?.url ? `https://www.nytimes.com/${item.multimedia[0].url}` : "placeholder.jpg"} alt="news" className="news-item__image" />
                                <div className="news-item__content">
                                    <a className="news-item__source" href={item.web_url} target="_blank">{item.source}</a>
                                    <p className="news-item__title">{item.abstract}</p>
                                    <p className="news-item__date">{format(new Date(item.pub_date), "MMM dd, yyyy, hh.mm a")}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )).reverse()}
            </div>

            
        </div>
    );
};

export default App;
