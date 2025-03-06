const Header = ({ onMenuOpen }: { onMenuOpen: () => void }) => (
    <header className="container__header header">
        <button className="header__burger-button" onClick={onMenuOpen}>
            <span className="burger-button__line"></span>
            <span className="burger-button__line"></span>
            <span className="burger-button__line"></span>
        </button>
        <div>BESIDER</div>
    </header>
);

export default Header;