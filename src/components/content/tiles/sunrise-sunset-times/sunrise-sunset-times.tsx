import { memo } from 'react'
import { dateFormat, getLocalTime } from '../../../../utils/utils'
import { getIcon } from '../../../../utils/get-icon'
import { TileWrapper } from '../tile-wrapper/tile-wrapper'
import { Image } from '../../../ui/index'
import styles from './sunrise-sunset-times.module.scss'

interface SunriseSunsetTimesProps {
    sunrise: number
    sunset: number
    timezone: number
}

function SunriseSunsetTimes({ sunrise, sunset, timezone }: SunriseSunsetTimesProps) {
    const sunriseTime = dateFormat(getLocalTime(sunrise, timezone), {
        hour: '2-digit',
        minute: '2-digit',
    })

    const sunsetTime = dateFormat(getLocalTime(sunset, timezone), {
        hour: '2-digit',
        minute: '2-digit',
    })

    return (
        <TileWrapper classes={[styles.sunriseSunsetTimes]}>
            <div className={styles.wrapper}>
                <div className={styles.sunrise}>
                    <Image alt="sunrise" src={getIcon('sunrise')} classes={[styles.picture]} />
                    <div className={styles.title}>Восход</div>
                    <div className={styles.time}>{sunriseTime}</div>
                </div>

                <div className={styles.arrow}></div>

                <div className={styles.sunset}>
                    <Image alt="sunset" src={getIcon('sunset')} classes={[styles.picture]} />
                    <div className={styles.title}>Закат</div>
                    <div className={styles.time}>{sunsetTime}</div>
                </div>
            </div>
        </TileWrapper>
    )
}

export default memo(SunriseSunsetTimes)
