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
  /** The city the map pin is dropped on */
  city: string
  country: string
  continent: Continent
  startDate: string
  endDate: string
  /** Coordinates of `city`, in decimal degrees */
  lat: number
  lng: number
  description: string
  image: string
  tag: string
}

export const journeys: Journey[] = [
  {
    id: 'gijon',
    city: 'Gijón',
    country: 'Spain',
    continent: 'Europe',
    startDate: '10 Aug 2026',
    endDate: '14 Aug 2026',
    lat: 43.5314,
    lng: -5.7096,
    description: 'Sun-warmed streets, with a beautiful shore and cold waters',
    image: 'src/data/images/trips/spain/gijon/20260811_141829.jpg',
    tag: 'Sun-warm city',
  },
  {
    id: 'belgrade',
    city: 'Belgrade',
    country: 'Serbia',
    continent: 'Europe',
    startDate: '14 Aug 2026',
    endDate: '25 Aug 2026',
    lat: 44.8152,
    lng: 20.2576,
    description: 'Unique architecture, mixed with arbored neighbourhoods and modern night life',
    image: 'src/data/images/trips/serbia/belgrade/20260817_191735.jpg',
    tag: 'Restless city',
  },
  {
    id: 'birmingham',
    city: 'Birmingham',
    country: 'England',
    continent: 'Europe',
    startDate: '25 Aug 2026',
    endDate: '17 Nov 20260',
    lat: 52.4972,
    lng: -2.0284,
    description: 'Huge and alive city, made for the every type of person.',
    image: 'src/data/images/trips/england/birmingham/20261017_122725.jpg',
    tag: 'For everyone',
  },

  {
    id: 'stratford',
    city: 'Stratford',
    country: 'England',
    continent: 'Europe',
    startDate: '16 Sep 2026',
    endDate: '16 Sep 2026',
    lat: 52.1966,
    lng: -1.7541,
    description: 'Quiet canals, surrounded by dozens of swans and ducks.',
    image: 'src/data/images/trips/england/stratford-upon-avon/20260916_170018.jpg',
    tag: 'Shakespear birthplace',
  },

  {
    id: 'edinburgh',
    city: 'Edinburgh',
    country: 'Scotland',
    continent: 'Europe',
    startDate: '27 Oct 2026',
    endDate: '09 Nov 2026',
    lat: 55.9533,
    lng: -3.1883,
    description: 'Stunningly gorgeous city, with beauty hidden in every corner.',
    image: 'src/data/images/trips/scotland/edinburgh/20261028_101245.jpg',
    tag: 'Made for autumn',
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
  /*{ label: 'Little moments', href: '#moments' },*/
]

export const currentLocation = {
  city: 'Edinburgh',
  country: 'Scotland',
  lat: 55.9533,
  lng: -3.1883,
}
