import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { IWeather, IFiveDayForecast, ICurrentWeather } from '../typings/typings'
import { dateFormat } from '../utils/utils'
import axios from '../axios/axios'

const API_KEY = process.env.REACT_APP_API_KEY

export const useCurrentWeather = () => {
    const [weatherData, setWeatherData] = useState<ICurrentWeather>()
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            // setError('')
            // setLoading(true)

            const city = 'Москва' // по умолчанию - Москва

            const url = `weather?q=${city}&lang=ru&appid=${API_KEY}&units=metric`
            const response = await axios.get<IWeather>(url)
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
            // setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            console.log(error)
            // setLoading(false)
            // setError(error.message)
        }
    }

    // const getUserLocation = () => {
    //     return navigator.geolocation.getCurrentPosition((position) => {
    //         return `&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
    //     })
    // }

    useEffect(() => {
        fetchData()
    }, [])

    // return { weatherData, error, loading }

    return { weatherData }
}

export const useFiveDayForecast = () => {
    const [fiveDayForecast, setFiveDayForecast] = useState<Array<IWeather>>()

    const fetchData = async () => {
        try {
            const city = 'москва' // для теста
            const url = `forecast?q=${city}&lang=ru&units=metric&appid=${API_KEY}`
            const response = await axios.get<IFiveDayForecast>(url)
            setFiveDayForecast(response.data.list)
        } catch (e: unknown) {
            const error = e as AxiosError
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { fiveDayForecast }
}
