import { memo } from 'react'
import { TemperatureUnits } from '../../../../utils/utils'
import { TextBlock } from '../text-block/text-block'
import { generateRecommendedClothingMessage } from '../../../../utils/generate-message-text'
import styles from './recommended-clothing.module.scss'

interface RecommendedClothingProps {
    feelsLikeTemp: number
    tempUnit: TemperatureUnits
}

function RecommendedClothing({ feelsLikeTemp, tempUnit }: RecommendedClothingProps) {
    const message = generateRecommendedClothingMessage(feelsLikeTemp, tempUnit)

    const icon = message.icon

    return <TextBlock message={message.message} img={icon} classes={[styles.recommendedClothing]} />
}

export default memo(RecommendedClothing)
