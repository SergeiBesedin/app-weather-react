import { useCurrentWeather } from '../../hooks/weather-data'
import styles from './content.module.scss'

export function Content() {
    const { weatherData } = useCurrentWeather()

    return <main className={styles.main}></main>
}
