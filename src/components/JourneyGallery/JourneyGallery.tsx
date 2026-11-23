import {useEffect, useRef, useState} from "react";
import type {CSSProperties, TouchEvent} from "react";
import {ArrowLeft, ArrowRight, X} from "lucide-react";
import {useTranslation} from "react-i18next";
import type {Journey} from "@/lib/journeys.ts";
import {countryName, pickLanguage} from "@/utils/localized.ts";
import "./JourneyGallery.css";

/** Up to this many pictures the gallery keeps its tilted, taped look. Bigger galleries get flat frames so they stay calm. */
const MAX_PICTURES_FOR_TILT = 10
const SWIPE_DISTANCE = 50

type Props = {
    journey: Journey
    onClose: () => void
}

/** How many columns the grid has on a wide screen. Phones always use two (or one for a single picture). */
const columnsFor = (count: number) => (count === 1 ? 1 : count === 2 ? 2 : count <= MAX_PICTURES_FOR_TILT ? 3 : 4)

/**
 * Full-screen gallery of a journey's extra pictures, opened from the journey carousel.
 * Clicking a picture opens it larger in a viewer with previous / next, arrow keys and swipe.
 * Escape closes the viewer first, then the gallery.
 */
export default function JourneyGallery({journey, onClose}: Props) {
    const {t, i18n} = useTranslation();
    const [viewing, setViewing] = useState<number | null>(null)
    const dialogRef = useRef<HTMLElement>(null)
    const touchStart = useRef<{x: number, y: number} | null>(null)
    const photos = journey.gallery
    const flat = photos.length > MAX_PICTURES_FOR_TILT
    const language = i18n.resolvedLanguage
    const country = countryName(t, journey.country)

    // Move to a neighbour of the picture being viewed, wrapping around at both ends.
    const step = (travel: 1 | -1) =>
        setViewing((index) => (index === null ? null : (index + travel + photos.length) % photos.length))

    useEffect(() => {
        const opener = document.activeElement as HTMLElement | null
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        dialogRef.current?.focus()
        return () => {
            document.body.style.overflow = previousOverflow
            opener?.focus()
        }
    }, [])

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (viewing !== null) setViewing(null)
                else onClose()
            } else if (viewing !== null && event.key === 'ArrowRight') step(1)
            else if (viewing !== null && event.key === 'ArrowLeft') step(-1)
            else if (event.key === 'Tab') keepFocusInside(event)
        }
        // Tab only cycles between the buttons of the topmost dialog.
        const keepFocusInside = (event: KeyboardEvent) => {
            const dialogs = document.querySelectorAll<HTMLElement>('.gallery-dialog, .gallery-viewer')
            const top = dialogs[dialogs.length - 1]
            const focusable = top?.querySelectorAll<HTMLElement>('button:not([disabled])')
            if (!top || !focusable?.length) return
            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (event.shiftKey && (document.activeElement === first || document.activeElement === top)) {
                event.preventDefault()
                last.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first.focus()
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewing, onClose, photos.length])

    const onTouchStart = (event: TouchEvent) => {
        const touch = event.touches[0]
        touchStart.current = {x: touch.clientX, y: touch.clientY}
    }
    const onTouchEnd = (event: TouchEvent) => {
        const start = touchStart.current
        touchStart.current = null
        if (!start || photos.length < 2) return
        const touch = event.changedTouches[0]
        const dx = touch.clientX - start.x
        const dy = touch.clientY - start.y
        if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dx) < Math.abs(dy) * 1.5) return
        step(dx < 0 ? 1 : -1)
    }

    const captionOf = (index: number) => pickLanguage(photos[index].caption, language)
    const altOf = (index: number) =>
        captionOf(index) || t('gallery.photoAlt', {defaultValue: '{{city}}, picture {{number}}', city: journey.city, number: index + 1})
    const viewed = viewing === null ? null : photos[viewing]

    // The viewer is a sibling of the backdrop, not a child: the backdrop's blur would otherwise trap its
    // "fixed" positioning inside the backdrop instead of the screen.
    return (
        <>
        <div
            className="gallery-backdrop"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose()
            }}
        >
            <section
                className={`gallery-dialog${flat ? ' is-flat' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="gallery-title"
                tabIndex={-1}
                ref={dialogRef}
                style={{'--gallery-columns': columnsFor(photos.length)} as CSSProperties}
                data-count={photos.length <= 2 ? photos.length : undefined}
            >
                <button
                    className="gallery-close"
                    type="button"
                    onClick={onClose}
                    aria-label={t('gallery.close', {defaultValue: 'Close gallery'})}
                >
                    <X size={20} aria-hidden="true" />
                </button>
                <header className="gallery-header">
                    <p className="eyebrow">{t('gallery.eyebrow', {defaultValue: 'Gallery'})}</p>
                    <h2 id="gallery-title">{journey.city}</h2>
                    <p className="gallery-meta">
                        <i>{country}</i>
                        <span>{journey.startDate.slice(0, 4)}</span>
                        <span>{t('gallery.count', {defaultValue_one: '{{count}} picture', defaultValue_other: '{{count}} pictures', count: photos.length})}</span>
                    </p>
                </header>

                <div className="gallery-grid">
                    {photos.map((photo, index) => {
                        const caption = captionOf(index)
                        return (
                            <figure
                                className={`gallery-tile${caption ? ' has-caption' : ''}`}
                                key={photo.id}
                                style={{
                                    '--i': Math.min(index, 12),
                                    '--tilt': `${((index * 37) % 7 - 3) * 0.9}deg`,
                                } as CSSProperties}
                            >
                                {!flat && index % 4 === 0 && <span className="tape" aria-hidden="true" />}
                                <button
                                    type="button"
                                    className="gallery-tile__photo"
                                    onClick={() => setViewing(index)}
                                    aria-label={t('gallery.open', {defaultValue: 'View picture {{number}} larger', number: index + 1})}
                                >
                                    <img
                                        src={photo.src}
                                        alt={altOf(index)}
                                        width={photo.width}
                                        height={photo.height}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </button>
                                {caption && <figcaption>{caption}</figcaption>}
                            </figure>
                        )
                    })}
                </div>
                <p className="gallery-hint">{t('gallery.hint', {defaultValue: 'Tap a picture to see it larger'})}</p>
            </section>
        </div>

            {viewed && viewing !== null && (
                <div
                    className="gallery-viewer"
                    role="dialog"
                    aria-modal="true"
                    aria-label={t('gallery.viewer', {defaultValue: 'Picture viewer'})}
                    tabIndex={-1}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setViewing(null)
                    }}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <button
                        className="gallery-close"
                        type="button"
                        onClick={() => setViewing(null)}
                        aria-label={t('gallery.closeViewer', {defaultValue: 'Back to the gallery'})}
                        autoFocus
                    >
                        <X size={20} aria-hidden="true" />
                    </button>
                    {photos.length > 1 && (
                        <>
                            <button className="gallery-nav gallery-nav--prev" type="button" onClick={() => step(-1)}
                                    aria-label={t('gallery.previous', {defaultValue: 'Previous picture'})}>
                                <ArrowLeft size={20} aria-hidden="true" />
                            </button>
                            <button className="gallery-nav gallery-nav--next" type="button" onClick={() => step(1)}
                                    aria-label={t('gallery.next', {defaultValue: 'Next picture'})}>
                                <ArrowRight size={20} aria-hidden="true" />
                            </button>
                        </>
                    )}
                    <figure className="gallery-viewer__figure" key={viewed.id}>
                        <img src={viewed.full} alt={altOf(viewing)} />
                        <figcaption>
                            {captionOf(viewing) && <span className="gallery-viewer__caption">{captionOf(viewing)}</span>}
                            <span className="gallery-viewer__count">{viewing + 1} / {photos.length}</span>
                        </figcaption>
                    </figure>
                </div>
            )}
        </>
    );
}
