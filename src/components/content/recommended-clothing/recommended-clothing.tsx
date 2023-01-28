import { memo } from 'react'
import { TextBlock } from '../text-block/text-block'
import { generateRecommendedClothingMessage } from '../../../utils/generate-message-text'

interface RecommendedClothingProps {
    feelsLikeTemp: number
    tempUnit: string
}

function RecommendedClothing({ feelsLikeTemp, tempUnit }: RecommendedClothingProps) {
    const message = generateRecommendedClothingMessage(feelsLikeTemp, tempUnit)

    return <TextBlock message={message.message} img={message.icon} />
}

export default memo(RecommendedClothing)
