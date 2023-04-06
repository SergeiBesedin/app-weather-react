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

const enum SunriseOrSunset {
    SUNRISE = 'sunrise',
    SUNSET = 'sunset',
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

    const sunriseIcon = getIcon(SunriseOrSunset.SUNRISE)

    const sunsetIcon = getIcon(SunriseOrSunset.SUNSET)

    return (
        <TileWrapper classes={[styles.sunriseSunsetTimes]}>
            <div className={styles.wrapper}>
                <div className={styles.sunrise}>
                    <Image
                        alt={SunriseOrSunset.SUNRISE}
                        src={sunriseIcon}
                        classes={[styles.picture]}
                    />
                    <div className={styles.title}>Восход</div>
                    <div className={styles.time}>{sunriseTime}</div>
                </div>

                <div className={styles.arrow}></div>

                <div className={styles.sunset}>
                    <Image
                        alt={SunriseOrSunset.SUNSET}
                        src={sunsetIcon}
                        classes={[styles.picture]}
                    />
                    <div className={styles.title}>Закат</div>
                    <div className={styles.time}>{sunsetTime}</div>
                </div>
            </div>
        </TileWrapper>
    )
}

export default memo(SunriseSunsetTimes)
