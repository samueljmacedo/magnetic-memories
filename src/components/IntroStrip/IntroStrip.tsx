import "./IntroStrip.css";

const IntroStrip = () => {
    return (
        <section className="intro-strip">
            <div className="section-wrap intro-inner">
                <span className="intro-label">CURRENT LOCATION</span>
                <div className={"intro-location"}>
                    <div className={"intro-location-ping"}></div>
                    <p>Edinburgh <i>Scotland</i></p>
                </div>
            </div>
        </section>
    );
}

export default IntroStrip;