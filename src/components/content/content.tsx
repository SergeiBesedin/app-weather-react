import { useContext } from 'react'
import { SettingsContext } from '../../context/settings-context'
import { useDataWeather } from '../../hooks/weather-data'
import { CurrentWeather } from './current-weather/current-weather'
import { HourlyForecast } from './hourly-forecast/hourly-forecast'
import { FiveDayForecast } from './five-day-forecast/five-day-forecast'
import { ErrorComp } from '../error-comp/error-comp'
import { Loader } from '../ui/loader/loader'
import styles from './content.module.scss'

export function Content() {
    const { units } = useContext(SettingsContext)
    const { weatherData, fiveDayForecast, loading, error } = useDataWeather()
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
                    <div className={styles.currentWeatherBlock}>
                        {weatherData && <CurrentWeather {...weatherData} units={units} />}
                        {fiveDayForecast && (
                            <HourlyForecast items={fiveDayForecast} tempUnit={units.temp} />
                        )}
                    </div>
                    {fiveDayForecast && (
                        <FiveDayForecast items={fiveDayForecast} tempUnit={units.temp} />
                    )}
                </div>
            )}
        </>
    )
}
