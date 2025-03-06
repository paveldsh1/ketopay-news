const HeaderOverlay = ({ onClose }: { onClose: () => void }) => (
    <div className="header__overlay">
        <button className="header__close-button" onClick={onClose}>
            &times;
        </button>
        <nav className="header__menu">
            <ul className="header__menu-list">
                {["SCIENCE", "GENERAL", "ENTERTAINMENT", "TECHNOLOGY", "BUSINESS", "HEALTH", "SPORTS"].map(
                    (category) => (
                        <li key={category} className="header__menu-item">
                            <a href="/" className="header__menu-link">
                                {category}
                            </a>
                        </li>
                    )
                )}
            </ul>
        </nav>
    </div>
);

export default HeaderOverlay;