import styles from './tile.module.scss'

interface TileProps {
    classes: string[]
    children: React.ReactNode
    title?: string
}

export function Tile({ classes, children, title }: TileProps) {
    const classNames = [styles.tile, ...classes].join(' ')

    return (
        <div className={classNames}>
            {title && <h3>{title}</h3>}
            {children}
        </div>
    )
}
