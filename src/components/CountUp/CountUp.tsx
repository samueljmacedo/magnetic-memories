import {useEffect, useRef, useState} from "react";

type CountUpProps = {
    /** The number to count up to. If it changes later, for example when data arrives, it counts from where it is to the new number. */
    value: number
    /** Pads with zeros up to this many digits, so 3 becomes "03" with pad={2} */
    pad?: number
    /** How long the count takes, in ms */
    duration?: number
}

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3)

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** A number that counts up from 0 the first time it scrolls into view. */
const CountUp = ({value, pad = 0, duration = 1200}: CountUpProps) => {
    const ref = useRef<HTMLSpanElement>(null)
    const [visible, setVisible] = useState(false)
    const [shown, setShown] = useState(0)
    const shownRef = useRef(0)

    useEffect(() => {
        const element = ref.current
        if (!element) return
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            setVisible(true)
            observer.disconnect()
        }, {threshold: 0.6})
        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!visible) return
        if (prefersReducedMotion()) {
            shownRef.current = value
            setShown(value)
            return
        }

        const from = shownRef.current
        const start = performance.now()
        let frame = 0
        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            shownRef.current = from + (value - from) * easeOutCubic(progress)
            setShown(shownRef.current)
            if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [visible, value, duration])

    const format = (number: number) => String(Math.round(number)).padStart(pad, '0')

    // The moving digits are hidden from screen readers, which read the final number straight away.
    return (
        <span ref={ref} className="count-up">
            <span aria-hidden="true">{format(shown)}</span>
            <span className="visually-hidden">{format(value)}</span>
        </span>
    )
}

export default CountUp
