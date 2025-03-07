import imgLogo from './images/img.png';
import { ReactComponent as LoadingIcon } from './icons/icon_loading.svg';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const Footer = memo(() => {
    const { loading } = useSelector((state: RootState) => state.news);
    // console.log('Footer component rendered');
    return (
        <footer className="container__footer footer">
            {loading && (
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
    )
});

export default Footer;