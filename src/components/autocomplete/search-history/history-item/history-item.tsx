import styles from './history-item.module.scss'

interface HistoryItemProps {
    item: string
}

export function HistoryItem({ item }: HistoryItemProps) {
    return <li>{item}</li>
}
