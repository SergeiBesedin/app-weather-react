import React from 'react'
import { IWeather } from '../../../typings/typings'
import { generateMessageText } from '../../../utils/generate-message-text'
import { getIcon } from '../../../utils/get-icon'
import { Image } from '../../ui/image/image'
import styles from './weather-tomorrow.module.scss'

interface WeatherTomorrowProps {
    curTemp: number
    tempUnit: string
    list: Array<IWeather>
}

function WeatherTomorrow({ curTemp, tempUnit, list }: WeatherTomorrowProps) {
    const message = generateMessageText(curTemp, tempUnit, list)

    return (
        <div className={styles.weatherTomorrow}>
            <div className={styles.container}>
                <Image
                    alt={message.type}
                    src={getIcon(message.type + 'tomorrow')}
                    classes={[styles.picture]}
                />
                <p className={styles.message}>{message.message}</p>
            </div>
        </div>
    )
}

export default React.memo(WeatherTomorrow)
