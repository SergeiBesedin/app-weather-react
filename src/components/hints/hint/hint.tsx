import styles from './hint.module.scss'

interface HintProps {
    city: string
    clickOnHint: (value: string) => void
}

export function Hint({ city, clickOnHint }: HintProps) {
    return (
        <li className={styles.hint} onClick={() => clickOnHint(city)}>
            {city}
        </li>
    )
}
