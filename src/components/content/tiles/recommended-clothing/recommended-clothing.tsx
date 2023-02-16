import { memo } from 'react'
import { TextBlock } from '../text-block/text-block'
import { generateRecommendedClothingMessage } from '../../../../utils/generate-message-text'
import styles from './recommended-clothing.module.scss'

interface RecommendedClothingProps {
    feelsLikeTemp: number
    tempUnit: string
}

function RecommendedClothing({ feelsLikeTemp, tempUnit }: RecommendedClothingProps) {
    const message = generateRecommendedClothingMessage(feelsLikeTemp, tempUnit)

    return (
        <TextBlock
            message={message.message}
            img={message.icon}
            classes={[styles.recommendedClothing]}
        />
    )
}

export default memo(RecommendedClothing)
