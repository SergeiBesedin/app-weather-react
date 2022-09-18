import styles from './footer.module.scss'

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>2022 г. Все права защищены</p>
            </div>
        </footer>
    )
}
