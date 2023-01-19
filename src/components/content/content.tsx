import React, { useContext } from 'react'
import { SettingsContext } from '../../context/settings-context'
import { LocationContext } from '../../context/location-context'
import { getWeatherData } from '../../data/weather-data'
import { CurrentWeather } from './current-weather/current-weather'
import HourlyForecast from './hourly-forecast/hourly-forecast'
import ForecastTomorrow from './forecast-tomorrow/forecast-tomorrow'
import RecommendedClothing from './recommended-clothing/recommended-clothing'
import FiveDayForecast from './five-day-forecast/five-day-forecast'
import { ErrorComp } from '../error-comp/error-comp'
import { Loader } from '../ui/loader/loader'
import styles from './content.module.scss'

function Content() {
    const { units } = useContext(SettingsContext)
    const { location } = useContext(LocationContext)

    const { weatherData, fiveDayForecast, weatherTomorrow, loading, error } =
        getWeatherData(location)

    const classNames = [styles.content, 'container'].join(' ')

    // TODO рефакторинг
    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <ErrorComp error={error} />
            ) : (
                <div className={classNames}>
                    <div className={styles.leftColumn}>
                        {weatherData && <CurrentWeather {...weatherData} units={units} />}
                        {weatherData && (
                            <RecommendedClothing
                                feelsLikeTemp={weatherData.temp.feels_like}
                                tempUnit={units.temp}
                            />
                        )}
                    </div>
                    <div className={styles.rightColumn}>
                        {fiveDayForecast && (
                            <HourlyForecast items={fiveDayForecast} tempUnit={units.temp} />
                        )}
                        {weatherTomorrow && weatherData && (
                            <ForecastTomorrow
                                curTemp={weatherData.temp.temp}
                                tempUnit={units.temp}
                                list={weatherTomorrow}
                            />
                        )}
                        {fiveDayForecast && (
                            <FiveDayForecast items={fiveDayForecast} tempUnit={units.temp} />
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default React.memo(Content)
