import { ReactComponent as ErrorIcon } from '../../assets/icons/connection-error.svg'
import styles from './error.module.scss'

interface ErrorMessageProps {
    error: string
}

export function ErrorComp({ error }: ErrorMessageProps) {
    const classNames = ['container', styles.container].join(' ')
    const title = 'Сервис погоды временно недоступен'

    return (
        <div className={styles.error}>
            <div className={classNames}>
                <div className={styles.wrapper}>
                    <ErrorIcon />
                </div>
                <div>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.message}>{error}</p>
                </div>
            </div>
        </div>
    )
}
