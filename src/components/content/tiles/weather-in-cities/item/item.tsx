import { unitFormat, TemperatureUnits } from '../../../../../utils/utils'
import { getIcon } from '../../../../../utils/get-icon'
import { Image } from '../../../../ui/index'
import styles from './item.module.scss'

interface ItemProps {
    city: string
    tempMin: number
    tempMax: number
    weather: string
    tempUnit: TemperatureUnits
}

export function Item({ city, tempMin, tempMax, weather, tempUnit }: ItemProps) {
    const tMin = unitFormat(tempMin, tempUnit)
    const tMax = unitFormat(tempMax, tempUnit)

    const icon = getIcon(weather.toLowerCase() + 'Mini')

    return (
        <li className={styles.item}>
            <div className={styles.city}>{city}</div>

            <Image alt={weather} src={icon} classes={[styles.picture]} />

            <div className={styles.temp}>
                <span className={styles.min}>{tMin}</span>
                <span className={styles.max}>{tMax}</span>
            </div>
        </li>
    )
}
