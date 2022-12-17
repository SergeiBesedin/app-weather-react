import { getIcon } from '../../../utils/get-icon'
import { Image } from '../../ui/image/image'
import styles from './text-block.module.scss'

interface TextBlockProps {
    message: string
    img: string
}

export function TextBlock({ message, img }: TextBlockProps) {
    return (
        <div className={styles.textBlock}>
            <div className={styles.container}>
                <Image alt={img} src={getIcon(img)} classes={[styles.picture]} />
                <p className={styles.message}>{message}</p>
            </div>
        </div>
    )
}
