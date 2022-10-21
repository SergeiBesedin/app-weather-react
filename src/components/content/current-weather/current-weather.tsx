import { Tile } from '../tile/tile'
import { Image } from '../../ui/image/image'
import { ICurrentWeather } from '../../../typings/typings'
import { getIcon } from '../../../utils/get-icon'
import styles from './currentWeather.module.scss'

export function CurrentWeather({
    city,
    weatherName,
    weatherDesc,
    temp,
    wind,
    dateTime,
}: ICurrentWeather) {
    const title = `Сегодня, ${dateTime}`

    return (
        <Tile title={title} classes={[styles.tileContainer]}>
            <div className={styles.city}>{city}</div>
            <Image alt={weatherName} src={getIcon(weatherName)} classes={['']} />
            <div className={styles.temp}>{temp.temp}</div>
            <div className={styles.description}>{weatherDesc}</div>
            <div className={styles.status}>
                <div className={styles.humidity}>{temp.humidity}%</div>
                <div className={styles.wind}>{wind}</div>
                <div className={styles.pressure}>{temp.pressure}</div>
            </div>
        </Tile>
    )
}
