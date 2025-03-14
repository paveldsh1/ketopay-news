import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "./hooks";
import { fetchNews, setOlderNewsParams } from "./newsSlice";
import HeaderOverlay from "./HeaderOverlay";
import Header from "./Header";
import NewsList from "./NewsList";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { news, currentYear, currentMonth, isMonthChanged, visibleNewsCount } = useSelector((state: RootState) => state.news);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFirstRequest, setIsFirstRequest] = useState(true);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchLatestNews = () => {
            dispatch(fetchNews({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 }))
                .unwrap()
                .then(() => {
                    setIsFirstRequest(false);
                })
                .catch((error) => {
                    alert(error.error)
                });
        };

        if (!isMenuOpen) {
            fetchLatestNews();
            const interval = setInterval(fetchLatestNews, 30000);
            return () => {
                clearInterval(interval);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMenuOpen]);

    useEffect(() => {
        const fetchOlderNews = () => {
            dispatch(fetchNews({
                year: currentYear ?? new Date().getFullYear(),
                month: currentMonth ?? new Date().getMonth() + 1
            }))
                .unwrap()
                .catch((error) => {
                    alert(error.error);
                });
        };

        if (news.length !== 0 && news.length <= visibleNewsCount) {
            if (isMonthChanged) fetchOlderNews();
            else dispatch(setOlderNewsParams());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visibleNewsCount]);

    useEffect(() => {
        if (!isFirstRequest) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        console.log(visibleNewsCount)
                        dispatch({ type: 'news/setVisibleNewsCount' });
                        dispatch({ type: 'news/setLoading', payload: true });
                    }
                },
                { threshold: 0.9 }
            );

            if (ref.current) {
                observer.observe(ref.current);
            }

            return () => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFirstRequest, isMenuOpen]);

    const memoizedOnMenuOpen = useCallback(() => {
        setIsMenuOpen(true);
    }, []);

    return (
        <div className="container">
            {isMenuOpen ? (
                <HeaderOverlay onClose={() => setIsMenuOpen(false)} />
            ) : (
                <>
                    <Header onMenuOpen={memoizedOnMenuOpen} />
                    <hr className="container__line" />
                    <NewsList news={news} />
                    <div ref={ref}></div>
                    <Footer />
                </>
            )}
        </div>
    );
};

export default App;