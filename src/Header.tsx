import { memo } from 'react';

const Header = memo(({ onMenuOpen }: { onMenuOpen: () => void }) => {
    // console.log('Header component rendered');
    return (
        <header className="container__header header">
            <button className="header__burger-button" onClick={onMenuOpen}>
                <span className="burger-button__line"></span>
                <span className="burger-button__line"></span>
                <span className="burger-button__line"></span>
            </button>
            <div>BESIDER</div>
        </header>
    )
});

export default Header;