// All content below is placeholder data. Replace it with your own trips.

export type Continent =
  | 'Africa'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'Oceania'
  | 'South America'

export type Journey = {
  id: string
  /** Title shown on the card (a city, a region, a trail...) */
  place: string
  /** The city the map pin is dropped on */
  city: string
  country: string
  continent: Continent
  date: string
  /** Coordinates of `city`, in decimal degrees */
  lat: number
  lng: number
  description: string
  image: string
  tag: string
}

export const journeys: Journey[] = [
  {
    id: 'lisbon',
    place: 'Lisbon',
    city: 'Lisbon',
    country: 'Portugal',
    continent: 'Europe',
    date: 'May 2025',
    lat: 38.7223,
    lng: -9.1393,
    description: 'Sun-warmed streets, tiled facades and slow afternoons by the water.',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1000&q=85',
    tag: 'City break',
  },
  {
    id: 'dolomites',
    place: 'The Dolomites',
    city: 'Bolzano',
    country: 'Italy',
    continent: 'Europe',
    date: 'September 2024',
    lat: 46.4983,
    lng: 11.3547,
    description: 'Early starts, mountain air and views that made us stop talking.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85',
    tag: 'Mountain escape',
  },
  {
    id: 'kyoto',
    place: 'Kyoto',
    city: 'Kyoto',
    country: 'Japan',
    continent: 'Asia',
    date: 'April 2024',
    lat: 35.0116,
    lng: 135.7681,
    description: 'Quiet lanes, tiny tea rooms and a city that rewards getting lost.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=85',
    tag: 'Culture',
  },
]

export type FavouritePlace = {
  name: string
  location: string
  note: string
  icon: string
}

export const favouritePlaces: FavouritePlace[] = [
  { name: 'A tiny café', location: 'Alfama, Lisbon', note: 'For the best slow morning.', icon: '☕' },
  { name: 'The long way home', location: 'Val di Funes, Italy', note: 'Take the path with the view.', icon: '⌁' },
  { name: 'A quiet garden', location: 'Higashiyama, Kyoto', note: 'Leave room for an unplanned hour.', icon: '❀' },
]

export type NavItem = {
  label: string
  href: string
}

// Same order as the sections appear on the page.
export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'My journeys', href: '#journeys' },
  { label: 'Travel map', href: '#map' },
  { label: 'Little moments', href: '#moments' },
]

export const currentLocation = {
  city: 'Edinburgh',
  country: 'Scotland',
  lat: 55.9533,
  lng: -3.1883,
}
