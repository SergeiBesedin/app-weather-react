import styles from './modal.module.scss'

interface ModalProps {
    children: React.ReactNode
    classes: string[]
    title?: string
}

export function Modal({ children, classes, title }: ModalProps) {
    const classNames = [styles.modal, ...classes].join(' ')

    return (
        <div className={classNames}>
            <div className={styles.container}>
                {title && <h3>{title}</h3>}
                {children}
            </div>
        </div>
    )
}
