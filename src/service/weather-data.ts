import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { axiosOpenWeather } from '../axios/axios'
import { useSearchHistory } from '../hooks/use-search-history'
import { IWeather, IFiveDayForecast, ICurrentWeather } from '../typings/typings'
import { getTomorrowDate } from '../utils/utils'

type WeatherData = {
    currentWeather: ICurrentWeather
    fiveDayForecast: Array<IWeather>
    weatherTomorrow: Array<IWeather>
}

export function useGetWeatherData(location: string) {
    const [weatherData, setWeatherData] = useState<WeatherData>()
    const [loading, setLoading] = useState(false)
    const [errorStatus, setErrorStatus] = useState(200)

    const { saveToHistory } = useSearchHistory()

    const fetchCurrentWeather = async (): Promise<{ currentWeather: ICurrentWeather }> => {
        // получаем данные для карточки с текущей погодой
        const url = `weather?q=${location}`

        const response = await axiosOpenWeather.get<IWeather>(url)

        const currentWeather = {
            city: response.data.name,
            weatherName: response.data.weather[0].main,
            weatherDesc: response.data.weather[0].description,
            temp: response.data.main,
            wind: response.data.wind.speed,
            dateTime: response.data.dt,
            sunrise: response.data.sys.sunrise,
            sunset: response.data.sys.sunset,
        }

        saveToHistory(response.data.name)

        return { currentWeather }
    }

    const fetchFiveDayForecast = async (): Promise<{
        fiveDayForecast: Array<IWeather>
    }> => {
        // получаем данные с почасовым прогнозом на 5 дней
        const url = `forecast?q=${location}`

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

        Promise.all([fetchCurrentWeather(), fetchFiveDayForecast()])
            .then((data) => {
                setWeatherData({
                    currentWeather: data[0].currentWeather,
                    fiveDayForecast: data[1].fiveDayForecast,
                    weatherTomorrow: getWeatherForTomorrow(data[1].fiveDayForecast),
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
