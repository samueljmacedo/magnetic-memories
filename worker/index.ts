/**
 * The website's tiny API. Everything that is not /api/* is served straight from the static files
 * (see "run_worker_first" in wrangler.jsonc), so this code only runs for the visit counter.
 *
 *   POST /api/visit     counts one visit for the visitor's country
 *   GET  /api/visitors  returns [{country, visits}] for the map
 *
 * Only a country code and a number are stored. The visitor's IP address is never read or saved.
 */

interface Env {
    DB: D1Database
}

const json = (body: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(body), {
        ...init,
        headers: {'content-type': 'application/json', ...init.headers},
    })

/** Cloudflare uses "XX" when it doesn't know the country and "T1" for Tor, which aren't places on the map. */
const isRealCountry = (code: unknown): code is string =>
    typeof code === 'string' && /^[A-Z]{2}$/.test(code) && code !== 'XX' && code !== 'T1'

/** A browser always sends Origin on a POST, so a request from another website is turned away. */
const isSameOrigin = (request: Request) => {
    const origin = request.headers.get('origin')
    return !origin || origin === new URL(request.url).origin
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const {pathname} = new URL(request.url)

        if (pathname === '/api/visit' && request.method === 'POST') {
            if (!isSameOrigin(request)) return new Response(null, {status: 403})

            const country = request.cf?.country
            if (!isRealCountry(country)) return new Response(null, {status: 204})

            // One statement, so two visitors arriving together can't overwrite each other's count.
            await env.DB
                .prepare('INSERT INTO visits (country, visits) VALUES (?, 1) ON CONFLICT(country) DO UPDATE SET visits = visits + 1')
                .bind(country)
                .run()
            return new Response(null, {status: 204})
        }

        if (pathname === '/api/visitors' && request.method === 'GET') {
            const {results} = await env.DB
                .prepare('SELECT country, visits FROM visits ORDER BY visits DESC')
                .all<{country: string; visits: number}>()
            return json(results, {headers: {'cache-control': 'public, max-age=60'}})
        }

        return new Response('Not found', {status: 404})
    },
}
