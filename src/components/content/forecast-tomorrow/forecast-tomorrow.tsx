import { IWeather } from '../../../typings/typings'
import { generateForecastTomorrowMessage } from '../../../utils/generate-message-text'
import { TextBlock } from '../text-block/text-block'
// import styles from './weather-tomorrow.module.scss'

interface ForecastTomorrowProps {
    curTemp: number
    tempUnit: string
    list: Array<IWeather>
}

export function ForecastTomorrow({ curTemp, tempUnit, list }: ForecastTomorrowProps) {
    const message = generateForecastTomorrowMessage(curTemp, tempUnit, list)

    return (
        <>
            <TextBlock message={message.message} img={message.type + 'tomorrow'} />
        </>
    )
}
