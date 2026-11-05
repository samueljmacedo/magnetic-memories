import { favouritePlaces } from '../../data/data.ts';
import { padNumber } from '../../utils/format.ts';
import "./Moments.css";

const Moments = () => {
    return (
        <section className="moments section-wrap" id="moments">
            <div className="section-heading">
                <div><p className="eyebrow">THE LITTLE THINGS · {padNumber(favouritePlaces.length)}</p><h2 className="heading-display">Favourite <i>finds</i></h2></div>
                <p className="heading-aside">Sometimes it's not the destination,<br />but the detail you remember.</p>
            </div>
            <div className="favourites-grid">
                {favouritePlaces.map((place, i) => (
                    <article className="favourite-card" key={place.name}>
                        <span className="favourite-number meta-label">{padNumber(i + 1)}</span>
                        <div className="favourite-icon" aria-hidden="true">{place.icon}</div>
                        <p className="favourite-location meta-label">{place.location}</p>
                        <h3>{place.name}</h3>
                        <p className="favourite-note text-small">{place.note}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Moments;
