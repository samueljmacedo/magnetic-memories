/** 3 -> "03" */
export const padNumber = (value: number) => String(value).padStart(2, '0')

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/

/** "2026-08-10" -> "10 Aug 2026". Anything that isn't an ISO date is returned as it came. */
export const formatDate = (value: string) => {
    const match = ISO_DATE.exec(value)
    if (!match) return value
    const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])))
    return new Intl.DateTimeFormat('en-GB', {day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'}).format(date)
}

/** "2026-08-10" -> "2026" */
export const getYear = (value: string) => value.slice(0, 4)
