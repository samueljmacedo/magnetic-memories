import {createContext, useContext, useEffect, useState} from 'react'
import type {ReactNode} from 'react'
import {fallbackJourneys, fetchJourneys} from '@/lib/journeys.ts'
import type {Journey} from '@/lib/journeys.ts'

type JourneysState = {
    journeys: Journey[]
    /**
     * loading  - waiting for Sanity
     * ready    - journeys come from Sanity
     * fallback - Sanity failed or has no published journeys, so data.ts is shown
     */
    status: 'loading' | 'ready' | 'fallback'
}

const JourneysContext = createContext<JourneysState>({journeys: [], status: 'loading'})

/** Fetches the journeys once, so the carousel and the map share the same data. */
export const JourneysProvider = ({children}: {children: ReactNode}) => {
    const [state, setState] = useState<JourneysState>({journeys: [], status: 'loading'})

    useEffect(() => {
        let cancelled = false

        fetchJourneys()
            .then((journeys) => {
                if (cancelled) return
                if (journeys.length === 0) {
                    console.warn('[sanity] No published journeys found (did you press Publish in the Studio?). Showing data.ts instead.')
                    setState({journeys: fallbackJourneys, status: 'fallback'})
                } else {
                    setState({journeys, status: 'ready'})
                }
            })
            .catch((error: unknown) => {
                if (cancelled) return
                console.error('[sanity] Could not load journeys (check the CORS origins in sanity.io/manage). Showing data.ts instead.', error)
                setState({journeys: fallbackJourneys, status: 'fallback'})
            })

        return () => {
            cancelled = true
        }
    }, [])

    return <JourneysContext.Provider value={state}>{children}</JourneysContext.Provider>
}

export const useJourneys = () => useContext(JourneysContext)
