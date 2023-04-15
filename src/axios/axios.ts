import axios from 'axios'
import { API_OW_KEY, API_DADATA_KEY } from './api-keys'

export const axiosOpenWeather = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',

    params: {
        appid: API_OW_KEY,
        lang: 'ru',
        units: 'metric',
    },
})

export const axiosDaData = axios.create({
    baseURL: 'https://suggestions.dadata.ru/',

    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${API_DADATA_KEY}`,
    },
})
