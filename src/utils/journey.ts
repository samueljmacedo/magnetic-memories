import type {Journey} from "@/lib/journeys.ts";
import {getYear} from "@/utils/format.ts";

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
