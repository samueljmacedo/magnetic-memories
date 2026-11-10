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
  {
    id: 'paris',
    city: 'Paris',
    country: 'France',
    continent: 'Europe',
    startDate: '18 Oct 2022',
    endDate: '20 Oct 2022',
    lat: 48.8588,
    lng: 2.2646,
    description: 'Stunningly gorgeous city, with beauty hidden in every corner.',
    image: 'src/data/images/trips/france/paris/DSC05445.jpg',
    tag: 'The charmest city',
  },
  {
    id: 'mulhouse',
    city: 'Mulhouse',
    country: 'France',
    continent: 'Europe',
    startDate: '17 Oct 2023',
    endDate: '03 Nov 2023',
    lat: 47.7526,
    lng: 7.2843,
    description: 'Stunningly gorgeous city, with beauty hidden in every corner.',
    image: 'src/data/images/trips/france/mulhouse/20231018_151047.jpg',
    tag: 'Quiet and charming',
  },
  {
    id: 'colmar',
    city: 'Colmar',
    country: 'France',
    continent: 'Europe',
    startDate: '24 Oct 2023',
    endDate: '27 Oct 2023',
    lat: 48.1114,
    lng: 7.3099,
    description: 'Stunningly gorgeous city, with beauty hidden in every corner.',
    image: 'src/data/images/trips/france/colmar/20231024_153406.jpg',
    tag: 'Germany in France',
  },
  {
    id: 'strasbourg',
    city: 'Strasbourg',
    country: 'France',
    continent: 'Europe',
    startDate: '27 Oct 2023',
    endDate: '02 Oct 2023',
    lat: 48.5690,
    lng: 7.6796,
    description: 'Stunningly gorgeous city, with beauty hidden in every corner.',
    image: 'src/data/images/trips/france/strasbourg/20231027_134138.jpg',
    tag: 'Unforgetable place',
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
  { label: 'Magnets collection', href: '#magnets' },
]

export const currentLocation = {
  city: 'Solihull',
  country: 'England',
  lat: 52.4250,
  lng: -1.8238,
}

interface TravelMagnet {
  id: string,
  destination: string,
  country: string,
  image: string,
  year: string,
  memory: string,
  rotation?: number
}

export const magnets: TravelMagnet[] = [
  {
    id: "lisbon",
    destination: "Lisbon",
    country: "Portugal",
    image: "src/data/images/trips/scotland/edinburgh/20261106_103145.webp",
    year: "2025",
    memory: "A little keepsake from a sunny afternoon wandering through Alfama.",
    rotation: -3,
  },
  {
    id: "paris",
    destination: "Paris",
    country: "France",
    image: "src/data/images/trips/scotland/edinburgh/20261106_103145.webp",
    year: "2024",
    memory: "A reminder of a long weekend exploring the city.",
  },
  {
    id: "paris",
    destination: "Paris",
    country: "France",
    image: "src/data/images/trips/scotland/edinburgh/20261106_103145.webp",

    year: "2024",
    memory: "A reminder of a long weekend exploring the city.",
  },
  {
    id: "paris",
    destination: "Paris",
    country: "France",
    image: "src/data/images/trips/scotland/edinburgh/20261106_152259.webp",

    year: "2024",
    memory: "A reminder of a long weekend exploring the city.",
  },
  {
    id: "paris",
    destination: "Paris",
    country: "France",
    image: "src/data/images/trips/scotland/edinburgh/20261106_152412.webp",

    year: "2024",
    memory: "A reminder of a long weekend exploring the city.",
  },
  {
    id: "paris",
    destination: "Paris",
    country: "France",
    image: "src/data/images/trips/scotland/edinburgh/20261106_152259.webp",

    year: "2024",
    memory: "A reminder of a long weekend exploring the city.",
  },
  {
    id: "paris",
    destination: "Paris",
    country: "France",
    image: "src/data/images/trips/scotland/edinburgh/20261106_152412.webp",

    year: "2024",
    memory: "A reminder of a long weekend exploring the city.",
  },
  {
    id: "paris",
    destination: "Paris",
    country: "France",
    image: "src/data/images/trips/scotland/edinburgh/20261106_103145.webp",
    year: "2024",
    memory: "A reminder of a long weekend exploring the city.",
  },
  {
    id: "paris",
    destination: "Paris",
    country: "France",
    image: "src/data/images/trips/scotland/edinburgh/20261106_103145.webp",
    year: "2024",
    memory: "A reminder of a long weekend exploring the city.",
  },
];
