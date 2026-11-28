import {useMemo} from "react";
import {Plane} from "lucide-react";
import {useTranslation} from "react-i18next";
import {currentLocation} from "@/data/data.ts";
import {useJourneys} from "@/context/JourneysContext.tsx";
import {countryName} from "@/utils/localized.ts";
import "./TicketStrip.css";

const TicketStrip = () => {
    const {t} = useTranslation();
    const {journeys} = useJourneys();

    const latest = useMemo(
        () => [...journeys].sort((a, b) => b.startDate.localeCompare(a.startDate))[0],
        [journeys]
    )

    if (!latest) return null

    return (
        <section className="ticket-strip">
            <div className="ticket">
                <div className="ticket-body">
                    <div className="ticket-place">
                        <span className="meta-label">{t('strip.currentLocation')}</span>
                        <strong>{currentLocation.city}</strong>
                        <i>{countryName(t, currentLocation.country)}</i>
                    </div>
                    <div className="ticket-route" aria-hidden="true">
                        <Plane size={28} strokeWidth={1.5} />
                    </div>
                    <div className="ticket-place ticket-place--stub">
                        <span className="meta-label">{t('strip.latestStop')}</span>
                        <strong>{latest.city}</strong>
                        <i>{countryName(t, latest.country)}</i>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TicketStrip;
