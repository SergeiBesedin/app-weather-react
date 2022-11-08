import { useContext } from 'react'
import { SettingsContext } from '../../context/settings-context'
import { useCurrentWeather, useFiveDayForecast } from '../../hooks/weather-data'
import { CurrentWeather } from './current-forecast/current-weather'
import styles from './content.module.scss'

export function Content() {
    const { units } = useContext(SettingsContext)
    const { weatherData } = useCurrentWeather()
    const { fiveDayForecast } = useFiveDayForecast()
    const classNames = [styles.content, 'container'].join(' ')

    return (
        <div className={classNames}>
            {weatherData && <CurrentWeather {...weatherData} units={units} />}
        </div>
    )
}
