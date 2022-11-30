import styles from './error.module.scss'

interface ErrorMessageProps {
    error: string
}

export function ErrorComp({ error }: ErrorMessageProps) {
    const title = 'Сервис погоды временно недоступен'

    return (
        <div className={styles.error}>
            <div className={styles.container}>
                <div className={styles.picture}></div>
                <div>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.message}>{error}</p>
                </div>
            </div>
        </div>
    )
}
