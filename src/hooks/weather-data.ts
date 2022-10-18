import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { IWeather } from '../typings/typings'
import axios from '../axios/axios'

export const useCurrentWeather = () => {
    const [weatherData, setWeatherData] = useState<IWeather>()
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState('')

    const API_KEY = process.env.REACT_APP_API_KEY

    const fetchData = async () => {
        try {
            // setError('')
            // setLoading(true)
            const city = 'москва'
            const url = `weather?q=${city}&lang=ru&appid=${API_KEY}`
            const response = await axios.get<IWeather>(url)
            setWeatherData(response.data)
            // setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            console.log(error)
            // setLoading(false)
            // setError(error.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // return { weatherData, error, loading }

    return { weatherData }
}
