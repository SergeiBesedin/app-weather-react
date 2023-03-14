import { AxiosError } from 'axios'
import { axiosDaData } from '../axios/axios'
import { HintsResponse } from '../typings/typings'

export async function getCityName(lat: number, lon: number): Promise<string> {
    // Обратное геокодирование. Передаем сервису широту и долготу, чтобы получить местоположение (название города) пользователя

    const url = 'suggestions/api/4_1/rs/geolocate/address'

    const coords = { lat, lon }

    try {
        const response = await axiosDaData.post<{ suggestions: Array<HintsResponse> }>(url, coords)

        return response.data.suggestions[0].data.city
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            console.error(e)
        }

        return 'Москва'
    }
}
