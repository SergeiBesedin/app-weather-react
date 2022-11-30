import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { IWeather, IFiveDayForecast, ICurrentWeather } from '../typings/typings'
import { dateFormat } from '../utils/utils'
import axios from '../axios/axios'

const API_KEY = process.env.REACT_APP_API_KEY

export const useDataWeather = () => {
    const [weatherData, setWeatherData] = useState<ICurrentWeather>()
    const [fiveDayForecast, setFiveDayForecast] = useState<Array<IWeather>>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const city = 'Москва' // по умолчанию - Москва

    const fetchCurrentWeather = async () => {
        // получаем данные для карточки с текущей погодой
        const url = `weather?q=${city}&lang=ru&appid=${API_KEY}&units=metric`
        const response = await axios.get<IWeather>(url)
        // оставляем только нужные для карточки поля
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

    const fetchFiveDayForecast = async () => {
        // получаем данные для карточки с почасовым прогнозом
        const url = `forecast?q=${city}&lang=ru&units=metric&appid=${API_KEY}`
        const response = await axios.get<IFiveDayForecast>(url)
        setFiveDayForecast(response.data.list)
    }

    const fetchAllData = () => {
        setError('')
        setLoading(true)
        Promise.all([fetchCurrentWeather(), fetchFiveDayForecast()])
            .finally(() => setLoading(false))
            .catch((e: unknown) => {
                const error = e as AxiosError
                setLoading(false)
                setError(error.message)
            })
    }

    useEffect(() => {
        fetchAllData()
    }, [])

    return { weatherData, fiveDayForecast, error, loading }
}
