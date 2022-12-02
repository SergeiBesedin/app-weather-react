import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { axiosOpenWeather, axiosDaData } from '../axios/axios'
import { IWeather, IFiveDayForecast, ICurrentWeather } from '../typings/typings'
import { dateFormat } from '../utils/utils'

const API_OW_KEY = process.env.REACT_APP_OW_API_KEY // ключ для сервиса OpenWeather
const API_DADATA_KEY = process.env.REACT_APP_DD_API_KEY // ключ для сервиса DaData
const USER_LOCATION_KEY = 'user_location'

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
                setError(error.message)
            })
    }

    const getUserLocation = () => {
        const location = checkLocationInStorage()
        if (location) {
            setLocation(location)
        } else {
            navigator.geolocation.getCurrentPosition(async (position) => {
                // выполняется, если пользователей дает доступ к местоположению
                const city: string = await getCityName(
                    position.coords.latitude,
                    position.coords.longitude,
                )
                localStorage.setItem(USER_LOCATION_KEY, city)
                setLocation(city)
            })
        }
    }

    const checkLocationInStorage = () => {
        return localStorage.getItem(USER_LOCATION_KEY)
    }

    const getCityName = async (lat: number, lon: number) => {
        // обратное геокодирование. Передаем сервису широту и долготу, чтобы получить местоположение (название города) пользователя
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

    // При первом рендере пытаемся узнать местоположение пользователя
    useEffect(() => {
        getUserLocation()
    }, [])

    useEffect(() => {
        fetchAllData()
    }, [location])

    return { weatherData, fiveDayForecast, error, loading }
}
