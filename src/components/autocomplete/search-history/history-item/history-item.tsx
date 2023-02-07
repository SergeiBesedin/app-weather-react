import styles from './history-item.module.scss'

interface HistoryItemProps {
    item: string
    clickOnHint: (value: string) => void
}

export function HistoryItem({ item, clickOnHint }: HistoryItemProps) {
    return (
        <li className={styles.item} onClick={() => clickOnHint(item)}>
            {item}
        </li>
    )
}
