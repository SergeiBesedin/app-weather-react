import { useContext } from 'react'
import { SettingsContext } from '../../context/settings-context'
import { useCurrentWeather, useFiveDayForecast } from '../../hooks/weather-data'
import { CurrentWeather } from './current-weather/current-weather'
import { HourlyForecast } from './hourly-forecast/hourly-forecast'
import styles from './content.module.scss'

export function Content() {
    const { units } = useContext(SettingsContext)
    const { weatherData } = useCurrentWeather()
    const { fiveDayForecast } = useFiveDayForecast()
    const classNames = [styles.content, 'container'].join(' ')

    return (
        <div className={classNames}>
            <div className={styles.currentWeatherBlock}>
                {weatherData && <CurrentWeather {...weatherData} units={units} />}
                {fiveDayForecast && (
                    <HourlyForecast items={fiveDayForecast} tempUnit={units.temp} />
                )}
            </div>
        </div>
    )
}
