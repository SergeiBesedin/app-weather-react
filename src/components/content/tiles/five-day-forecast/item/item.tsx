import {
    unitFormat,
    dateFormat,
    upperCaseFirst,
    TemperatureUnits,
} from '../../../../../utils/utils'
import { getIcon } from '../../../../../utils/get-icon'
import { Image } from '../../../../ui/index'
import styles from './item.module.scss'

interface ItemProps {
    timestamp: number
    tempMin: number
    tempMax: number
    weather: string
    tempUnit: TemperatureUnits
}

export function Item({ timestamp, tempMin, tempMax, weather, tempUnit }: ItemProps) {
    const tMin = unitFormat(tempMin, tempUnit)
    const tMax = unitFormat(tempMax, tempUnit)

    const dayOfTheWeek = upperCaseFirst(
        dateFormat(timestamp * 1000, {
            weekday: 'long',
        }),
    )

    const icon = getIcon(weather.toLowerCase() + 'Mini')

    return (
        <li className={styles.item}>
            <div className={styles.day}>{dayOfTheWeek}</div>

            <Image alt={weather} src={icon} classes={[styles.picture]} />

            <div className={styles.temp}>
                <span className={styles.min}>{tMin}</span>
                <span className={styles.max}>{tMax}</span>
            </div>
        </li>
    )
}
