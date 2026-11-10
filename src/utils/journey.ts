import {journeys} from "../data/data.ts";

export const filterCountriesAlphabetically = () => {
    return Array.from(new Set(
        journeys
            .map(journey => ({
                id: journey.id,
                name: journey.country,
            }))
            .sort((a, b) => a.name.localeCompare(b.name))
        ));
}