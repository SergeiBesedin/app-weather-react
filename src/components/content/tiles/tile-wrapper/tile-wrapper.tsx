import styles from './tile-wrapper.module.scss'

interface TileProps {
    classes: string[]
    children: React.ReactNode
    title?: string
}

export function TileWrapper({ classes, children, title }: TileProps) {
    const classNames = [styles.tile, ...classes].join(' ')

    return (
        <div className={classNames}>
            <div className={styles.container}>
                {title && <h3>{title}</h3>}
                {children}
            </div>
        </div>
    )
}
