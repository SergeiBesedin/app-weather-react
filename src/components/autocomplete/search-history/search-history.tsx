import { HistoryItem } from './history-item/history-item'
import styles from './search-history.module.scss'

interface SearchHistoryProps {
    history: Array<string>
}

export function SearchHistory({ history }: SearchHistoryProps) {
    const title = 'История поиска'

    return (
        <div className={styles.history}>
            <h3>{title}</h3>
            <ul>
                {history.map((item, index) => (
                    <HistoryItem key={index} item={item} />
                ))}
            </ul>
        </div>
    )
}
