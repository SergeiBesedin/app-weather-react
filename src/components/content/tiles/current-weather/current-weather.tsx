import { TileWrapper } from '../tile-wrapper/tile-wrapper'
import { Image } from '../../../ui/index'
import { ICurrentWeather } from '../../../../typings/typings'
import { dateFormat, unitFormat, upperCaseFirst, AllUnitsType } from '../../../../utils/utils'
import { getIcon } from '../../../../utils/get-icon'
import styles from './current-weather.module.scss'

interface CurrentWeatherProps extends ICurrentWeather {
    units: Record<string, AllUnitsType>
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
    const time = dateFormat(dateTime * 1000, {
        month: 'long',
        day: 'numeric',
    })

    const title = `Сегодня, ${time}`

    const temperature = unitFormat(temp.temp, units.temp)

    const windSpeed = unitFormat(wind, units.speed)

    const pressure = unitFormat(temp.pressure, units.pressure)

    const icon = getIcon(weatherName.toLowerCase())

    const weatherInUpperCase = upperCaseFirst(weatherDesc)

    return (
        <TileWrapper title={title} classes={[styles.currentWeather]}>
            <div className={styles.weather}>
                <div className={styles.city}>{city}</div>
                <div className={styles.temp}>{temperature}</div>
                <div className={styles.description}>{weatherInUpperCase}</div>

                <Image alt={weatherName} src={icon} classes={[styles.picture]} />
            </div>

            <div className={styles.status}>
                <div className={styles.humidity}>{temp.humidity}%</div>
                <div className={styles.wind}>{windSpeed}</div>
                <div className={styles.pressure}>{pressure}</div>
            </div>
        </TileWrapper>
    )
}
