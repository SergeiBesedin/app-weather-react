import { useContext } from 'react'
import { SettingsContext } from '../../context/settings-context'
import { useCurrentWeather } from '../../hooks/weather-data'
import { CurrentWeather } from './current-weather/current-weather'
import styles from './content.module.scss'

export function Content() {
    const { tempUnit, unitSpeed } = useContext(SettingsContext)
    const { weatherData } = useCurrentWeather()
    const classNames = [styles.content, 'container'].join(' ')

    return (
        <div className={classNames}>
            {weatherData && (
                <CurrentWeather tempUnit={tempUnit} unitSpeed={unitSpeed} {...weatherData} />
            )}
        </div>
    )
}
