/** 3 -> "03" */
export const padNumber = (value: number) => String(value).padStart(2, '0')

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/

/** Intl locale for each site language. English stays British, so the day comes before the month. */
const DATE_LOCALES: Record<string, string> = {
    en: 'en-GB',
    pt: 'pt-BR',
    fr: 'fr-FR'
}

/**
 * "2026-08-10" -> "10 Aug 2026" (or "10 août 2026" in French).
 * Anything that isn't an ISO date is returned as it came.
 * @param value the date value to be formatted
 * @param language the site language code, such as "pt". Falls back to English.
 */
export const formatDate = (value: string, language = 'en') => {
    const match = ISO_DATE.exec(value)
    if (!match) return value
    const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])))
    return new Intl.DateTimeFormat(
      DATE_LOCALES[language] ?? DATE_LOCALES.en,
      {day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'})
      .format(date)
}

/** "2026-08-10" -> "2026" */
export const getYear = (value: string) => value.slice(0, 4)

export const MONTHS =
  ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

/** '10 Aug 2026' -> '2026-08-10'. Anything it can't read is returned unchanged. */
export const toIsoDate = (value: string) => {
    const match = /^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/.exec(value.trim())
    const month = match ? MONTHS.indexOf(match[2].toLowerCase()) : -1
    if (!match || month === -1) return value
    return `${match[3]}-${String(month + 1).padStart(2, '0')}-${match[1].padStart(2, '0')}`
}