import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { axiosOpenWeather } from '../axios/axios'
import { IWeather, IFiveDayForecast, ICurrentWeather } from '../typings/typings'
import { dateFormat, getTomorrowDate } from '../utils/utils'

const API_OW_KEY = process.env.REACT_APP_OW_API_KEY // ключ для сервиса OpenWeather

type WeatherData = {
    currentWeather: ICurrentWeather
    fiveDayForecast: Array<IWeather>
    weatherTomorrow: Array<IWeather>
}

export function useGetWeatherData(location: string) {
    const [weatherData, setWeatherData] = useState<WeatherData>()
    const [loading, setLoading] = useState(false)
    const [errorStatus, setErrorStatus] = useState(200)

    const fetchCurrentWeather = async (): Promise<{ currentWeather: ICurrentWeather }> => {
        // получаем данные для карточки с текущей погодой
        const url = `weather?q=${location}&lang=ru&appid=${API_OW_KEY}&units=metric`

        const response = await axiosOpenWeather.get<IWeather>(url)

        const currentWeather = {
            city: response.data.name,
            weatherName: response.data.weather[0].main,
            weatherDesc: response.data.weather[0].description,
            temp: response.data.main,
            wind: response.data.wind.speed,
            dateTime: dateFormat(response.data.dt * 1000, {
                month: 'long',
                day: 'numeric',
            }),
        }

        return { currentWeather }
    }

    const fetchFiveDayForecast = async (): Promise<{
        fiveDayForecast: Array<IWeather>
    }> => {
        // получаем данные с почасовым прогнозом на 5 дней
        const url = `forecast?q=${location}&lang=ru&units=metric&appid=${API_OW_KEY}`

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
                const weatherTomorrow = getWeatherForTomorrow(data[1].fiveDayForecast)

                setWeatherData({
                    currentWeather: data[0].currentWeather,
                    fiveDayForecast: data[1].fiveDayForecast,
                    weatherTomorrow,
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
