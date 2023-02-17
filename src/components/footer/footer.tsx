import styles from './footer.module.scss'

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <p className={styles.copyright}>
                    <span>2022-2023 г.</span>
                    <span>Все права защищены</span>
                </p>
            </div>
        </footer>
    )
}
