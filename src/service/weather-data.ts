import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { axiosOpenWeather } from '../axios/axios'
import {
    IWeather,
    IFiveDayForecast,
    ICurrentWeather,
    IWeatherInOtherCities,
} from '../typings/typings'
import { useWeatherInCitiesData } from '../hooks/use-weather-in-cities'
import { getTomorrowDate } from '../utils/utils'

type WeatherData = {
    currentWeather: ICurrentWeather
    fiveDayForecast: Array<IWeather>
    weatherTomorrow: Array<IWeather>
    weatherInCities: Array<IWeatherInOtherCities>
}

export function useGetWeatherData(location: string) {
    const [weatherData, setWeatherData] = useState<WeatherData>()
    const [loading, setLoading] = useState(false)
    const [errorStatus, setErrorStatus] = useState(200)

    const { checkStorage, saveDataToStorage } = useWeatherInCitiesData()

    const fetchCurrentWeather = async (
        city: string,
    ): Promise<{ currentWeather: ICurrentWeather }> => {
        // получаем данные для карточки с текущей погодой
        const url = `weather?q=${city}`

        const response = await axiosOpenWeather.get<IWeather>(url)

        const currentWeather = {
            id: response.data.id,
            city: response.data.name,
            weatherName: response.data.weather[0].main,
            weatherDesc: response.data.weather[0].description,
            temp: response.data.main,
            wind: response.data.wind.speed,
            dateTime: response.data.dt,
            sunrise: response.data.sys.sunrise,
            sunset: response.data.sys.sunset,
            timezone: response.data.timezone,
        }

        return { currentWeather }
    }

    const fetchWeatherInOtherCities = async () => {
        // циклом запрашиваем погоду для городов из массива
        const cities = ['Москва', 'Новосибирск', 'Владивосток']

        const data = checkStorage()
        // Для снижения нагрузки на сервис данные сохраняются в хранилище
        // Если данные есть в хранилище и срок их хранения не истек, то берем их оттуда
        // Данные обновляются каждый час

        if (data) {
            return data
        }

        const weatherInCities: Array<IWeatherInOtherCities> = []

        for (const city of cities) {
            const url = `weather?q=${city}`

            const response = await axiosOpenWeather.get<IWeather>(url)

            const data = {
                id: response.data.id,
                city: response.data.name,
                weatherName: response.data.weather[0].main,
                tempMax: response.data.main.temp_max,
                tempMin: response.data.main.temp_min,
            }

            weatherInCities.push(data)
        }

        saveDataToStorage(weatherInCities)

        return weatherInCities
    }

    const fetchFiveDayForecast = async (
        city: string,
    ): Promise<{
        fiveDayForecast: Array<IWeather>
    }> => {
        // получаем данные с почасовым прогнозом на 5 дней
        const url = `forecast?q=${city}`

        const response = await axiosOpenWeather.get<IFiveDayForecast>(url)

        return { fiveDayForecast: response.data.list }
    }

    const getWeatherForTomorrow = (items: Array<IWeather>): Array<IWeather> => {
        // прогноз на следующий день
        return items.filter((item) => item.dt_txt?.includes(getTomorrowDate()))
    }

    const fetchAllData = (): void => {
        setErrorStatus(200)
        setLoading(true)

        Promise.all([
            fetchCurrentWeather(location),
            fetchFiveDayForecast(location),
            fetchWeatherInOtherCities(),
        ])
            .then((data) => {
                setWeatherData({
                    currentWeather: data[0].currentWeather,
                    fiveDayForecast: data[1].fiveDayForecast,
                    weatherTomorrow: getWeatherForTomorrow(data[1].fiveDayForecast),
                    weatherInCities: data[2],
                })
            })
            .catch((e: unknown) => {
                const error = e as AxiosError

                console.error(error)

                setErrorStatus(error.response?.status || 401)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchAllData()
    }, [location])

    return { weatherData, errorStatus, loading }
}
