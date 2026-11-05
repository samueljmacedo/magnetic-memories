export type Journey = {
  id: string
  place: string
  country: string
  date: string
  description: string
  image: string
  tag: string
}

export const journeys: Journey[] = [
  {
    id: 'lisbon',
    place: 'Lisbon',
    country: 'Portugal',
    date: 'May 2025',
    description: 'Sun-warmed streets, tiled facades and slow afternoons by the water.',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1000&q=85',
    tag: 'City break',
  },
  {
    id: 'dolomites',
    place: 'The Dolomites',
    country: 'Italy',
    date: 'September 2024',
    description: 'Early starts, mountain air and views that made us stop talking.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85',
    tag: 'Mountain escape',
  },
  {
    id: 'kyoto',
    place: 'Kyoto',
    country: 'Japan',
    date: 'April 2024',
    description: 'Quiet lanes, tiny tea rooms and a city that rewards getting lost.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=85',
    tag: 'Culture',
  },
]

export const favouritePlaces = [
  { name: 'A tiny café', location: 'Alfama, Lisbon', note: 'For the best slow morning.' },
  { name: 'The long way home', location: 'Val di Funes, Italy', note: 'Take the path with the view.' },
  { name: 'A quiet garden', location: 'Higashiyama, Kyoto', note: 'Leave room for an unplanned hour.' },
]
