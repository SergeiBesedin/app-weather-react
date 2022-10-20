import { Tile } from '../tile/tile'
import { ICurrentWeather } from '../../../typings/typings'
import styles from './currentWeather.module.scss'

const enum WeatherImage {
    'Clear',
    'Rain',
    'Clouds',
    'Snow',
    'Extreme',
}

export function CurrentWeather({ city, weather, temp, wind }: ICurrentWeather) {
    const title = 'Сегодня'

    return (
        <Tile title={title} classes={[styles.tileContainer]}>
            <div className={styles.city}>{city}</div>
            <div className={styles.temp}>{temp.temp}</div>
            <div className={styles.description}>{weather}</div>
            <div className={styles.status}>
                <div>{temp.humidity}%</div>
                <div>{wind}</div>
                <div>{temp.pressure}</div>
            </div>
        </Tile>
    )
}
