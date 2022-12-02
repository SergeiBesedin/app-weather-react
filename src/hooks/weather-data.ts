import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { IWeather, IFiveDayForecast, ICurrentWeather } from '../typings/typings'
import { dateFormat } from '../utils/utils'
import { axiosOpenWeather, axiosDaData } from '../axios/axios'

const API_OW_KEY = process.env.REACT_APP_API_KEY // ключ для сервиса OpenWeather
const API_DADATA_KEY = process.env.REACT_APP_API_KEY2 // ключ для сервиса DaData

// TODO хранить местоположение юзера в ls

export const useDataWeather = () => {
    const [location, setLocation] = useState<string>('Москва')
    const [weatherData, setWeatherData] = useState<ICurrentWeather>()
    const [fiveDayForecast, setFiveDayForecast] = useState<Array<IWeather>>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchCurrentWeather = async () => {
        // получаем данные для карточки с текущей погодой
        const url = `weather?q=${location}&lang=ru&appid=${API_OW_KEY}&units=metric`
        const response = await axiosOpenWeather.get<IWeather>(url)
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
        // получаем данные с почасовым прогнозом на 5 дней
        const url = `forecast?q=${location}&lang=ru&units=metric&appid=${API_OW_KEY}`
        const response = await axiosOpenWeather.get<IFiveDayForecast>(url)
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

    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const city = await getCityName(position.coords.latitude, position.coords.longitude)
            setLocation(city)
        })
    }

    const getCityName = async (lat: number, lon: number) => {
        // обратное геокодирование. Передаем широту и долготу, чтобы получить местоположение (название города) пользователя
        const url = 'suggestions/api/4_1/rs/geolocate/address'
        const coords = { lat, lon }
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Token ${API_DADATA_KEY}`,
            },
        }
        const response = await axiosDaData.post(url, coords, options)
        return response.data.suggestions[0].data.city
    }

    useEffect(() => {
        fetchAllData()
        getUserLocation()
    }, [location])

    return { weatherData, fiveDayForecast, error, loading }
}
