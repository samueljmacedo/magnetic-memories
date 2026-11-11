import {createContext, useContext, useEffect, useState} from 'react'
import type {ReactNode} from 'react'
import {fallbackTravelMagnets, fetchTravelMagnets, type TravelMagnet} from "@/lib/travelMagnet.ts";

type TravelMagnetsState = {
    travelMagnets: TravelMagnet[]
    status: 'loading' | 'ready' | 'fallback'
}

const TravelMagnetsContext = createContext<TravelMagnetsState>({
    travelMagnets: [],
    status: 'loading'
})

export const TravelMagnetsProvider = ({children}: {children: ReactNode}) => {
    const [state, setState] = useState<TravelMagnetsState>({travelMagnets: [], status: 'loading'})

    useEffect(() => {
        let cancelled = false // ignore the result if the component unmounted (StrictMode runs effects twice in dev)

        fetchTravelMagnets()
            .then((travelMagnets) => {
                if (cancelled) return
                if (travelMagnets.length === 0) {
                    console.warn('[sanity] No published journeys found (did you press Publish in the Studio?). Showing data.ts instead.')
                    setState({travelMagnets: fallbackTravelMagnets, status: 'fallback'})
                } else {
                    setState({travelMagnets, status: 'ready'})
                }
            })
            .catch((error: unknown) => {
                if (cancelled) return
                console.error('[sanity] Could not load (check the CORS origins in sanity.io/manage). Showing data.ts instead.', error)
                setState({travelMagnets: fallbackTravelMagnets, status: 'fallback'})
            })

        return () => {
            cancelled = true
        }
    }, [])

    return <TravelMagnetsContext.Provider value={state}>{children}</TravelMagnetsContext.Provider>
}

export const useTravelMagnets = () =>
    useContext(TravelMagnetsContext)
