import { IWeatherInOtherCities } from 'typings'
import { useDataStorage } from '../hooks/use-data-storage'

const WEATHER_KEY = 'weather_in_cities'
const EXPIRED_LIMIT = 3600 * 1000 // обновление данных каждый час

export function useWeatherInCitiesData() {
    const { checkStorage, saveDataToStorage } = useDataStorage<Array<IWeatherInOtherCities>>(
        WEATHER_KEY,
        EXPIRED_LIMIT,
    )

    return { checkStorage, saveDataToStorage }
}
