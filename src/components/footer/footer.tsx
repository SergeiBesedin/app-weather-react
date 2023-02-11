import styles from './footer.module.scss'

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <p className={styles.copyright}>2023 г. Все права защищены</p>
            </div>
        </footer>
    )
}
