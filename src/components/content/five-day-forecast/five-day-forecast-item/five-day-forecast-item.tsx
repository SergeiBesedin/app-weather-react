import { unitFormat, dateFormat, ucFirst } from '../../../../utils/utils'
import { getIcon } from '../../../../utils/get-icon'
import { Image } from '../../../ui/image/image'
import styles from './five-day-forecast-item.module.scss'

interface FiveDayForecastItemProps {
    timestamp: number
    tempMin: number
    tempMax: number
    weather: string
    tempUnit: string
}

export function FiveDayForecastItem({
    timestamp,
    tempMin,
    tempMax,
    weather,
    tempUnit,
}: FiveDayForecastItemProps) {
    const tMin = unitFormat(tempMin, tempUnit)
    const tMax = unitFormat(tempMax, tempUnit)
    const dayOfTheWeek = ucFirst(
        dateFormat(timestamp * 1000, {
            weekday: 'long',
        }),
    )

    return (
        <li className={styles.item}>
            <div className={styles.day}>{dayOfTheWeek}</div>
            <Image alt={weather} src={getIcon(weather + 'mini')} classes={[styles.picture]} />
            <div className={styles.temp}>
                <span className={styles.min}>{tMin}</span>
                <span className={styles.max}>{tMax}</span>
            </div>
        </li>
    )
}
