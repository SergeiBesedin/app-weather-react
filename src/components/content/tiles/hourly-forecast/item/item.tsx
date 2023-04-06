import { unitFormat, dateFormat, TemperatureUnits } from '../../../../../utils/utils'
import { getIcon } from '../../../../../utils/get-icon'
import { Image } from '../../../../ui/index'
import styles from './item.module.scss'

interface ItemProps {
    timestamp: number
    temp: number
    weather: string
    tempUnit: TemperatureUnits
}

export function Item({ timestamp, temp, weather, tempUnit }: ItemProps) {
    const temperature = unitFormat(temp, tempUnit)

    const time = dateFormat(timestamp * 1000, {
        hour: '2-digit',
        minute: '2-digit',
    })

    const icon = getIcon(weather.toLowerCase() + 'Mini')

    return (
        <li className={styles.item}>
            <div className={styles.time}>{time}</div>

            <Image alt={weather} src={icon} classes={[styles.picture]} />

            <div className={styles.temp}>{temperature}</div>
        </li>
    )
}
