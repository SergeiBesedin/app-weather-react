import { axiosDaData } from '../axios/axios'
import { IHintsResponse } from '../typings/typings'

const MAX_HINTS = 4

export type HintData = {
    city: string
    id: string
}

export async function getSearchHints(q: string): Promise<Array<HintData>> {
    const url = 'suggestions/api/4_1/rs/suggest/address'

    const query = {
        query: q,
        count: MAX_HINTS,
        from_bound: { value: 'city' },
        to_bound: { value: 'city' },
        locations: [
            {
                city_type_full: 'город',
            },
        ],
    }

    try {
        const response = await axiosDaData.post<{ suggestions: Array<IHintsResponse> }>(url, query)

        return response.data.suggestions.map((el) => ({
            city: el.data.city,
            id: el.data.city_fias_id,
        }))
    } catch (e: unknown) {
        console.error(e)

        return []
    }
}
