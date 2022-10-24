import { Tile } from '../tile/tile'
import { Image } from '../../ui/image/image'
import { ICurrentWeather } from '../../../typings/typings'
import { unitFormat } from '../../../utils/utils'
import { getIcon } from '../../../utils/get-icon'
import styles from './currentWeather.module.scss'

type CurrentWeather = ICurrentWeather & {
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
}: CurrentWeather) {
    const title = `Сегодня, ${dateTime}`
    const temperature = unitFormat(temp.temp, units.temp)
    const windSpeed = unitFormat(wind, units.speed)
    const pressure = unitFormat(temp.pressure, units.pressure)

    return (
        <Tile title={title} classes={[styles.tileContainer]}>
            <div className={styles.weather}>
                <div>
                    <div className={styles.city}>{city}</div>
                    <div className={styles.temp}>{temperature}</div>
                    <div className={styles.description}>{weatherDesc}</div>
                </div>
                <div className={styles.picture}>
                    <Image alt={weatherName} src={getIcon(weatherName)} classes={['']} />
                </div>
            </div>
            <div className={styles.status}>
                <div className={styles.humidity}>{temp.humidity}%</div>
                <div className={styles.wind}>{windSpeed}</div>
                <div className={styles.pressure}>{pressure}</div>
            </div>
        </Tile>
    )
}
