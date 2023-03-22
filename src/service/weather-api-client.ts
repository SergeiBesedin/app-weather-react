import { AxiosError } from 'axios'
import { axiosOpenWeather } from '../axios/axios'
import { ICurrentWeatherResponse, ICurrentWeather, IWeatherInOtherCities } from '../typings/typings'

interface IFiveDayForecastResponse {
    cnt: number // Количество меток времени, возвращенных в ответе API
    list: Array<ICurrentWeatherResponse>
}

export function weatherApiClient() {
    const fetchCurrentWeather = async (
        city: string,
    ): Promise<{ currentWeather: ICurrentWeather }> => {
        // получаем данные для карточки с текущей погодой
        const url = `weather?q=${city}`

        try {
            const response = await axiosOpenWeather.get<ICurrentWeatherResponse>(url)

            const currentWeather: ICurrentWeather = {
                id: response.data.id,
                city: response.data.name,
                weatherName: response.data.weather[0].main,
                weatherDesc: response.data.weather[0].description,
                temp: response.data.main,
                wind: response.data.wind.speed,
                dateTime: response.data.dt,
                sunrise: response.data.sys.sunrise,
                sunset: response.data.sys.sunset,
                timezone: response.data.timezone,
            }

            return { currentWeather }
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                console.error(e)

                const error = JSON.stringify(e.response?.data)

                throw new Error(error)
            } else {
                const error = JSON.stringify({ cod: 401 })

                throw new Error(error)
            }
        }
    }

    const fetchFiveDayForecast = async (
        city: string,
    ): Promise<{
        fiveDayForecast: Array<ICurrentWeatherResponse>
    }> => {
        // получаем данные с почасовым прогнозом на 5 дней
        const url = `forecast?q=${city}`

        try {
            const response = await axiosOpenWeather.get<IFiveDayForecastResponse>(url)

            return { fiveDayForecast: response.data.list }
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                console.error(e)

                const error = JSON.stringify(e.response?.data)

                throw new Error(error)
            } else {
                const error = JSON.stringify({ cod: 401 })

                throw new Error(error)
            }
        }
    }

    const fetchWeatherInOtherCities = async (
        cities: Array<string>,
    ): Promise<Array<IWeatherInOtherCities>> => {
        const weatherInCities: Array<IWeatherInOtherCities> = []

        for (const city of cities) {
            const { currentWeather } = await fetchCurrentWeather(city)

            const data = {
                id: currentWeather.id,
                city: currentWeather.city,
                weatherName: currentWeather.weatherName,
                tempMax: currentWeather.temp.temp_max,
                tempMin: currentWeather.temp.temp_min,
            }

            weatherInCities.push(data)
        }

        return weatherInCities
    }

    return { fetchCurrentWeather, fetchFiveDayForecast, fetchWeatherInOtherCities }
}
