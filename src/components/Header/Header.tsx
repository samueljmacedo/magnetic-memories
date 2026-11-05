import {Globe2, Menu} from "lucide-react";
import {useState} from "react";
import {navItems} from "../../data/data.ts";
import {languages, useLanguage} from "../../hooks/useLanguage.ts";
import type {Language} from "../../hooks/useLanguage.ts";
import Brand from "../Brand/Brand.tsx";
import "./Header.css";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [language, setLanguage] = useLanguage()

    return (
        <>
            <div className="announcement meta-label">
                <span className="tiny-star">✳</span>
                A little collection of places, magnets & moments
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
                        <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
                    ))}
                </nav>
                <div className="language">
                    <Globe2 size={15} />
                    <select
                        aria-label="Choose language"
                        value={language}
                        onChange={(event) => setLanguage(event.target.value as Language)}>
                        {languages.map((code) => <option key={code} value={code}>{code}</option>)}
                    </select>
                </div>
            </header>
        </>
    );
}

export default Header;
