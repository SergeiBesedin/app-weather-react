import { axiosDaData } from '../axios/axios'

const API_DADATA_KEY = process.env.REACT_APP_DD_API_KEY // ключ для сервиса DaData

const MAX_HINTS = 4

interface Suggest {
    value: string
    unrestricted_value: string
    data: {
        country: string
        country_iso_code: string
        city: string
        city_with_type: string
        city_fias_id: string
    }
}

type HintsData = {
    suggestions: Array<Suggest>
}

export type CityData = {
    city: string
    id: string
}

export const getHints = async (q: string): Promise<Array<CityData>> => {
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

    const options = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${API_DADATA_KEY}`,
        },
    }

    const response = await axiosDaData.post<HintsData>(url, query, options)

    return response.data.suggestions.map((el) => {
        return { city: el.data.city, id: el.data.city_fias_id }
    })
}
