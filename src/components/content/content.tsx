import React from 'react'
import { useSettingsProvider } from '../../context/settings-context'
import { useLocationProvider } from '../../context/location-context'
import { useGetWeatherData } from '../../data/weather-data'
import { CurrentWeather } from './current-weather/current-weather'
import HourlyForecast from './hourly-forecast/hourly-forecast'
import ForecastTomorrow from './forecast-tomorrow/forecast-tomorrow'
import RecommendedClothing from './recommended-clothing/recommended-clothing'
import FiveDayForecast from './five-day-forecast/five-day-forecast'
import { ErrorComp } from '../error-comp/error-comp'
import { Loader } from '../ui/loader/loader'
import styles from './content.module.scss'

function Content() {
    const { units } = useSettingsProvider()
    const { location } = useLocationProvider()

    const { weatherData, fiveDayForecast, weatherTomorrow, loading, error } =
        useGetWeatherData(location)

    const classNames = [styles.content, 'container'].join(' ')

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorComp error={error} />
    }

    if (!weatherData || !weatherTomorrow || !fiveDayForecast) {
        return <></>
    }

    return (
        <div className={classNames}>
            <div className={styles.leftColumn}>
                <CurrentWeather {...weatherData} units={units} />
                <RecommendedClothing
                    feelsLikeTemp={weatherData.temp.feels_like}
                    tempUnit={units.temp}
                />
            </div>
            <div className={styles.rightColumn}>
                <HourlyForecast items={fiveDayForecast} tempUnit={units.temp} />
                <ForecastTomorrow
                    curTemp={weatherData.temp.temp}
                    tempUnit={units.temp}
                    list={weatherTomorrow}
                />
                <FiveDayForecast items={fiveDayForecast} tempUnit={units.temp} />
            </div>
        </div>
    )
}

export default React.memo(Content)
