import React from 'react'
import { IWeather } from '../../../typings/typings'
import styles from './weather-tomorrow.module.scss'

interface WeatherTomorrowProps {
    curTemp: number
    tempUnit: string
    list: Array<IWeather>
}

function WeatherTomorrow({ curTemp, tempUnit, list }: WeatherTomorrowProps) {
    const listItem = list.find((item) => item.dt_txt?.includes('12:00:00')) // находим нужную временную метку
    const tempCurrent =
        tempUnit === 'fahrenheit' ? Math.round(curTemp * (9 / 5) + 32) : Math.round(curTemp)
    const tempTomorrow =
        tempUnit === 'fahrenheit'
            ? Math.round(listItem!.main.temp * (9 / 5) + 32)
            : Math.round(listItem!.main.temp)

    const difference = Math.abs(tempCurrent - tempTomorrow) // считаем разницу в температуре

    // TODO рефактор
    const message = []

    if (tempCurrent > difference) {
        message.push(`Завтра ${tempTomorrow}°, на ${difference}° холоднее, чем сегодня`)
    } else if (tempCurrent === difference) {
        message.push('Завтра будет такая же температура, как и сегодня')
    } else {
        message.push(`Завтра ${tempTomorrow}°, на ${difference}° теплее, чем сегодня`)
    }

    return (
        <div className={styles.weatherTomorrow}>
            <div className={styles.container}>
                <p>{message.join(';')}</p>
            </div>
        </div>
    )
}

export default React.memo(WeatherTomorrow)
