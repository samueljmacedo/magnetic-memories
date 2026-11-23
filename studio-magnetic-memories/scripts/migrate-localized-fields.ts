import {getCliClient} from 'sanity/cli'

declare const process: {env: Record<string, string | undefined>; exit(code: number): never}

const client = getCliClient({apiVersion: '2025-02-19'})
const apply = process.env.APPLY === '1'

type Doc = {_id: string; city?: string; description?: unknown; tag?: unknown}

const toLocalized = (value: unknown) =>
    typeof value === 'string' && value.trim() ? {_type: 'localizedString', en: value} : undefined

async function run() {
    const docs = await client.fetch<Doc[]>(
        `*[_type == "journey" && !(_id in path("drafts.**"))]{_id, city, description, tag}`
    )

    let changed = 0
    for (const doc of docs) {
        const patch: Record<string, unknown> = {}
        const description = toLocalized(doc.description)
        const tag = toLocalized(doc.tag)
        if (description) patch.description = {...description, _type: 'localizedText'}
        if (tag) patch.tag = tag

        if (Object.keys(patch).length === 0) {
            console.log(`skip     ${doc.city ?? doc._id} (nothing to migrate)`)
            continue
        }

        console.log(`${apply ? 'migrate ' : 'would   '} ${doc.city ?? doc._id}: ${Object.keys(patch).join(', ')}`)
        if (apply) await client.patch(doc._id).set(patch).commit()
        changed++
    }

    console.log(`\n${changed} journey(s) ${apply ? 'migrated' : 'would be migrated'}.`)
    if (!apply && changed > 0) console.log('Run again with APPLY=1 to apply.')
}

run().catch((error) => {
    console.error(error)
    process.exit(1)
})
