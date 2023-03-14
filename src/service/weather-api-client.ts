// import { AxiosError } from 'axios'
import { axiosOpenWeather } from '../axios/axios'
import { ICurrentWeatherResponse, ICurrentWeather } from '../typings/typings'

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
    }

    const fetchFiveDayForecast = async (
        city: string,
    ): Promise<{
        fiveDayForecast: Array<ICurrentWeatherResponse>
    }> => {
        // получаем данные с почасовым прогнозом на 5 дней
        const url = `forecast?q=${city}`

        const response = await axiosOpenWeather.get<IFiveDayForecastResponse>(url)

        return { fiveDayForecast: response.data.list }
    }

    return { fetchCurrentWeather, fetchFiveDayForecast }
}
