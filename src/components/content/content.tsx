import React, { useContext } from 'react'
import { SettingsContext } from '../../context/settings-context'
import { useDataWeather } from '../../hooks/weather-data'
import { CurrentWeather } from './current-weather/current-weather'
import HourlyForecast from './hourly-forecast/hourly-forecast'
import WeatherTomorrow from './weather-tomorrow/weather-tomorrow'
import FiveDayForecast from './five-day-forecast/five-day-forecast'
import { ErrorComp } from '../error-comp/error-comp'
import { Loader } from '../ui/loader/loader'
import styles from './content.module.scss'

function Content() {
    const { units } = useContext(SettingsContext)
    const { weatherData, fiveDayForecast, weatherTomorrow, loading, error } = useDataWeather()
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
                    </div>
                    <div className={styles.rightColumn}>
                        {fiveDayForecast && (
                            <HourlyForecast items={fiveDayForecast} tempUnit={units.temp} />
                        )}
                        {weatherTomorrow && weatherData && (
                            <WeatherTomorrow
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
