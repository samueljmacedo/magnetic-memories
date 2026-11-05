import {Sparkles} from "lucide-react";
import "./QuoteBand.css";

const QuoteBand = () => {
    return (
        <section className="quote-band">
            <Sparkles size={17} />
            <p>“We travel not to escape life, but for life not to escape us.”</p>
            <span className="meta-label">A LITTLE REMINDER TO KEEP WANDERING</span>
        </section>
    );
}

export default QuoteBand;
