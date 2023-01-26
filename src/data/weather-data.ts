import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { axiosOpenWeather } from '../axios/axios'
import { IWeather, IFiveDayForecast, ICurrentWeather } from '../typings/typings'
import { dateFormat, getTomorrowDate } from '../utils/utils'

const API_OW_KEY = process.env.REACT_APP_OW_API_KEY // ключ для сервиса OpenWeather

export const useGetWeatherData = (location: string) => {
    const [weatherData, setWeatherData] = useState<ICurrentWeather>()
    const [fiveDayForecast, setFiveDayForecast] = useState<Array<IWeather>>()
    const [weatherTomorrow, setWeatherTomorrow] = useState<Array<IWeather>>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const fetchCurrentWeather = async (): Promise<void> => {
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

        setWeatherData(currentWeather)
    }

    const fetchFiveDayForecast = async (): Promise<void> => {
        // получаем данные с почасовым прогнозом на 5 дней
        const url = `forecast?q=${location}&lang=ru&units=metric&appid=${API_OW_KEY}`
        const response = await axiosOpenWeather.get<IFiveDayForecast>(url)
        setFiveDayForecast(response.data.list)
        getWeatherForTomorrow(response.data.list)
    }

    const getWeatherForTomorrow = (items: Array<IWeather>): void => {
        // прогноз на следующий день
        const weatherTomorrowList = items.filter((item) => item.dt_txt?.includes(getTomorrowDate()))
        setWeatherTomorrow(weatherTomorrowList)
    }

    const fetchAllData = (): void => {
        setError('')
        setLoading(true)
        Promise.all([fetchCurrentWeather(), fetchFiveDayForecast()])
            .finally(() => setLoading(false))
            .catch((e: unknown) => {
                const error = e as AxiosError
                console.error(error)
                setError(error.message)
            })
    }

    useEffect(() => {
        fetchAllData()
    }, [location])

    return { weatherData, fiveDayForecast, weatherTomorrow, error, loading }
}
