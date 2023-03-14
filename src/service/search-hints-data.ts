import { AxiosError } from 'axios'
import { axiosDaData } from '../axios/axios'
import { HintsResponse } from '../typings/typings'

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
        // eslint-disable-next-line
        from_bound: { value: 'city' },
        // eslint-disable-next-line
        to_bound: { value: 'city' },
        locations: [
            {
                // eslint-disable-next-line
                city_type_full: 'город',
            },
        ],
    }

    try {
        const response = await axiosDaData.post<{ suggestions: Array<HintsResponse> }>(url, query)

        const hintsData = response.data.suggestions.map((el) => {
            return { city: el.data.city, id: el.data.city_fias_id }
        })

        return hintsData
    } catch (e: unknown) {
        const error = e as AxiosError
        console.error(error)
        return []
    }
}
