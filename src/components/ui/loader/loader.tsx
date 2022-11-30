import styles from './loader.module.scss'

export function Loader() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}></div>
        </div>
    )
}
