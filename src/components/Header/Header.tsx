import {Globe2, Menu} from "lucide-react";
import {useState} from "react";
import {navItems} from "@/data/data.ts";
import {useTranslation} from "react-i18next";
import {SUPPORTED_LANGUAGES} from "@/i18n.ts";
import Brand from "../Brand/Brand.tsx";
import "./Header.css";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const {t, i18n} = useTranslation();

    return (
        <>
            <div className="announcement meta-label">
                <span className="tiny-star">✳</span>
                {t('header.title')}
                <span className="tiny-star">✳</span>
            </div>
            <header className="header">
                <Brand />
                <button
                    className="mobile-menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                    aria-controls="site-nav">
                    <Menu size={21} />
                </button>
                <nav id="site-nav" className={menuOpen ? 'nav nav-open' : 'nav'}>
                    {navItems.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                        >
                            {t('header.menu.'+item.translationKey)}
                        </a>
                    ))}
                </nav>
                <div className="language">
                    <Globe2 size={15} />
                    <select
                        aria-label="Choose language"
                        value={i18n.resolvedLanguage}
                        onChange={(event) => i18n.changeLanguage(event.target.value)}>
                        {SUPPORTED_LANGUAGES.map((code) => <option key={code} value={code}>{code.toUpperCase()}</option>)}
                    </select>
                </div>
            </header>
        </>
    );
}

export default Header;
