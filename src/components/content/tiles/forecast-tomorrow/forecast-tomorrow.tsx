import { memo } from 'react'
import { IWeatherItem } from '../../../../typings/typings'
import { generateForecastTomorrowMessage } from '../../../../utils/generate-message-text'
import { TextBlock } from '../text-block/text-block'
import styles from './forecast-tomorrow.module.scss'

interface ForecastTomorrowProps {
    curTemp: number
    tempUnit: string
    list: Array<IWeatherItem>
}

function ForecastTomorrow({ curTemp, tempUnit, list }: ForecastTomorrowProps) {
    const message = generateForecastTomorrowMessage(curTemp, tempUnit, list)

    return (
        <TextBlock
            message={message.message}
            img={message.icon + 'Tomorrow'}
            classes={[styles.forecastTomorrow]}
        />
    )
}

export default memo(ForecastTomorrow)
