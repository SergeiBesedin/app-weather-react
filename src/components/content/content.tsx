import { useCurrentWeather } from '../../hooks/weather-data'
import { CurrentWeather } from './current-weather/current-weather'
import styles from './content.module.scss'

export function Content() {
    const { weatherData } = useCurrentWeather()
    const className = [styles.content, 'container'].join(' ')

    return <div className={className}>{weatherData && <CurrentWeather {...weatherData} />}</div>
}
