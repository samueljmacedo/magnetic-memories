import Brand from "../Brand/Brand.tsx";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="section-wrap footer-inner">
                <Brand className="footer-brand" />
                <p>A little collection of places, magnets & memories.</p>
                <div className="footer-right meta-label">
                    <span>© {new Date().getFullYear()} · ALL RIGHTS RESERVED</span>
                    <a href="#home">BACK TO TOP ↑</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
