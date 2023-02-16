import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { axiosOpenWeather } from '../axios/axios'
import { IWeather, IFiveDayForecast, ICurrentWeather } from '../typings/typings'
import { useSearchHistory } from '../hooks/use-search-history'
import { getTomorrowDate } from '../utils/utils'

type WeatherData = {
    currentWeather: ICurrentWeather
    fiveDayForecast: Array<IWeather>
    weatherTomorrow: Array<IWeather>
    weatherInCities: Array<ICurrentWeather>
}

export function useGetWeatherData(location: string) {
    const [weatherData, setWeatherData] = useState<WeatherData>()
    const [loading, setLoading] = useState(false)
    const [errorStatus, setErrorStatus] = useState(200)

    const { saveToHistory } = useSearchHistory()

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

        saveToHistory(response.data.name)

        return { currentWeather }
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

    const fetchWeatherInCities = (): Promise<Array<ICurrentWeather>> => {
        return Promise.all([
            fetchCurrentWeather('Москва'),
            fetchCurrentWeather('Новосибирск'),
            fetchCurrentWeather('Владивосток'),
        ]).then((data) => data.map((el) => el.currentWeather))
    }

    const fetchAllData = (): void => {
        setErrorStatus(200)
        setLoading(true)

        Promise.all([
            fetchCurrentWeather(location),
            fetchFiveDayForecast(location),
            fetchWeatherInCities(),
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
