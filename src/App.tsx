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
    const { news, loading, currentYear, currentMonth, isMonthChanged } = useSelector((state: RootState) => state.news);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [visibleNewsCount, setVisibleNewsCount] = useState(5);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchLatestNews = () => {
            dispatch(fetchNews({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 }))
                .unwrap()
                .catch((error) => {
                    alert(error.error)
                });
        };

        if (!isMenuOpen) {
            fetchLatestNews();
            const interval = setInterval(fetchLatestNews, 30000);
            return () => clearInterval(interval);
        }
    }, [isMenuOpen]);

    useEffect(() => {
        const fetchOlderNews = () => {
            dispatch({ type: 'news/setIsMonthChanged', payload: false })
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
            if(isMonthChanged) fetchOlderNews();
            else dispatch(setOlderNewsParams());
        }
    }, [visibleNewsCount]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    setVisibleNewsCount((prevCount) => prevCount + 5);
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
    }, [loading]);

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
                    <NewsList news={news} visibleNewsCount={visibleNewsCount} />
                    <div ref={ref}></div>
                    <Footer />
                </>
            )}
        </div>
    );
};

export default App;