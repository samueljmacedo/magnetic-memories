import type {Journey} from "@/lib/journeys.ts";
import {getYear} from "@/utils/format.ts";

/** Value of the "no filter" option in the journey filters. */
export const ALL_FILTER = 'all';

export type JourneyFilters = {
    /** A year such as "2026", or ALL_FILTER */
    year: string
    /** A country name, or ALL_FILTER */
    country: string
}

/** Journeys that match both filters. ALL_FILTER matches everything. */
export const filterJourneys = (journeys: Journey[], {year, country}: JourneyFilters) => {
    return journeys.filter(journey =>
        (year === ALL_FILTER || getYear(journey.startDate) === year) &&
        (country === ALL_FILTER || journey.country === country));
}

/** Unique countries, A to Z, for the country filter. */
export const filterCountriesAlphabetically = (journeys: Journey[]) => {
    return Array.from(new Set(journeys.map(journey => journey.country)))
        .sort((a, b) => a.localeCompare(b))
        .map(name => ({id: name, name}));
}

/** Unique years, newest first, for the year filter. */
export const listYearsNewestFirst = (journeys: Journey[]) => {
    return Array.from(new Set(journeys.map(journey => getYear(journey.startDate))))
        .sort()
        .reverse()
        .map(name => ({id: name, name}));
}
