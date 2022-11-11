import { Tile } from '../tile/tile'
import { Image } from '../../ui/image/image'
import { ICurrentWeather } from '../../../typings/typings'
import { unitFormat } from '../../../utils/utils'
import { getIcon } from '../../../utils/get-icon'
import styles from './current-weather.module.scss'

type CurrentWeatherProps = ICurrentWeather & {
    units: { [key: string]: string }
}

export function CurrentWeather({
    city,
    weatherName,
    weatherDesc,
    temp,
    wind,
    dateTime,
    units,
}: CurrentWeatherProps) {
    const title = `Сегодня, ${dateTime}`
    const temperature = unitFormat(temp.temp, units.temp)
    const windSpeed = unitFormat(wind, units.speed)
    const pressure = unitFormat(temp.pressure, units.pressure)

    return (
        <Tile title={title} classes={[styles.currentWeather]}>
            <div className={styles.weather}>
                <div className={styles.city}>{city}</div>
                <div className={styles.temp}>{temperature}</div>
                <div className={styles.description}>{weatherDesc}</div>
                <Image alt={weatherName} src={getIcon(weatherName)} classes={[styles.picture]} />
            </div>
            <div className={styles.status}>
                <div className={styles.humidity}>{temp.humidity}%</div>
                <div className={styles.wind}>{windSpeed}</div>
                <div className={styles.pressure}>{pressure}</div>
            </div>
        </Tile>
    )
}
