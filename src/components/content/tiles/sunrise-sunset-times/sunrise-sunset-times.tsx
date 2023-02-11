import { dateFormat } from '../../../../utils/utils'
import { TileWrapper } from '../tile-wrapper/tile-wrapper'
import styles from './sunrise-sunset-times.module.scss'

interface SunriseSunsetTimesProps {
    sunrise: number
    sunset: number
}

export function SunriseSunsetTimes({ sunrise, sunset }: SunriseSunsetTimesProps) {
    const title = 'Восход и закат солнца'

    const sunriseTime = dateFormat(sunrise * 1000, {
        hour: '2-digit',
        minute: '2-digit',
    })

    const sunsetTime = dateFormat(sunset * 1000, {
        hour: '2-digit',
        minute: '2-digit',
    })

    return (
        <TileWrapper title={title} classes={[styles.sunriseSunsetTimes]}>
            <div className={styles.wrapper}>
                <div className={styles.sunrise}>{sunriseTime}</div>
                <div className={styles.sunset}>{sunsetTime}</div>
            </div>
        </TileWrapper>
    )
}
