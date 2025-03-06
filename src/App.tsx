import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./hooks";
import { fetchNews } from "./newsSlice";
import { RootState } from "./store";
import { format } from "date-fns";
import imgLogo from './images/img.png';
import imgPlaceholder from './images/placeholder.jpeg';
import { ReactComponent as LoadingIcon } from './icons/icon_loading.svg';

const App: React.FC = () => {
    const mockNewsData = [
        {
            _id: '1',
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
            _id: '2',
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
        {
            _id: '3',
            pub_date: '2025-03-05T15:00:00Z',
            source: 'Science Daily',
            web_url: 'https://www.sciencedaily.com/releases/2025/03/05050000.htm',
            abstract: 'New Discoveries in Cancer Treatment Revolutionize Medicine',
            multimedia: [
                {
                    url: '/images/cancer-research.jpg',
                },
            ],
        },
        {
            _id: '4',
            pub_date: '2025-03-05T12:00:00Z',
            source: 'The Guardian',
            web_url: 'https://www.theguardian.com/environment/2025/mar/05/climate-change-news',
            abstract: 'Scientists Warn About the Rapidly Growing Threat of Climate Change',
            multimedia: [
                {
                    url: '/images/climate-change.jpg',
                },
            ],
        },
        {
            _id: '5',
            pub_date: '2025-03-04T14:00:00Z',
            source: 'Reuters',
            web_url: 'https://www.reuters.com/2025/03/04/business/stock-market-crash.html',
            abstract: 'Global Stock Market Sees Unprecedented Decline Amidst Economic Uncertainty',
            multimedia: [
                {
                    url: '/images/stock-market-crash.jpg',
                },
            ],
        },
        {
            _id: '6',
            pub_date: '2025-03-04T10:30:00Z',
            source: 'CNN',
            web_url: 'https://www.cnn.com/2025/03/04/world-news/global-health-crisis.html',
            abstract: 'New Health Crisis Emerges as Global Pandemic Concerns Rise',
            multimedia: [
                {
                    url: '/images/global-health-crisis.jpg',
                },
            ],
        },
        {
            _id: '7',
            pub_date: '2025-03-03T09:45:00Z',
            source: 'The Washington Post',
            web_url: 'https://www.washingtonpost.com/politics/2025/03/03/presidential-election-2025/',
            abstract: '2025 Presidential Election: What to Expect in the Coming Months',
            multimedia: [
                {
                    url: '/images/presidential-election.jpg',
                },
            ],
        },
        {
            _id: '8',
            pub_date: '2025-03-03T08:15:00Z',
            source: 'Al Jazeera',
            web_url: 'https://www.aljazeera.com/news/2025/03/03/middle-east-crisis-updates',
            abstract: 'Middle East Crisis: Key Developments You Need to Know',
            multimedia: [
                {
                    url: '/images/middle-east-crisis.jpg',
                },
            ],
        },
        {
            _id: '9',
            pub_date: '2025-03-02T17:30:00Z',
            source: 'National Geographic',
            web_url: 'https://www.nationalgeographic.com/environment/2025/03/02/earth-sustainability-report/',
            abstract: 'New Report: Earth’s Sustainability at Risk',
            multimedia: [
                {
                    url: '/images/sustainability-report.jpg',
                },
            ],
        },
        {
            _id: '10',
            pub_date: '2025-03-02T14:00:00Z',
            source: 'Bloomberg',
            web_url: 'https://www.bloomberg.com/markets/2025/03/02/future-of-finance.html',
            abstract: 'The Future of Finance: Trends to Watch in 2025',
            multimedia: [
                {
                    url: '/images/future-of-finance.jpg',
                },
            ],
        },
        {
            _id: '11',
            pub_date: '2025-03-01T18:30:00Z',
            source: 'Forbes',
            web_url: 'https://www.forbes.com/2025/03/01/tech-investments/',
            abstract: 'Tech Investments: Where to Put Your Money in 2025',
            multimedia: [
                {
                    url: '/images/tech-investments.jpg',
                },
            ],
        },
        {
            _id: '12',
            pub_date: '2025-03-01T11:00:00Z',
            source: 'The Verge',
            web_url: 'https://www.theverge.com/2025/03/01/tech-advancements-2025/',
            abstract: 'Technological Advancements to Look Forward to in 2025',
            multimedia: [
                {
                    url: '/images/tech-advancements.jpg',
                },
            ],
        },
        {
            _id: '13',
            pub_date: '2025-02-28T14:45:00Z',
            source: 'The Financial Times',
            web_url: 'https://www.ft.com/2025/02/28/economy-in-2025/',
            abstract: 'Global Economy in 2025: What You Need to Know',
            multimedia: [
                {
                    url: '/images/global-economy.jpg',
                },
            ],
        },
        {
            _id: '14',
            pub_date: '2025-02-28T10:15:00Z',
            source: 'Time',
            web_url: 'https://www.time.com/2025/02/28/covid-19-aftermath/',
            abstract: 'The Aftermath of COVID-19: What Comes Next for the World?',
            multimedia: [
                {
                    url: '/images/covid-19-aftermath.jpg',
                },
            ],
        },
        {
            _id: '15',
            pub_date: '2025-02-27T12:30:00Z',
            source: 'BBC News',
            web_url: 'https://www.bbc.com/news/2025/02/27/tech-ai.html',
            abstract: 'The Rise of Artificial Intelligence: What Does It Mean for the Future?',
            multimedia: [
                {
                    url: '/images/ai-technology.jpg',
                },
            ],
        },
        {
            _id: '16',
            pub_date: '2025-02-27T10:00:00Z',
            source: 'The New York Times',
            web_url: 'https://www.nytimes.com/2025/02/27/world/earthquake-news.html',
            abstract: 'Breaking News: Earthquake Strikes California',
            multimedia: [
                {
                    url: '/images/california-earthquake.jpg',
                },
            ],
        },
        {
            _id: '17',
            pub_date: '2025-02-26T17:45:00Z',
            source: 'USA Today',
            web_url: 'https://www.usatoday.com/2025/02/26/sports-news/',
            abstract: 'Sports Roundup: Major Events Happening This Week',
            multimedia: [
                {
                    url: '/images/sports-news.jpg',
                },
            ],
        },
        {
            _id: '18',
            pub_date: '2025-02-26T13:30:00Z',
            source: 'The Guardian',
            web_url: 'https://www.theguardian.com/world-news/2025/02/26/terrorism-international-response.html',
            abstract: 'Global Response to Terrorism: What We Can Do as a Society',
            multimedia: [
                {
                    url: '/images/terrorism-response.jpg',
                },
            ],
        },
        {
            _id: '19',
            pub_date: '2025-02-25T11:00:00Z',
            source: 'Al Jazeera',
            web_url: 'https://www.aljazeera.com/news/2025/02/25/africa-conflict-resolution.html',
            abstract: 'Conflict Resolution in Africa: Key Strategies for Peace',
            multimedia: [
                {
                    url: '/images/africa-peace.jpg',
                },
            ],
        },
        {
            _id: '20',
            pub_date: '2025-02-25T09:00:00Z',
            source: 'Reuters',
            web_url: 'https://www.reuters.com/2025/02/25/business/covid-recovery.html',
            abstract: 'How Businesses Are Recovering from COVID-19: Success Stories',
            multimedia: [
                {
                    url: '/images/covid-recovery-business.jpg',
                },
            ],
        },
    ];


    const dispatch = useAppDispatch();
    // const { news, error } = useSelector((state: RootState) => state.news);
    const [news, setNews] = useState(mockNewsData); ////////////
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [visibleNewsCount, setVisibleNewsCount] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const onBurgerButtonClick = () => setIsMenuOpen(true);
    const onCloseMenu = () => setIsMenuOpen(false);

    // Загружаем новости при первой загрузке
    useEffect(() => {
        const loadNews = async () => {
            setIsLoading(true);  // Устанавливаем isLoading в true перед запросом новостей
            try {
                // Делаем запрос на получение новостей
                await dispatch(fetchNews({ year: currentDate.getFullYear(), month: currentDate.getMonth() + 1 })).unwrap();
            } catch (error) {
                if (error instanceof Error) {
                    alert("Ошибка при загрузке новостей: " + error.message);
                } else {
                    console.error("Неизвестная ошибка:", error);
                    alert("Ошибка при загрузке новостей");
                }
            } finally {
                setIsLoading(false);  // Устанавливаем isLoading в false после завершения загрузки
            }
        };

        loadNews();  // Вызываем функцию загрузки новостей

    }, [currentDate]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    setIsLoading(true);
                    setVisibleNewsCount(prevCount => prevCount + 5);
                    setIsLoading(false);
                }
            },
            {
                threshold: 0.1
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

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

            {/* {error && <p style={{ color: "red", textAlign: "center" }}>Ошибка: {error}</p>} */}

            <div className="container__news news">
                {Object.entries(news.slice(0, visibleNewsCount).reduce((acc: Record<string, any[]>, item) => {
                    const dateKey = format(new Date(item.pub_date), "dd.MM.yyyy");
                    acc[dateKey] = acc[dateKey] || [];
                    acc[dateKey].push(item);
                    return acc;
                }, {})).map(([date, articles]) => {
                    return (
                        <div key={date} className="news__news-group">
                            <p className="news__date">News for {date}</p>
                            {articles.map((item, index) => {
                                return (
                                    <div
                                        key={item._id || item.web_url}
                                        className="news__news-item news-item"
                                    >
                                        <img src={item.multimedia?.[0]?.url ? `https://www.nytimes.com/${item.multimedia[0].url}` : imgPlaceholder} alt="news" className="news-item__image" />
                                        <div className="news-item__content">
                                            <a className="news-item__source" href={item.web_url} target="_blank">{item.source}</a>
                                            <p className="news-item__title">{item.abstract}</p>
                                            <p className="news-item__date">{format(new Date(item.pub_date), "MMM dd, yyyy, hh.mm a")}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )
                })}
            </div>

            <div ref={ref}></div>

            <footer className="container__footer footer">
                {isLoading && (
                    <div className="footer__loading-icon">
                        <LoadingIcon width={36} height={36} />
                    </div>
                )}
                <div className="footer__links">
                    <a href="#">Log In</a>
                    <a href="#">About Us</a>
                    <a href="#">Publishers</a>
                    <a href="#">Sitemap</a>
                </div>
                <div className="footer__powered">Powered by</div>
                <img className="footer__logo" src={imgLogo} alt="Powered logo" />
                <div className="footer__copyright">© 2023 Besider. Inspired by Insider</div>
            </footer>
        </div>
    );
};

export default App;
