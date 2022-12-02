import axios from 'axios'

export const axiosOpenWeather = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
})

export const axiosDaData = axios.create({
    baseURL: 'https://suggestions.dadata.ru/',
})
