import { getIcon } from '../../../../utils/get-icon'
import { Image } from '../../../ui/index'
import styles from './text-block.module.scss'

interface TextBlockProps {
    message: string
    img: string
    classes: string[]
}

export function TextBlock({ classes, message, img }: TextBlockProps) {
    const classNames = [styles.textBlock, ...classes].join(' ')

    const icon = getIcon(img)

    return (
        <div className={classNames}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <Image alt={img} src={icon} classes={[styles.picture]} />
                    <p className={styles.message}>{message}</p>
                </div>
            </div>
        </div>
    )
}
