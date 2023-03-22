import { useState, useEffect } from 'react'
import { ICurrentWeatherResponse, ICurrentWeather, IWeatherInOtherCities } from '../typings/typings'
import { useWeatherInCitiesData } from './use-weather-in-cities'
import { getTomorrowDate } from '../utils/utils'
import { weatherApiClient } from '../service/weather-api-client'

type WeatherData = {
    currentWeather: ICurrentWeather
    fiveDayForecast: Array<ICurrentWeatherResponse>
    weatherTomorrow: Array<ICurrentWeatherResponse>
    weatherInCities: Array<IWeatherInOtherCities>
}

export function useWeatherData(location: string) {
    const [weatherData, setWeatherData] = useState<WeatherData>()
    const [loading, setLoading] = useState(false)
    const [errorStatus, setErrorStatus] = useState(200)

    const { fetchCurrentWeather, fetchFiveDayForecast, fetchWeatherInOtherCities } =
        weatherApiClient()

    const { checkStorage, saveDataToStorage } = useWeatherInCitiesData()

    const getWeatherInOtherCities = async () => {
        // циклом запрашиваем погоду для городов из массива
        const cities = ['Москва', 'Новосибирск', 'Владивосток']

        const data = checkStorage()
        // Для снижения нагрузки на сервис данные сохраняются в хранилище
        // Если данные есть в хранилище и срок их хранения не истек, то берем их оттуда
        // Данные обновляются каждый час

        if (data) return data

        const weatherInCities = await fetchWeatherInOtherCities(cities)

        saveDataToStorage(weatherInCities)

        return weatherInCities
    }

    const getWeatherForTomorrow = (
        items: Array<ICurrentWeatherResponse>,
    ): Array<ICurrentWeatherResponse> => {
        // прогноз на следующий день
        return items.filter((item) => item.dt_txt?.includes(getTomorrowDate()))
    }

    const fetchAllData = (): void => {
        setErrorStatus(200)
        setLoading(true)

        Promise.all([
            fetchCurrentWeather(location),
            fetchFiveDayForecast(location),
            getWeatherInOtherCities(),
        ])
            .then((data) => {
                setWeatherData({
                    currentWeather: data[0].currentWeather,
                    fiveDayForecast: data[1].fiveDayForecast,
                    weatherTomorrow: getWeatherForTomorrow(data[1].fiveDayForecast),
                    weatherInCities: data[2],
                })
            })
            .catch((e: Error) => {
                const error = JSON.parse(e.message)

                setErrorStatus(error.cod)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchAllData()
        // eslint-disable-next-line
    }, [location])

    return { weatherData, errorStatus, loading }
}
