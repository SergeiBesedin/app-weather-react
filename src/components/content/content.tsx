import { useSettingsProvider } from '../../context/settings-context'
import { useLocationProvider } from '../../context/location-context'
import { useGetWeatherData } from '../../service/weather-data'
import {
    CurrentWeather,
    FiveDayForecast,
    HourlyForecast,
    ForecastTomorrow,
    RecommendedClothing,
    SunriseSunsetTimes,
    WeatherInCities,
} from './tiles/index'
import { ErrorComp } from './error-comp/error-comp'
import { Loader } from '../ui/index'
import styles from './content.module.scss'

export function Content() {
    const { units } = useSettingsProvider()
    const { location } = useLocationProvider()

    const { weatherData, loading, errorStatus } = useGetWeatherData(location)

    const classNames = [styles.content, 'container'].join(' ')

    if (loading) {
        return <Loader />
    }

    if (errorStatus !== 200) {
        return <ErrorComp status={errorStatus} />
    }

    if (!weatherData) {
        return <></>
    }

    const { currentWeather, fiveDayForecast, weatherTomorrow, weatherInCities } = weatherData

    return (
        <div className={classNames}>
            <div className={styles.leftColumn}>
                <CurrentWeather {...currentWeather} units={units} />
                <SunriseSunsetTimes
                    sunrise={currentWeather.sunrise}
                    sunset={currentWeather.sunset}
                    timezone={currentWeather.timezone}
                />
                <WeatherInCities cities={weatherInCities} tempUnit={units.temp} />
                <RecommendedClothing
                    feelsLikeTemp={currentWeather.temp.feels_like}
                    tempUnit={units.temp}
                />
            </div>

            <div className={styles.rightColumn}>
                <HourlyForecast items={fiveDayForecast} tempUnit={units.temp} />
                <ForecastTomorrow
                    curTemp={currentWeather.temp.temp}
                    tempUnit={units.temp}
                    list={weatherTomorrow}
                />
                <FiveDayForecast items={fiveDayForecast} tempUnit={units.temp} />
            </div>
        </div>
    )
}
