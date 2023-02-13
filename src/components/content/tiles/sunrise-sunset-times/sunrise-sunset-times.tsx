import { dateFormat } from '../../../../utils/utils'
import { TileWrapper } from '../tile-wrapper/tile-wrapper'
import { Image } from '../../../ui/index'
import { getIcon } from '../../../../utils/get-icon'
import styles from './sunrise-sunset-times.module.scss'

interface SunriseSunsetTimesProps {
    sunrise: number
    sunset: number
}

export function SunriseSunsetTimes({ sunrise, sunset }: SunriseSunsetTimesProps) {
    const sunriseTime = dateFormat(sunrise * 1000, {
        hour: '2-digit',
        minute: '2-digit',
    })

    const sunsetTime = dateFormat(sunset * 1000, {
        hour: '2-digit',
        minute: '2-digit',
    })

    return (
        <TileWrapper classes={[styles.sunriseSunsetTimes]}>
            <div className={styles.wrapper}>
                <div className={styles.sunrise}>
                    <Image alt="восход" src={getIcon('sunrise')} classes={[styles.picture]} />
                    <div className={styles.title}>Восход</div>
                    <div className={styles.time}>{sunriseTime}</div>
                </div>

                <div className={styles.arrow}></div>

                <div className={styles.sunset}>
                    <Image alt="закат" src={getIcon('sunset')} classes={[styles.picture]} />
                    <div className={styles.title}>Закат</div>
                    <div className={styles.time}>{sunsetTime}</div>
                </div>
            </div>
        </TileWrapper>
    )
}
