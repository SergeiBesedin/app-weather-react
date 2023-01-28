import { memo } from 'react'
import { IWeather } from '../../../typings/typings'
import { generateForecastTomorrowMessage } from '../../../utils/generate-message-text'
import { TextBlock } from '../text-block/text-block'

interface ForecastTomorrowProps {
    curTemp: number
    tempUnit: string
    list: Array<IWeather>
}

function ForecastTomorrow({ curTemp, tempUnit, list }: ForecastTomorrowProps) {
    const message = generateForecastTomorrowMessage(curTemp, tempUnit, list)

    return <TextBlock message={message.message} img={message.icon + 'Tomorrow'} />
}

export default memo(ForecastTomorrow)
