import { axiosDaData } from '../axios/axios'
import { IHintsResponse } from '../typings/typings'

const initialValue = 'Москва'

export async function getCityName(lat: number, lon: number): Promise<string> {
    // Обратное геокодирование. Передаем сервису широту и долготу, чтобы получить местоположение (название города) пользователя

    const url = 'suggestions/api/4_1/rs/geolocate/address'

    const coords = { lat, lon }

    try {
        const response = await axiosDaData.post<{ suggestions: Array<IHintsResponse> }>(url, coords)

        const { city, region, region_type_full } = response.data.suggestions[0].data

        if (city) {
            return city
        }

        if (region) {
            return `${region} ${region_type_full}`
        }

        return initialValue
    } catch (e: unknown) {
        console.error(e)

        return initialValue
    }
}
