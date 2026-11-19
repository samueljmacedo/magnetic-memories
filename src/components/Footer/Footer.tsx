import Brand from "../Brand/Brand.tsx";
import "./Footer.css";
import {useTranslation} from "react-i18next";

const Footer = () => {
    const {t} = useTranslation();
    return (
        <footer className="footer">
            <div className="section-wrap footer-inner">
                <Brand className="footer-brand" />
                <p>{t('header.title')}</p>
                <div className="footer-right meta-label">
                    <span>© {new Date().getFullYear()} · {t('footer.rights')}</span>
                    <a href="#home">{t('footer.back')} ↑</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
