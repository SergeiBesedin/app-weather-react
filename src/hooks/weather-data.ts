import { useState, useEffect } from 'react'
import axios from 'axios'
import { apiKey } from '../api/api-key'

export const useCurrentWeather = () => {
    const [weatherData, setWeatherData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setError('')
            setLoading(true)
            const city = 'москва'
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${apiKey}`
            const response = await axios.get(url)
            setWeatherData(response.data)
            setLoading(false)
        } catch (e) {
            // const error = e
            // setLoading(false)
            // setError(error.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { weatherData, error, loading }
}
