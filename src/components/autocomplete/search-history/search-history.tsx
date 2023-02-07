import { HistoryItem } from './history-item/history-item'
import { Button } from '../../ui/button/button'
import styles from './search-history.module.scss'

interface SearchHistoryProps {
    history: Array<string>
    clickOnHint: (value: string) => void
    clearHistory: () => void
}

export function SearchHistory({ history, clickOnHint, clearHistory }: SearchHistoryProps) {
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
            <div className={styles.bottom}>
                <Button
                    type={'button'}
                    classes={[styles.clearBtn]}
                    disabled={false}
                    onClick={clearHistory}
                >
                    Очистить историю
                </Button>
            </div>
        </div>
    )
}
