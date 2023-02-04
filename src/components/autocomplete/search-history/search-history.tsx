import { HistoryItem } from './history-item/history-item'
import styles from './search-history.module.scss'

interface SearchHistoryProps {
    history: Array<string>
    clickOnHint: (value: string) => void
}

export function SearchHistory({ history, clickOnHint }: SearchHistoryProps) {
    const title = 'История поиска'
    const key = Date.now()

    return (
        <div className={styles.history}>
            <h3>{title}</h3>
            <ul>
                {history.map((item, index) => (
                    <HistoryItem key={key + index} item={item} clickOnHint={clickOnHint} />
                ))}
            </ul>
        </div>
    )
}
