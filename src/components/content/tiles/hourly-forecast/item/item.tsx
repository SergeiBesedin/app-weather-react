import { unitFormat, dateFormat } from '../../../../../utils/utils'
import { getIcon } from '../../../../../utils/get-icon'
import { Image } from '../../../../ui/index'
import styles from './item.module.scss'

interface ItemProps {
    timestamp: number
    temp: number
    weather: string
    tempUnit: string
}

export function Item({ timestamp, temp, weather, tempUnit }: ItemProps) {
    const temperature = unitFormat(temp, tempUnit)
    const time = dateFormat(timestamp * 1000, {
        hour: '2-digit',
        minute: '2-digit',
    })

    return (
        <li className={styles.item}>
            <div className={styles.time}>{time}</div>
            <Image
                alt={weather}
                src={getIcon(weather.toLowerCase() + 'Mini')}
                classes={[styles.picture]}
            />
            <div className={styles.temp}>{temperature}</div>
        </li>
    )
}
