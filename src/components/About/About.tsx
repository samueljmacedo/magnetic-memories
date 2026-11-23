import {useCallback, useEffect, useMemo, useState} from "react";
import {ArrowDown} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import {useTranslation} from "react-i18next";

import "./About.css"
import {useAboutPhotos} from "@/hooks/useAboutPhotos.ts";
import {pickLanguage} from "@/utils/localized.ts";

const SLIDE_DELAY_MS = 5000

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const About = () => {
    const {t, i18n} = useTranslation();
    const photos = useAboutPhotos();
    const hasSeveral = photos.length > 1

    const plugins = useMemo(() => [
        Fade(),
        ...(hasSeveral && !prefersReducedMotion()
            ? [Autoplay({delay: SLIDE_DELAY_MS, stopOnInteraction: false, stopOnMouseEnter: true})]
            : []),
    ], [hasSeveral])

    const [viewportRef, embla] = useEmblaCarousel({loop: true, duration: 40, watchDrag: hasSeveral}, plugins)
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        if (!embla) return
        const onSelect = () => setSelected(embla.selectedScrollSnap())
        embla.on('select', onSelect).on('reInit', onSelect)
        onSelect()
        return () => {
            embla.off('select', onSelect).off('reInit', onSelect)
        }
    }, [embla])

    useEffect(() => {
        embla?.reInit()
    }, [embla, photos])

    const goTo = useCallback((index: number) => embla?.scrollTo(index), [embla])

    return (
        <section className="about section-wrap" id="about">
            <div className="about-photo">
                <div className="about-photo-viewport" ref={viewportRef}>
                    <div className="about-photo-track">
                        {photos.map((photo, index) => (
                            <div className="about-photo-slide" key={photo.src}>
                                <img
                                    src={photo.src}
                                    alt={photo.alt
                                        ? pickLanguage(photo.alt, i18n.resolvedLanguage)
                                        : t('about.photoAlt', {defaultValue: 'Golden sunlight over a peaceful landscape'})}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <span className="about-photo-note text-note">
                   {t('about.noteMessage.p1')} <br />
                     {t('about.noteMessage.p2')}<br />
                     <i>{t('about.noteMessage.p3')}</i>
                </span>
                {hasSeveral && (
                    <div className="about-photo-dots">
                        {photos.map((photo, index) => (
                            <button
                                key={photo.src}
                                type="button"
                                className={index === selected ? 'active' : ''}
                                aria-label={t('about.showPicture', {number: index + 1, defaultValue: 'Show picture {{number}}'})}
                                aria-current={index === selected}
                                onClick={() => goTo(index)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="about-copy">
                <h2 className="heading-display">
                  {t('about.header.p1')}<i>{t('about.header.p2')}</i>
                </h2>
                <p className="text-body">
                  {t('about.description.p1')}
                </p>
                <p className="text-body">{t('about.description.p2')}</p>
                <a href="#journeys" className="scroll-cue">
                    <ArrowDown size={15} />
                    {t('about.scrollMessage').toUpperCase()}
                </a>

            </div>
        </section>
    );
}

export default About;
