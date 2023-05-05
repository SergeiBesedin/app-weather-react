import { memo } from 'react'
import { IWeatherItem } from 'typings'
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

    const icon = message.icon + 'Tomorrow'

    return <TextBlock message={message.message} img={icon} classes={[styles.forecastTomorrow]} />
}

export default memo(ForecastTomorrow)
